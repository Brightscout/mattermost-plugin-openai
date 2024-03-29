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
    getThreadFromPostId: {
        path: '/posts',
        method: 'GET',
        serviceName: 'getThreadFromPostId',
    },
    getImageFromText: {
        path: '/images/generations',
        method: 'POST',
        serviceName: 'getImageFromText',
    },
    postImageToChannel: {
        path: '/image',
        method: 'POST',
        serviceName: 'postImageToChannel',
    },
};

export const API_SERVICE = {
    mattermostApiService: 'useMattermostApi',
    pluginApiService: 'usePluginApi',
} as const;

export type API_SERVICE =
    | typeof API_SERVICE['mattermostApiService']
    | typeof API_SERVICE['pluginApiService']
