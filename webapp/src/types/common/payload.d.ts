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
}
