import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

// Constants
import {API_SERVICE_CONFIG} from 'constants/apiServiceConfig';

// Utils
import {getPluginApiBaseUrl} from 'utils';

// Service to make plugin API requests
const pluginApi = createApi({
    reducerPath: 'openAiPluginApi',
    baseQuery: fetchBaseQuery({
        baseUrl: getPluginApiBaseUrl().pluginApiBaseUrl,
    }),
    endpoints: (builder) => ({
        [API_SERVICE_CONFIG.getOpenAIApiKeyFromWebapp.serviceName]: builder.query<OpenAIApiKeyFromWebappShape, APIRequestPayload>({
            query: () => ({
                url: API_SERVICE_CONFIG.getOpenAIApiKeyFromWebapp.path,
                method: API_SERVICE_CONFIG.getOpenAIApiKeyFromWebapp.method,
            }),
        }),
    }),
});

export default pluginApi;
