import React, {useEffect, useMemo} from 'react';
import {useDispatch} from 'react-redux';

import {ThreadSummaryDialog} from 'components/ThreadSummaryDialog';

// Reducers
import {
    addChats,
    addSummary,
    popLastChat,
    setIsChatSummarized,
    setChatPromptPayload,
} from 'reducers/PromptChat.reducer';
import {toggleErrorDialog} from 'reducers/errorDialog';

// Selectors
import {getPromptChatSlice, getPostSummarizationState} from 'selectors';

// Constants
import {API_SERVICE_CONFIG} from 'constants/apiServiceConfig';
import {ChatCompletionApi, CHAT_API_ROLES} from 'constants/common';
import {ChatCompletionApiConfigs} from 'constants/configs';

// Hooks
import usePluginApi from 'hooks/usePluginApi';
import useApiRequestCompletionState from 'hooks/useApiRequestCompletionState';

// Utils
import {parseChatCompletionPayload} from 'utils';

// Global styles
import 'styles/main.scss';

/**
 * App Component
 * This is the main App component for the plugin.
 *
 * @example Correct usage
 * ```tsx
 * <App />
 * ```
 */
export const App = () => {
    // Initializing Hooks
    const dispatch = useDispatch();
    const {state, makeApiRequestWithCompletionStatus, getApiState} = usePluginApi();

    const {payload, isChatSummarized, chats} = getPromptChatSlice(state);
    const {isDialogOpen} = getPostSummarizationState(state);

    // Get OpenAI API states
    const {data: chatCompletionResponse, error: chatCompletionError} = getApiState(
        API_SERVICE_CONFIG.getChatCompletion.serviceName,
        payload,
    ) as UseApiResponse<ChatCompletionResponseShape>;

    const {data: getImageFromTextResponse, error: getImageFromTextError} = getApiState(
        API_SERVICE_CONFIG.getImageFromText.serviceName,
        payload,
    ) as UseApiResponse<ImageGenerationResponseShape>;

    useApiRequestCompletionState({
        serviceName: API_SERVICE_CONFIG.getImageFromText.serviceName,
        payload,
        handleSuccess: () => {
            dispatch(
                addChats({
                    id: getImageFromTextResponse.created.toString(),
                    content: getImageFromTextResponse.data.map(({url}) => url).join(' '),
                    role: CHAT_API_ROLES.assistant,
                    isImage: true,
                }),
            );
        },
        handleError: () => {
            dispatch(popLastChat());

            dispatch(
                toggleErrorDialog({
                    visibility: true,
                    description: getImageFromTextError?.data?.Error,
                }),
            );
        },
        services: 'usePluginApi',
    });

    // Handling API request for chat prompt
    useApiRequestCompletionState({
        serviceName: API_SERVICE_CONFIG.getChatCompletion.serviceName,
        payload,
        handleSuccess: () => {
            /**
             * Since data is a union type, here we are narrowing the type to get the response data of the chat completion API.
             * If `isChatSummarized` is true, we are adding it to the `chats` state, with isSummary flag to `true`
             * else we are adding the transformed response data to the `chats` state
             */
            if (chatCompletionResponse?.object === ChatCompletionApi.responseObject) {
                if (isChatSummarized) {
                    dispatch(
                        addSummary({
                            id: chatCompletionResponse?.id,
                            content: chatCompletionResponse?.choices[0].message.content,
                            role: CHAT_API_ROLES.assistant,
                            isSummary: true,
                        }),
                    );
                    dispatch(setIsChatSummarized(false));
                    return;
                }

                dispatch(
                    addChats({
                        id: chatCompletionResponse?.id,
                        content: chatCompletionResponse?.choices[0].message.content,
                        role: chatCompletionResponse.choices[0].message.role,
                    }),
                );

                /**
                 * If token limit reached above the threshold limit summarize the chat
                 */
                if (
                    chatCompletionResponse.usage.total_tokens >
                    ChatCompletionApiConfigs.maxTokenLimitToSummarize
                ) {
                    const payloadForSummarization = parseChatCompletionPayload({
                        prompt: ChatCompletionApi.summarizationPrompt as string,

                        /**
                         * Since we won't get the updated chat list which is triggered by the action before this block,
                         * we are manually adding it to the payload.
                         */
                        chatHistory: [
                            ...chats,
                            {
                                id: chatCompletionResponse?.id,
                                content: chatCompletionResponse?.choices[0].message.content,
                                role: chatCompletionResponse.choices[0].message.role,
                            },
                        ],
                    });
                    dispatch(
                        setChatPromptPayload({
                            payload: payloadForSummarization,
                        }),
                    );
                    dispatch(setIsChatSummarized(true));
                }
            }
        },
        handleError: () => {
            dispatch(popLastChat());

            dispatch(
                toggleErrorDialog({
                    visibility: true,
                    description: chatCompletionError?.data?.Error,
                }),
            );
        },
    });

    /**
     * When isChatSummarized is `true`, call the chat API to get the summary.
     */
    useEffect(() => {
        if (isChatSummarized) {
            makeApiRequestWithCompletionStatus(
                API_SERVICE_CONFIG.getChatCompletion.serviceName,
                payload,
            );
        }
    }, [isChatSummarized]);

    return isDialogOpen && <ThreadSummaryDialog />;
};
