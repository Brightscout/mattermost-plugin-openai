export const API_SERVICE_CONFIG: Record<ApiServiceName, PluginApiService> = {
    getCompletion: {
        path: '/completions',
        method: 'POST',
        serviceName: 'getCompletion',
    },
};
