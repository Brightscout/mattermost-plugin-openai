import React, {useEffect, useMemo, useRef, useState} from 'react';
import {useDispatch} from 'react-redux';

// Components
import {ChatInput} from 'components/ChatInput';
import {RhsEmptyState} from 'components/RhsEmptyState';
import {RenderChatsAndError} from 'containers/Rhs/views/Prompt/SubComponents/RenderChatsAndError';

// Hooks
import usePluginApi from 'hooks/usePluginApi';
import useApiRequestCompletionState from 'hooks/useApiRequestCompletionState';

// Actions
import {addChats, setChatPromptPayload} from 'reducers/PromptChat.reducer';

// Reducers
import {toggleErrorDialog} from 'reducers/errorDialog';

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
import {ChatCompletionApi, CHAT_API_ROLES} from 'constants/common';

// Styles
import {Container, ChatArea} from './Prompt.styles';

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
    const {state, getApiState, makeApiRequestWithCompletionStatus} = usePluginApi();
    const [promptValue, setPromptValue] = useState('');

    const chatStartRef = useRef<HTMLDivElement | null>(null);

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
                prompt: promptValue,
            });
        }
        return parseChatCompletionPayload({prompt: promptValue, chatHistory: chats});
    }, [promptValue]);

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
     * and sending request to the OpenAI servers for the response.
     */
    const handleSend = () => {
        /**
         * If prompt contains / slash commands then resolution confirmation modal is opened.
         */
        if (checkIfIsImageCommand({content: promptValue})) {
            makeApiRequestWithCompletionStatus(
                API_SERVICE_CONFIG.getImageFromText.serviceName,
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

    /**
     * Triggers on changing the value in the text area,
     * in `loading` state the user wont be able to change the content in the text area.
     */
    const handleOnChange = (value: string) =>
        !(isLoading || isImageFromTextLoading) && setPromptValue(value);

    /**
     * Scroll the chat window to the latest chat
     */
    const scrollToBottom = () => {
        chatStartRef.current?.scrollIntoView({behavior: 'smooth', block: 'end'});
    };

    /**
     * On getting the success response from the api, we are resetting the text area,
     * and also storing the response in a state array.
     */
    useApiRequestCompletionState({
        serviceName: API_SERVICE_CONFIG.getChatCompletion.serviceName,
        payload,
        handleSuccess: () => setPromptValue(''),
        handleError: () => dispatch(
            toggleErrorDialog({
                visibility: true,
                description: error?.data?.Error,
            }),
        ),
    });

    /**
     * Whenever completions api is successful we are clearing the textarea.
     */
    useApiRequestCompletionState({
        serviceName: API_SERVICE_CONFIG.getChatCompletion.serviceName,
        payload: chatCompletionsPayload,
        handleSuccess: () => setPromptValue(''),
        handleError: () => dispatch(
            toggleErrorDialog({
                visibility: true,
                description: error?.data?.Error,
            }),
        ),
    });

    useApiRequestCompletionState({
        serviceName: API_SERVICE_CONFIG.getImageFromText.serviceName,
        payload: chatCompletionsPayload,
        handleSuccess: () => setPromptValue(''),
        handleError: () => dispatch(
            toggleErrorDialog({
                visibility: true,
                title: '',
                description: imageGenerationError?.data?.Error,
            }),
        ),
    });

    /**
     * When isChatSummarized is `true`, change the text in textarea to Summarizing...
     */
    useEffect(() => {
        if (isChatSummarized) {
            setPromptValue(ChatCompletionApi.summarizationPrompt);
        }
    }, [isChatSummarized]);

    useEffect(() => {
        scrollToBottom();
    }, [chats.length]);

    return (
        <Container>
            <ChatArea>
                <div ref={chatStartRef} />
                {chats.length ? (
                    <RenderChatsAndError
                        chats={chats}
                        errorMessage={
                            (error && mapErrorMessageFromOpenAI(error)) ||
                            (imageGenerationError &&
                                mapErrorMessageFromOpenAI(imageGenerationError))
                        }
                    />
                ) : (
                    <RhsEmptyState />
                )}
            </ChatArea>
            <ChatInput
                value={promptValue}
                isLoading={isLoading || isImageFromTextLoading}
                handleOnChange={handleOnChange}
                handleOnSend={handleSend}
            />
        </Container>
    );
};
