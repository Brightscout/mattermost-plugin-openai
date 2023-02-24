// Types for API payload

type GetCompletionPayload = {
    model: 'text-davinci-003';
    max_tokens: number;
    temperature: number;
    prompt: string;
};
