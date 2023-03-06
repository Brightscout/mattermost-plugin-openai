export const ChatCompletionApiConfigs = {
    model: 'gpt-3.5-turbo',
    maxTokens: 3000,

    /** Reduce this to get the summary quicker */
    maxTokenLimitToSummarize: 2000,
} as const;

