import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

// Constants
import {API_SERVICE_CONFIG} from 'constants/apiServiceConfig';
import {BaseUrlOpenAi} from 'constants/common';
import {ENV} from 'constants/env.constants';

// Service to make plugin API requests
const pluginApi = createApi({
    reducerPath: 'openAiPluginApi',
    baseQuery: fetchBaseQuery({
        baseUrl: BaseUrlOpenAi,
        prepareHeaders: (headers) => {
            headers.set('Authorization', `Bearer ${ENV.OPEN_AI_API_KEY}`);
            headers.set('OpenAI-Organization', 'org-OuPqTe4jcYuJ9na7hwYC4ERs');
            return headers;
        },
    }),
    endpoints: (builder) => ({
        [API_SERVICE_CONFIG.getCompletion.serviceName]: builder.query<CompletionResponseShape, APIRequestPayload>({
            query: (payload) => ({
                url: API_SERVICE_CONFIG.getCompletion.path,
                method: API_SERVICE_CONFIG.getCompletion.method,
                body: payload,
            }),
        }),
    }),
});

export default pluginApi;
