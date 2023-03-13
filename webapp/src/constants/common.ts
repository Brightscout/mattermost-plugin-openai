export const BaseUrlOpenAi = 'https://api.openai.com/v1';

export const pluginId = 'mattermost-plugin-open-ai';

/** channel button tooltip text */
export const channelButtonTooltip = 'Open-ai';

/** plugin header tile */
export const rightSidebarHeaderTitle = 'Open-ai';

export const ErrorMessages = {
    internalServerError: 'Something went wrong, please try again',
    invalidApiKey: 'The API key provided is not valid',
    invalidOrganizationId: 'No organization found with the given ID',
} as const;

/**
 * Constants used in clear context confirmation dialog in ChatSummary component.
 */
export const ClearContextConfirmationDialog = {
    title: 'Do you really want to clear the context?',
    description: 'Clearing the context would create a new chat context',
    primaryActionText: 'Clear',
    secondaryActionText: 'Cancel',
} as const;

/**
 * Constants used with chat completion api
 */
export const ChatCompletionApi = {
    responseObject: 'chat.completion',
    summarizationPrompt: 'Summarization...',
    summarizationContent: 'Summarize the chat precisely',
    invalidApiCode: 'invalid_api_key',
    invalidOrganizationCode: 'invalid_organization',
} as const;
