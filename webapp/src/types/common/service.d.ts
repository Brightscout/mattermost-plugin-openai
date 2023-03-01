type ApiServiceName = 'getCompletion';

type PluginApiService = {
    path: string;
    method: HttpMethod;
    serviceName: ApiServiceName;
};

type ApiErrorResponse = {
    data: {
        Error: string;
    };
    status: number;
};

type APIRequestPayload = GetCompletionPayload | void;
