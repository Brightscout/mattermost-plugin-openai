import React, {useEffect, useMemo, useState} from 'react';
import {useDispatch} from 'react-redux';

// Components
import {ChatInput} from 'components/ChatInput';
import {RenderChatsAndError} from 'containers/Rhs/views/Prompt/SubComponents/RenderChatsAndError';

// Hooks
import useOpenAIApi from 'hooks/useOpenAIApi';
import useApiRequestCompletionState from 'hooks/useApiRequestCompletionState';

// Actions
import {addChats, setChatPromptPayload} from 'reducers/PromptChat.reducer';

// Selectors
import {getPromptChatSlice} from 'selectors';

// Utils
import {
    checkIfIsImageCommand,
    mapErrorMessageFromOpenAI,
    parseChatCompletionPayload,
    parsePayloadForImageGeneration,
    stylePromptIfImage,
} from 'utils';

// Constants
import {API_SERVICE_CONFIG} from 'constants/apiServiceConfig';
import {
    ChatCompletionApi,
    CHAT_API_ROLES,
    IMAGE_RESOLUTIONS,
    RESOLUTION_CONFIRMATION_DIALOG,
} from 'constants/common';

// Styles
import {
    Container,
    ChatArea,
    ResolutionDialog,
    ResolutionRadio,
    ResolutionWrapper,
} from './Prompt.styles';

/**
 * Prompt View
 *
 * @example correct usage
 * ```tsx
 * <Prompt />
 * ```
 */
