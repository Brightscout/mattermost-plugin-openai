// Types for API response

type CompletionResponseShape = {
    id: string;
    object: string;
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
