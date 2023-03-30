// Export Utils functions here

import GPT3Tokenizer from 'gpt3-tokenizer';

// Mattermost Types
import {UserProfile} from 'mattermost-redux/types/users';
import {IDMappedObjects} from 'mattermost-redux/types/utilities';

// Constants
import {ChatCompletionApi, ErrorMessages, pluginId} from 'constants/common';
import {
    ChatCompletionApiConfigs,
    THREAD_SUMMARIZATION_COMPLETION_API_CONFIGS,
} from 'constants/configs';

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
    chatHistory: {
        role: 'user' | 'system' | 'assistant';
        content: string;
        id: string;
        isSummary?: boolean;
    }[];
}): GetChatCompletionPayload => {
    // Removing the id property from the message object
    let prevChats = chatHistory.map(({id, ...restProperties}) => restProperties);

    const indexOfSummary = chatHistory.findIndex(({isSummary}) => isSummary);

    // Removing the isSummary property from the message object
    if (indexOfSummary !== -1) {
        prevChats = prevChats
            .slice(indexOfSummary)
            .map(({isSummary, ...restProperties}) => restProperties);
    }

    const isSummarizing = prompt === ChatCompletionApi.summarizationPrompt;
    return {
        model: ChatCompletionApiConfigs.model,
        max_tokens: ChatCompletionApiConfigs.maxTokens,
        messages: [
            ...prevChats,
            {
                role: isSummarizing ? 'system' : 'user',
                content: isSummarizing ? ChatCompletionApi.summarizationContent : prompt,
            },
        ],
    };
};

/**
 * Helper util function which returns the plugin api base url for the plugin.
 * @returns pluginApiBaseUrl
 */
export const getPluginApiBaseUrl = () => {
    const url = new URL(window.location.href);
    const baseUrl = `${url.protocol}//${url.host}`;
    const pluginUrl = `${baseUrl}/plugins/${pluginId}`;
    const mattermostApiBaseUrl = `${baseUrl}/api/v4`;
    const pluginApiBaseUrl = `${pluginUrl}/api/v1`;
    return {pluginApiBaseUrl, mattermostApiBaseUrl};
};

/**
 * Maps the error coming from the open ai server to a user friendly feedback
 * @param error - api error response
 */
export const mapErrorMessageFromOpenAI = (error: ApiErrorResponse) => {
    switch (error.data.error?.code) {
        case ChatCompletionApi.invalidApiCode:
            return ErrorMessages.invalidApiKey;
        case ChatCompletionApi.invalidOrganizationCode:
            return ErrorMessages.invalidOrganizationId;
        default:
            return ErrorMessages.internalServerError;
    }
};

/**
 * Parses the payload required for the completion API to give summary of the thread.
 * @param threadResponse - response from the mattermost api for fetching thread
 * @param Users - Users state from the mattermost redux store
 */
export const parseThread = (
    threadResponse: PostThreadResponseShape,
    Users: IDMappedObjects<UserProfile>,
) => {
    const tokenizer = new GPT3Tokenizer({type: 'gpt3'}); // or 'codex'
    let totalToken = 0;

    /**
     * Here we are looping through the response to
     * 1. get the threads in the correct order
     * 2. transform the message in the format <author>: <message>
     * 3. filter out thread having token limit greater than threadTokenLimit
     */
    const response = threadResponse.order
        .map((threadId) => threadResponse.posts[threadId])
        .splice(1)
        .map(({user_id: userID, message}) => {
            const tokenizedValue = tokenizer.encode(message);
            totalToken += tokenizedValue.bpe.length;
            return {
                message: `${Users[userID].username}: ${message}`,
                ...tokenizedValue,
                totalToken,
            };
        });

    return response;
};

export const parseThreadPayload = (threadPrompt: string): GetCompletionPayload => ({
    prompt: threadPrompt,
    model: THREAD_SUMMARIZATION_COMPLETION_API_CONFIGS.model,
    max_tokens: THREAD_SUMMARIZATION_COMPLETION_API_CONFIGS.maxTokens,
});

// Takes a userId and generates a link to that user's profile image
export const getProfileImgUrl = ({userId}: {userId: string}): string =>
    `${window.location.protocol}//${window.location.host}/api/v4/users/${userId}/image`;

/**
 * Parses the content with a summary template if the summary is being produced by chat API.
 * @param isSummary - Flag for checking if summary is being returned by the chat Api.
 * @param content - Content which is returned by the Api.
 */
export const parseChatWithTemplateIfSummary = ({
    isSummary,
    content,
}: {
    isSummary?: boolean;
    content: string;
}) =>
    (isSummary ? `**Summary**\n\n${content}\n\n*Max token limit is reached, summarizing the conversation to retain context*` : content);
