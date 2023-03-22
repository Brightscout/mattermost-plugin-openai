export const API_SERVICE_CONFIG: Record<ApiServiceName, PluginApiService> = {
    getCompletion: {
        path: '/completions',
        method: 'POST',
        serviceName: 'getCompletion',
    },
    getChatCompletion: {
        path: '/chat/completions',
        method: 'POST',
        serviceName: 'getChatCompletion',
    },
    getOpenAIApiKeyFromWebapp: {
        path: '/config',
        method: 'GET',
        serviceName: 'getOpenAIApiKeyFromWebapp',
    },
    getThreadFromPostId: {
        path: '/posts',
        method: 'GET',
        serviceName: 'getThreadFromPostId',
    },
};
