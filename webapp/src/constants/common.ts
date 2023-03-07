export const BaseUrlOpenAi = 'https://api.openai.com/v1';

/** channel button tooltip text */
export const channelButtonTooltip = 'Open-ai';

/** plugin header tile */
export const rightSidebarHeaderTitle = 'Open-ai';

/**
 * Constants used in clear context confirmation dialog in ChatSummary component.
 */
export const ClearContextConfirmationDialog = {
    title: 'Do you really want to clear the context',
    description: 'Clearing the context would create a new chat context',
    primaryActionText: 'Clear',
    secondaryActionText: 'Close',
} as const;

/**
 * Constants used with chat completion api
 */
export const ChatCompletionApi = {
    responseObject: 'chat.completion',
    summarizationPrompt: 'Summarization...',
    summarizationContent: 'Summarize the chat precisely',
} as const;
