import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

// Constants
import {API_SERVICE_CONFIG} from 'constants/apiServiceConfig';
import {HEADER_CSRF_TOKEN, MMCSRF} from 'constants/common';

// Utils
import {getPluginApiBaseUrl} from 'utils';

// Service to make plugin API requests
const pluginApi = createApi({
    reducerPath: 'openAiPluginApi',
    baseQuery: fetchBaseQuery({
        baseUrl: getPluginApiBaseUrl().pluginApiBaseUrl,
        prepareHeaders: (headers) => {
            headers.set(HEADER_CSRF_TOKEN, Cookies.get(MMCSRF) ?? '');

            return headers;
        },
    }),
    endpoints: (builder) => ({
        [API_SERVICE_CONFIG.postImageToChannel.serviceName]: builder.query<
            PostImageToChannelResponseShape,
            APIRequestPayload
        >({
            query: (payload: PostImageToChannelPayload) => ({
                url: `/${payload.channel_id}${API_SERVICE_CONFIG.postImageToChannel.path}`,
                method: API_SERVICE_CONFIG.postImageToChannel.method,
                body: payload,
            }),
        }),

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

        [API_SERVICE_CONFIG.getImageFromText.serviceName]: builder.query<ImageGenerationResponseShape, APIRequestPayload>({
            query: (payload) => ({
                url: API_SERVICE_CONFIG.getImageFromText.path,
                method: API_SERVICE_CONFIG.getImageFromText.method,
                body: payload,
            }),
        }),
    }),
});

export default pluginApi;
