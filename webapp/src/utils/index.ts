// Export Utils functions here

import {ChatCompletionApi, pluginId} from 'constants/common';
import {ChatCompletionApiConfigs} from 'constants/configs';

/**
 * Parses the payload required for the chat completion API to give response.
 * Here we are passing the previous chats to preserve the context until a token limit is reached.
 * When token limit is reached we summarize the chat and append to the next request.
 * @param prompt - The prompt to generate completions for.
 */
export const parseChatCompletionPayload = ({
    prompt,
    chatHistory,
}: {
    prompt: string;
    chatHistory: {role: 'user' | 'system' | 'assistant'; content: string; id: string; isSummary?: boolean}[];
}): GetChatCompletionPayload => {
    // Removing the id property from the message object
    let prevChats = chatHistory.map(({id, ...restProperties}) => restProperties);

    const indexOfSummary = chatHistory.findIndex(({isSummary}) => isSummary);

    // Removing the isSummary property from the message object
    if (indexOfSummary !== -1) {
        prevChats = prevChats.slice(indexOfSummary).map(({isSummary, ...restProperties}) => restProperties);
    }

    const isSummarizing = prompt === ChatCompletionApi.summarizationPrompt;
    return {
        model: ChatCompletionApiConfigs.model,
        max_tokens: ChatCompletionApiConfigs.maxTokens,
        messages: [...prevChats, {role: isSummarizing ? 'system' : 'user', content: isSummarizing ? ChatCompletionApi.summarizationContent : prompt}],
    };
};

export const getPluginApi = () => {
    const url = new URL(window.location.href);
    const baseUrl = `${url.protocol}//${url.host}`;
    const pluginUrl = `${baseUrl}/plugins/${pluginId}`;
    const pluginApiBaseUrl = `${pluginUrl}/api/v1`;
    return {pluginApiBaseUrl};
};
