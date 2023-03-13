type ApiServiceName = 'getCompletion' | 'getChatCompletion' | 'getOpenAIApiKeyFromWebapp';

type PluginApiService = {
    path: string;
    method: HttpMethod;
    serviceName: ApiServiceName;
};

type ApiErrorResponse = {
    data: {
        Error: string;
        error?: {
            code: string,
        }
    };
    status: number;
};

type APIRequestPayload = GetCompletionPayload | GetChatCompletionPayload | void;