export const Prompt = () => {
    // Initialize hooks
    const dispatch = useDispatch();
    const {state, getApiState, makeApiRequestWithCompletionStatus} = useOpenAIApi();
    const [resolution, setResolution] = useState<ImageResolution>(IMAGE_RESOLUTIONS.x256);
    const [showResolutionDialog, setShowResolutionDialog] = useState(false);
    const [promptValue, setPromptValue] = useState('');

    // Selectors
    const {chats, payload: chatCompletionsPayload, isChatSummarized} = getPromptChatSlice(state);

    /**
     * The payload needs to be constant till the request cycle to be completed for our custom api to work.
     * We want the payload to change only when the prompt value changes.
     */
    const payload = useMemo(() => {
        if (checkIfIsImageCommand({content: promptValue})) {
            // Before creating the payload we are removing the /image command from the promptValue.
            return parsePayloadForImageGeneration({
                prompt: promptValue.split(/\s+/).slice(1).join(' '),
                resolution,
            });
        }
        return parseChatCompletionPayload({prompt: promptValue, chatHistory: chats});
    }, [promptValue, resolution]);

    const {isLoading, error} = getApiState(
        API_SERVICE_CONFIG.getChatCompletion.serviceName,
        chatCompletionsPayload,
    ) as UseApiResponse<ChatCompletionResponseShape>;

    const {isLoading: isImageFromTextLoading, error: imageGenerationError} = getApiState(
        API_SERVICE_CONFIG.getImageFromText.serviceName,
        chatCompletionsPayload,
    ) as UseApiResponse<ImageGenerationResponseShape>;

    /**
     * On Clicking the send button we are adding the user entered prompt to a state array,
     * and sending request to the open ai servers for the response.
     */
    const handleSend = () => {
        /**
         * If prompt contains / slash commands then resolution confirmation modal is opened.
         */
        if (checkIfIsImageCommand({content: promptValue})) {
            setShowResolutionDialog(true);
            return;
        }

        makeApiRequestWithCompletionStatus(
            API_SERVICE_CONFIG.getChatCompletion.serviceName,
            payload,
        );
        dispatch(setChatPromptPayload({payload}));

        dispatch(
            addChats({
                role: CHAT_API_ROLES.user,
                content: stylePromptIfImage({content: promptValue.trim()}),
                id: Date.now().toString(),
            }),
        );
    };

    const handleConfirmationImagePromptSend = () => {
        makeApiRequestWithCompletionStatus(
            API_SERVICE_CONFIG.getImageFromText.serviceName,
            payload,
        );
        dispatch(setChatPromptPayload({payload}));

        dispatch(
            addChats({
                role: CHAT_API_ROLES.user,
                content: stylePromptIfImage({content: promptValue.trim(), resolution}),
                id: Date.now().toString(),
            }),
        );

        // Resetting the dialog states
        setResolution(IMAGE_RESOLUTIONS.x256);
        setShowResolutionDialog(false);
    };

    const handleResolutionConfirmationModalClose = () => {
        // Resetting the dialog states
        setResolution(IMAGE_RESOLUTIONS.x256);
        setShowResolutionDialog(false);
    };

    /**
     * Triggers on changing the value in the text area,
     * in `loading` state the user wont be able to change the content in the text area.
     */
    const handleOnChange = (value: string) =>
        !(isLoading || isImageFromTextLoading) && setPromptValue(value);

    /**
     * Triggers on changing the selected radio from the confirmation modal.
     * @param _ - event source of the callback.
     * @param value - value on the selected radio.
     */
    const handleRadioClick = (_: React.MouseEvent<HTMLInputElement, MouseEvent>, value: string) => {
        setResolution(value as ImageResolution);
    };

    /**
     * On getting the success response from the api, we are resetting the text area,
     * and also storing the response in a state array.
     */
    useApiRequestCompletionState({
        serviceName: API_SERVICE_CONFIG.getChatCompletion.serviceName,
        payload,
        handleSuccess: () => setPromptValue(''),
    });

    /**
     * Whenever completions api is successful we are clearing the textarea.
     */
    useApiRequestCompletionState({
        serviceName: API_SERVICE_CONFIG.getChatCompletion.serviceName,
        payload: chatCompletionsPayload,
        handleSuccess: () => setPromptValue(''),
    });

    useApiRequestCompletionState({
        serviceName: API_SERVICE_CONFIG.getImageFromText.serviceName,
        payload: chatCompletionsPayload,
        handleSuccess: () => setPromptValue(''),
    });

    /**
     * When isChatSummarized is `true`, change the text in textarea to Summarizing...
     */
    useEffect(() => {
        if (isChatSummarized) {
            setPromptValue(ChatCompletionApi.summarizationPrompt);
        }
    }, [isChatSummarized]);

    return (
        <Container>
            <ChatArea>
                <RenderChatsAndError
                    chats={chats}
                    errorMessage={
                        (error && mapErrorMessageFromOpenAI(error)) ||
                        (imageGenerationError && mapErrorMessageFromOpenAI(imageGenerationError))
                    }
                />
            </ChatArea>
            <ChatInput
                value={promptValue}
                isLoading={isLoading || isImageFromTextLoading}
                handleOnChange={handleOnChange}
                handleOnSend={handleSend}
            />
            {showResolutionDialog && (
                <ResolutionDialog
                    show
                    title={RESOLUTION_CONFIRMATION_DIALOG.title}
                    description={RESOLUTION_CONFIRMATION_DIALOG.description}
                    primaryActionText={RESOLUTION_CONFIRMATION_DIALOG.primaryActionText}
                    onSubmitHandler={handleConfirmationImagePromptSend}
                    onCloseHandler={handleResolutionConfirmationModalClose}
                >
                    <ResolutionWrapper>
                        <ResolutionRadio
                            checked={resolution === IMAGE_RESOLUTIONS.x256}
                            label={IMAGE_RESOLUTIONS.x256}
                            value={IMAGE_RESOLUTIONS.x256}
                            name={IMAGE_RESOLUTIONS.x256}
                            id={IMAGE_RESOLUTIONS.x256}
                            onClick={handleRadioClick}
                        />
                        <ResolutionRadio
                            checked={resolution === IMAGE_RESOLUTIONS.x512}
                            label={IMAGE_RESOLUTIONS.x512}
                            value={IMAGE_RESOLUTIONS.x512}
                            name={IMAGE_RESOLUTIONS.x512}
                            id={IMAGE_RESOLUTIONS.x512}
                            onClick={handleRadioClick}
                        />
                        <ResolutionRadio
                            checked={resolution === IMAGE_RESOLUTIONS.x1024}
                            label={IMAGE_RESOLUTIONS.x1024}
                            value={IMAGE_RESOLUTIONS.x1024}
                            name={IMAGE_RESOLUTIONS.x1024}
                            id={IMAGE_RESOLUTIONS.x1024}
                            onClick={handleRadioClick}
                        />
                    </ResolutionWrapper>
                </ResolutionDialog>
            )}
        </Container>
    );
};
