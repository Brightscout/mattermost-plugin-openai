import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

// Constants
import {API_SERVICE_CONFIG} from 'constants/apiServiceConfig';
import {BaseUrlOpenAi} from 'constants/common';
import {getConfigCredentials} from 'selectors';

// Service to make openAI API requests
const openAiApi = createApi({
    reducerPath: 'openAiApi',
    baseQuery: fetchBaseQuery({
        baseUrl: BaseUrlOpenAi,
        prepareHeaders: (headers, {getState}) => {
            const {openAIApiKey, openAIOrganizationId} = getConfigCredentials(getState() as ReduxState);

            if (openAIApiKey) {
                headers.set('Authorization', `Bearer ${openAIApiKey}`);
            }

            if (openAIOrganizationId) {
                headers.set('OpenAI-Organization', openAIOrganizationId);
            }

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

        [API_SERVICE_CONFIG.getChatCompletion.serviceName]: builder.query<ChatCompletionResponseShape, APIRequestPayload>({
            query: (payload) => ({
                url: API_SERVICE_CONFIG.getChatCompletion.path,
                method: API_SERVICE_CONFIG.getChatCompletion.method,
                body: payload,
            }),
        }),
    }),
});

export default openAiApi;
