import React, {useEffect, useMemo} from 'react';
import {useDispatch} from 'react-redux';

// Components
import {ThreadSummaryDialog} from 'components/ThreadSummaryDialog';

// Reducers
import {addCredentials} from 'reducers/Credentials.reducer';
import {
    addChats,
    addSummary,
    popLastChat,
    setIsChatSummarized,
    setChatPromptPayload,
} from 'reducers/PromptChat.reducer';

// Selectors
import {getPromptChatSlice, getPostSummarizationState} from 'selectors';

// Constants
import {API_SERVICE, API_SERVICE_CONFIG} from 'constants/apiServiceConfig';
import {ChatCompletionApi, CHAT_API_ROLES} from 'constants/common';
import {ChatCompletionApiConfigs} from 'constants/configs';

// Hooks
import usePluginApi from 'hooks/usePluginApi';
import useApiRequestCompletionState from 'hooks/useApiRequestCompletionState';
import useOpenAiApi from 'hooks/useOpenAIApi';

// Utils
import {parseChatCompletionPayload} from 'utils';

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
    const {makeApiRequestWithCompletionStatus, getApiState} = usePluginApi();
    const {
        state,
        getApiState: getOpenAiApiState,
        makeApiRequestWithCompletionStatus: makeOpenAiApiRequestWithCompletionStatus,
    } = useOpenAiApi();

    const {payload, isChatSummarized, chats} = getPromptChatSlice(state);
    const {isDialogOpen} = getPostSummarizationState(state);

    // Get plugin api states
    const {data} = getApiState(API_SERVICE_CONFIG.getOpenAIApiKeyFromWebapp.serviceName);

    // Get open ai api states
    const {data: chatCompletionResponse} = getOpenAiApiState(
        API_SERVICE_CONFIG.getChatCompletion.serviceName,
        payload,
    );

    /**
     * Before the first render we are fetching the configuration settings from the mattermost webapp.
     */
    useMemo(() => {
        makeApiRequestWithCompletionStatus(
            API_SERVICE_CONFIG.getOpenAIApiKeyFromWebapp.serviceName,
        );
    }, []);

    // Handling Api request for fetching plugin settings from mattermost.
    useApiRequestCompletionState({
        services: API_SERVICE.pluginApiService,
        serviceName: API_SERVICE_CONFIG.getOpenAIApiKeyFromWebapp.serviceName,
        handleSuccess: () => {
            if (data) {
                dispatch(addCredentials(data));
            }
        },
    });

    // Handling Api request for chat prompt
    useApiRequestCompletionState({
        serviceName: API_SERVICE_CONFIG.getChatCompletion.serviceName,
        payload,
        handleSuccess: () => {
            /**
             * Since data is a union type, here we are narrowing the type to get the response data of the chat completion api.
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
        },
    });

    /**
     * When isChatSummarized is `true`, hit the chat api to get the summary.
     */
    useEffect(() => {
        if (isChatSummarized) {
            makeOpenAiApiRequestWithCompletionStatus(
                API_SERVICE_CONFIG.getChatCompletion.serviceName,
                payload,
            );
        }
    }, [isChatSummarized]);

    return isDialogOpen && <ThreadSummaryDialog />;
};
