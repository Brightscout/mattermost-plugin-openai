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
 * Constants used in the thread summary modal.
 */
export const THREAD_SUMMARY_MODAL = {
    title: 'Thread Summary',
    subtitle: 'Summarization of the post thread',
    primaryActionText: ({isCopied}:{isCopied: boolean}) => (isCopied ? 'Copied' : 'Copy'),
} as const;

/**
 * Constants used in the post menu item component
 */
export const POST_MENU_ITEM = {
    label: 'Summarize',
    leadingIcon: 'Globe',
} as const;

/**
 * Constants required to create prompt for summarizing the thread.
 */
export const PARSE_THREAD_PROMPT = {
    systemPrompt: 'Summarize the below thread briefly\n',
};

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
