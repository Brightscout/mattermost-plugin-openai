import React, {useEffect, useMemo, useState} from 'react';
import {useDispatch} from 'react-redux';

// Components
import {ChatInput} from 'components/ChatInput';
import {RenderChatsAndError} from 'containers/Rhs/views/Prompt/SubComponents/RenderChatsAndError';

// Hooks
import usePluginApi from 'hooks/usePluginApi';
import useApiRequestCompletionState from 'hooks/useApiRequestCompletionState';

// Actions
import {addChats, addSummary, popLastChat} from 'reducers/PromptChat.reducer';

// Selectors
import {getAllChats} from 'selectors';

// Utils
import {parseChatCompletionPayload} from 'utils';

// Constants
import {API_SERVICE_CONFIG} from 'constants/apiServiceConfig';
import {ChatCompletionApi, ErrorMessages} from 'constants/common';
import {ChatCompletionApiConfigs} from 'constants/configs';

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
    const [errorMessage, setErrorMessage] = useState('');
    const [isChatSummarized, setIsChatSummarized] = useState(false);

    // Selectors
    const {chats} = getAllChats(state);

    /**
     * The below disable of eslint is intentional.
     * The payload needs to be constant till the request cycle to be completed for our custom api to work.
     * We want the payload to change only when the prompt value changes.
     */
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const payload = useMemo(
        () => parseChatCompletionPayload({prompt: promptValue, chatHistory: chats}),
        [promptValue],
    );

    const {data, isLoading} = getApiState(
        API_SERVICE_CONFIG.getChatCompletion.serviceName,
        payload,
    );

    /**
     * On Clicking the send button we are adding the user entered prompt to a state array,
     * and sending request to the open ai servers for the response.
     */
    const handleSend = async () => {
        makeApiRequestWithCompletionStatus(
            API_SERVICE_CONFIG.getChatCompletion.serviceName,
            payload,
        );
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
    const handleOnChange = ({target: {value}}: React.ChangeEvent<HTMLTextAreaElement>) => !isLoading && setPromptValue(value);

    /**
     * On getting the success response from the api, we are resetting the text area,
     * and also storing the response in a state array.
     */
    useApiRequestCompletionState({
        serviceName: API_SERVICE_CONFIG.getChatCompletion.serviceName,
        payload,
        handleSuccess: () => {
            setPromptValue('');
            setErrorMessage('');

            /**
             * Since data is a union type, here we are narrowing the type to get the response data of the chat completion api.
             * If `isChatSummarized` is true, we are adding it to the `chats` state, with isSummary flag to `true`
             * else we are adding the transformed response data to the `chats` state
             */
            if (data?.object === ChatCompletionApi.responseObject) {
                if (isChatSummarized) {
                    dispatch(
                        addSummary({
                            id: data?.id,
                            content: data?.choices[0].message.content,
                            role: 'assistant',
                            isSummary: true,
                        }),
                    );
                    setIsChatSummarized(false);
                    return;
                }

                dispatch(
                    addChats({
                        id: data?.id,
                        content: data?.choices[0].message.content,
                        role: data.choices[0].message.role,
                    }),
                );

                /**
                 * If token limit reached above the threshold limit summarize the chat
                 */
                if (data.usage.total_tokens > ChatCompletionApiConfigs.maxTokenLimitToSummarize) {
                    setPromptValue(ChatCompletionApi.summarizationPrompt);
                    setIsChatSummarized(true);
                }
            }
        },
        handleError: (error) => {
            setPromptValue('');
            dispatch(popLastChat());

            switch (error.data.error?.code) {
                case ChatCompletionApi.invalidApiCode:
                    setErrorMessage(ErrorMessages.invalidApiKey);
                    break;
                case ChatCompletionApi.invalidOrganizationCode:
                    setErrorMessage(ErrorMessages.invalidOrganizationId);
                    break;
                default:
                    setErrorMessage(ErrorMessages.internalServerError);
            }
        },
    });

    /**
     * When isChatSummarized is `true`, hit the chat api to get the summary.
     */
    useEffect(() => {
        if (isChatSummarized && promptValue === ChatCompletionApi.summarizationPrompt) {
            makeApiRequestWithCompletionStatus(API_SERVICE_CONFIG.getChatCompletion.serviceName, payload);
        }
    }, [isChatSummarized, promptValue]);

    return (
        <Container>
            <ChatArea>
                <RenderChatsAndError chats={chats} errorMessage={errorMessage} />
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
