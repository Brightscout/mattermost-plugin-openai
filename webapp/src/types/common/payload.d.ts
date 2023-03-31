// Types for API payload

type GetCompletionPayload = {
    model?: 'text-davinci-003';
    prompt: string;
    max_tokens?: number;
    temperature?: number;
};

type GetChatCompletionPayload = {
    model?: 'gpt-3.5-turbo' | 'gpt-3.5-turbo-0301';
    messages: {role: 'user' | 'assistant' | 'system'; content: string}[];
    max_tokens?: number;
};

type GetThreadFromPost = {
    postId: string;
};

type GetImageFromTextPayload = {
    prompt: string;
    n: number;
    size: '1024x1024' | '512x512' | '256x256';
};

type PostPostToChannelPayload = {
    channel_id: string;
    message: string;
    root_id?: string;
    file_ids?: string[];
};
