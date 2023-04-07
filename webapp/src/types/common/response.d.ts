// Types for API response

type OpenAIApiKeyFromWebapp = {
    object: 'openAIKey';
    openAIAPIKey: string;
    openAIOrganizationId: string;
};

type CompletionResponseShape = {
    id: string;
    object: 'text_completion';
    created: number;
    model: string;
    choices: {
        text: string;
        index: number;
        logprobs: integer | null;
        finish_reason: string;
    }[];
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

type PostThreadResponseShape = {
    order: string[];
    posts: {
        [postId: string]: {
            id: string;
            user_id: string;
            message: string;
        };
    };
};

type ImageGenerationResponseShape = {
    created: number;
    data: {url: string}[];
};

type PostPostToChannelResponseShape = {
    id: string;
    message: string;
};
