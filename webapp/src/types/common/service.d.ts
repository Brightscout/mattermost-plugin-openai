type ApiServiceName =
    | 'getCompletion'
    | 'getChatCompletion'
    | 'getOpenAIApiKeyFromWebapp'
    | 'getThreadFromPostId';

type PluginApiService = {
    path: string;
    method: HttpMethod;
    serviceName: ApiServiceName;
};

type ApiErrorResponse = {
    data: {
        Error: string;
        error?: {
            code: string;
        };
    };
    status: number;
};

type APIRequestPayload = GetCompletionPayload | GetChatCompletionPayload | GetThreadFromPost | void;
