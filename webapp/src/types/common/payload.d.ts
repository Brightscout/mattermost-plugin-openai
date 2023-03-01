// Types for API payload

type GetCompletionPayload = {
    model?: 'text-davinci-003';
    prompt: string;
    max_tokens?: number;
    temperature?: number;
};
