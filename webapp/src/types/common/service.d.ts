type ApiServiceName = 'getCompletion';

type PluginApiService = {
    path: string;
    method: HttpMethod;
    serviceName: ApiServiceName;
};

type APIRequestPayload = GetCompletionPayload | void;
