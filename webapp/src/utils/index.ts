// Export Utils functions here

import GPT3Tokenizer from 'gpt3-tokenizer';

// Mattermost Types
import {UserProfile} from 'mattermost-redux/types/users';
import {IDMappedObjects} from 'mattermost-redux/types/utilities';

// Constants
import {
    ChatCompletionApi,
    CHAT_API_ROLES,
    ErrorMessages,
    IMAGE_RESOLUTIONS,
    IMAGE_RESOLUTION_PLACEHOLDERS,
    REGEX,
    DURATION_FOR_IMAGE_EXPIRY_IN_MILLISECONDS_WITH_BUFFER,
} from 'constants/common';
import {
    ChatCompletionApiConfigs,
    IMAGE_GENERATIONS_API_CONFIGS,
    IMAGE_GENERATIONS_COMMAND_CONFIGS,
    THREAD_SUMMARIZATION_COMPLETION_API_CONFIGS,
} from 'constants/configs';

import {id as pluginId} from 'manifest';

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
    chatHistory: ChatsType;
}): GetChatCompletionPayload => {
    // Removing the id property from the message object
    let prevChats = chatHistory
        .map(({id, ...restProperties}) => restProperties)
        .filter(({isImage, content}) => !(isImage || checkIfIsImageCommand({content})));

    const indexOfSummary = chatHistory.findIndex(({isSummary}) => isSummary);

    // Removing the isSummary property from the message object
    if (indexOfSummary !== -1) {
        prevChats = prevChats
            .slice(indexOfSummary)
            .map(({isSummary, ...restProperties}) => restProperties)
            .filter(({isImage, content}) => !(isImage || checkIfIsImageCommand({content})));
    }

    const isSummarizing = prompt === ChatCompletionApi.summarizationPrompt;
    return {
        model: ChatCompletionApiConfigs.model,
        max_tokens: ChatCompletionApiConfigs.maxTokens,
        messages: [
            ...prevChats,
            {
                role: isSummarizing ? CHAT_API_ROLES.system : CHAT_API_ROLES.user,
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
    return {pluginApiBaseUrl, mattermostApiBaseUrl, pluginUrl};
};

/**
 * Maps the error coming from the OpenAI server to a user friendly feedback
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

/**
 * Parses payload for summarizing thread
 * @param threadPrompt - thread to be summarized
 */
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

/**
 * Parses image generation payload using the prompt passed in.
 * @param prompt - image generation prompt.
 * @param resolution - image resolution to be generated.
 */
export const parsePayloadForImageGeneration = ({
    prompt,
}: {
    prompt: string;
}): GetImageFromTextPayload => {
    const splitPrompt = prompt.split(REGEX.whiteSpace);
    const resolution = splitPrompt[1] as ImageResolutionPlaceholders;
    let endIndexAfterSlashCommands: number;

    // Setting index to create a substring starting from the index to remove the slash command from the prompt
    endIndexAfterSlashCommands = prompt.indexOf(splitPrompt[0]) + splitPrompt[0].length;
    if (REGEX.resolution.test(resolution)) {
        // If resolution present in the prompt we extract it and then generate the prompt excluding the commands
        const startIndexOfResolution = prompt.indexOf(resolution);
        endIndexAfterSlashCommands = startIndexOfResolution + resolution.length;
    }

    return {
        prompt: prompt.substring(endIndexAfterSlashCommands),
        n: IMAGE_GENERATIONS_API_CONFIGS.numberOfImagesPerRequest,
        size: mapImageResolutionPlaceholderToResolution(resolution),
    };
};

/**
 * Returns true if the prompt starts with `/image`
 * @param content - prompt by the user
 */
export const checkIfIsImageCommand = ({content}: {content: string}) =>
    content.split(REGEX.whiteSpace)[0] === IMAGE_GENERATIONS_COMMAND_CONFIGS.image.trim() ||
    content.split(REGEX.whiteSpace)[0] === '**`image`**';

/**
 * If prompt is for generating image then styles the prompt using markdown
 * else returns without any transformations
 * @param content - prompt by the user.
 */
export const stylePromptIfImage = ({content}: {content: string}) => {
    if (checkIfIsImageCommand({content})) {
        const splitPrompt = content.split(REGEX.whiteSpace);
        const resolution = splitPrompt[1];
        let endIndexAfterSlashCommands: number;

        // Setting index to create a substring starting from the index to remove the slash command from the prompt
        endIndexAfterSlashCommands = content.indexOf(splitPrompt[0]) + splitPrompt[0].length;
        if (REGEX.resolution.test(resolution)) {
            // If resolution present in the prompt we extract it and then generate the prompt excluding the commands
            const startIndexOfResolution = content.indexOf(resolution);
            endIndexAfterSlashCommands = startIndexOfResolution + resolution.length;
        }

        return `**\`image\`** **\`${mapImageResolutionToPlaceholders(
            mapImageResolutionPlaceholderToResolution(resolution as ImageResolutionPlaceholders),
        )}\`** ${content.substring(endIndexAfterSlashCommands)}`;
    }
    return content;
};

/**
 * Returns resolution placeholder x256 | x512 | x1024 when resolution is passed in.
 * @param resolution - 256x254 | 512x512 | 1024x1024
 */
export const mapImageResolutionToPlaceholders = (resolution: ImageResolution) => {
    switch (resolution) {
        case IMAGE_RESOLUTIONS.x256:
            return IMAGE_RESOLUTION_PLACEHOLDERS.x256;
        case IMAGE_RESOLUTIONS.x512:
            return IMAGE_RESOLUTION_PLACEHOLDERS.x512;
        default:
            return IMAGE_RESOLUTION_PLACEHOLDERS.x1024;
    }
};

/**
 * Returns resolution 256x254 | 512x512 | 1024x1024 when resolution placeholder is passed in.
 * @param resolution - x256 | x512 | x1024
 */
export const mapImageResolutionPlaceholderToResolution = (
    resolution: ImageResolutionPlaceholders,
) => {
    switch (resolution) {
        case IMAGE_RESOLUTION_PLACEHOLDERS.x256:
            return IMAGE_RESOLUTIONS.x256;
        case IMAGE_RESOLUTION_PLACEHOLDERS.x512:
            return IMAGE_RESOLUTIONS.x512;
        case IMAGE_RESOLUTION_PLACEHOLDERS.x1024:
            return IMAGE_RESOLUTIONS.x1024;
        default:
            return IMAGE_RESOLUTIONS.x256;
    }
};

/**
 * Returns the last value from the string
 * example if completeString = "Hello my name" and splitBy is ' ', then it will return name
 */
export const getLastValue = (completeString: string, splitBy = ' ') => {
    const valuesArr = completeString.split(splitBy);
    return valuesArr.length ? valuesArr[valuesArr.length - 1] : '';
};

/**
 * Get the expiry time for images generated by the OpenAI.
 *
 * @param createdAtTimestamp
 * @returns string, image expiry time in 12-hours format.
 */
export const getImageExpiryTime = (createdAtTimestamp: string) => {
    // we are converting "createdAt" into milliseconds and adding the duration for expiry with buffer.
    const date = new Date((parseInt(createdAtTimestamp, 10) * 1000) + DURATION_FOR_IMAGE_EXPIRY_IN_MILLISECONDS_WITH_BUFFER);

    let hours = date.getHours();
    let minutes: number | string = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';

    hours %= 12;
    hours = hours || 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;

    return hours + ':' + minutes + ' ' + ampm;
};
