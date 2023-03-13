// Types for API response

type OpenAIApiKeyFromWebappShape = {
    object: 'openAIKey';
    openAIApiKey: string;
};

type CompletionResponseShape = {
    id: string;
    object: 'text_completion';
    created: number;
    model: string;
    choices?: [
        {
            text: string;
            index: number;
            logprobs: integer | null;
            finish_reason: string;
        },
    ];
    usage?: {
        prompt_tokens: number;
        completion_tokens: number;
        total_tokens: number;
    };
};

type ChatCompletionResponseShape = {
    id: string;
    object: 'chat.completion';
    created: number;
    choices: {
        index: number;
        message: {
            role: 'system' | 'user' | 'assistant';
            content: string;
        };
        finish_reason: string;
    }[];
    usage: {
        prompt_tokens: number;
        completion_tokens: number;
        total_tokens: number;
    };
};
