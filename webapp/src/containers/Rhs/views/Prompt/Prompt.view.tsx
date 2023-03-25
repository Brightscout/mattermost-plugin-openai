import React, {useEffect, useMemo, useState} from 'react';
import {useDispatch} from 'react-redux';

// Components
import {ChatInput} from 'components/ChatInput';
import {RenderChatsAndError} from 'containers/Rhs/views/Prompt/SubComponents/RenderChatsAndError';

// Hooks
import useOpenAiApi from 'hooks/useOpenAiApi';
import useApiRequestCompletionState from 'hooks/useApiRequestCompletionState';

// Actions
import {addChats, setChatPromptPayload} from 'reducers/PromptChat.reducer';

// Selectors
import {getPromptChatSlice} from 'selectors';

// Utils
import {mapErrorMessageFromOpenAI, parseChatCompletionPayload} from 'utils';

// Constants
import {API_SERVICE_CONFIG} from 'constants/apiServiceConfig';
import {ChatCompletionApi} from 'constants/common';

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
    const {state, getApiState, makeApiRequestWithCompletionStatus} = useOpenAiApi();
    const [promptValue, setPromptValue] = useState('');

    // Selectors
    const {chats, payload: chatCompletionsPayload, isChatSummarized} = getPromptChatSlice(state);

    /**
     * The payload needs to be constant till the request cycle to be completed for our custom api to work.
     * We want the payload to change only when the prompt value changes.
     */
    const payload = useMemo(
        () => parseChatCompletionPayload({prompt: promptValue, chatHistory: chats}),
        [promptValue],
    );

    const {isLoading, error} = getApiState(
        API_SERVICE_CONFIG.getChatCompletion.serviceName,
        chatCompletionsPayload,
    ) as UseApiResponse<ChatCompletionResponseShape>;

    /**
     * On Clicking the send button we are adding the user entered prompt to a state array,
     * and sending request to the open ai servers for the response.
     */
    const handleSend = () => {
        makeApiRequestWithCompletionStatus(
            API_SERVICE_CONFIG.getChatCompletion.serviceName,
            payload,
        );

        dispatch(setChatPromptPayload({payload}));
        dispatch(
            addChats({
                role: 'user',
                content: promptValue.trim(),
                id: Date.now().toString(),
            }),
        );
    };

    /**
     * Triggers on changing the value in the text area,
     * in `loading` state the user wont be able to change the content in the text area.
     */
    const handleOnChange = ({target: {value}}: React.ChangeEvent<HTMLTextAreaElement>) =>
        !isLoading && setPromptValue(value);

    /**
     * On getting the success response from the api, we are resetting the text area,
     * and also storing the response in a state array.
     */
    useApiRequestCompletionState({
        serviceName: API_SERVICE_CONFIG.getChatCompletion.serviceName,
        payload,
        handleSuccess: () => {
            setPromptValue('');
        },
    });

    /**
     * Whenever completions api is successful we are clearing the textarea.
     */
    useApiRequestCompletionState({
        serviceName: API_SERVICE_CONFIG.getChatCompletion.serviceName,
        payload: chatCompletionsPayload,
        handleSuccess: () => {
            setPromptValue('');
        },
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
                    errorMessage={error && mapErrorMessageFromOpenAI(error)}
                />
            </ChatArea>
            <ChatInput
                value={promptValue}
                isLoading={isLoading}
                handleOnChange={handleOnChange}
                handleOnSend={handleSend}
            />
        </Container>
    );
};
