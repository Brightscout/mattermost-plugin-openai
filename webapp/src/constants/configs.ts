import {IMAGE_RESOLUTIONS} from './common';

export const ChatCompletionApiConfigs = {
    model: 'gpt-3.5-turbo',
    maxTokens: 3000,

    /** Reduce this to get the summary quicker */
    maxTokenLimitToSummarize: 2000,
} as const;

export const THREAD_SUMMARIZATION_COMPLETION_API_CONFIGS = {
    model: 'text-davinci-003',
    maxTokens: 800,
    threadTokenLimit: 3000,
} as const;

export const IMAGE_GENERATIONS_API_CONFIGS = {
    size: IMAGE_RESOLUTIONS.x256,
    numberOfImagesPerRequest: 4,
};
