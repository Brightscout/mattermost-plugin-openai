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
} as const;

export const IMAGE_GENERATIONS_COMMAND_CONFIGS = {
    image: '/image ',
    slash: '/',
    mainKeys: [
        {label: '/image', value: '/image', secondaryLabel: 'Generate image based on prompt'},
        {label: 'x256', value: '256x256', secondaryLabel: 'Image Resolution - 256x256'},
        {label: 'x512', value: '512x512', secondaryLabel: 'Image Resolution - 512x512'},
        {label: 'x1024', value: '1024x1024', secondaryLabel: 'Image Resolution - 1024x1024'},
    ],
} as const;
