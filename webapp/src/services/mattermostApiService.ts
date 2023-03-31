import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react';
import Cookies from 'js-cookie';

// Constants
import {API_SERVICE_CONFIG} from 'constants/apiServiceConfig';
import {HEADER_AUTHORIZATION, HEADER_CSRF_TOKEN, MMAUTHTOKEN, MMCSRF} from 'constants/common';

// Utils
import {getPluginApiBaseUrl} from 'utils';

const mattermostApi = createApi({
    reducerPath: 'mattermostApi',
    baseQuery: fetchBaseQuery({
        baseUrl: getPluginApiBaseUrl().mattermostApiBaseUrl,
        prepareHeaders: (headers) => {
            headers.set(HEADER_AUTHORIZATION, `Bearer ${Cookies.get(MMAUTHTOKEN)}`);
            headers.set(HEADER_CSRF_TOKEN, Cookies.get(MMCSRF) ?? '');

            return headers;
        },
    }),
    endpoints: (builder) => ({
        [API_SERVICE_CONFIG.getThreadFromPostId.serviceName]: builder.query<
            PostThreadResponseShape,
            APIRequestPayload
        >({
            query: (payload: GetThreadFromPost) => ({
                url: `${API_SERVICE_CONFIG.getThreadFromPostId.path}/${payload.postId}/thread?direction=down`,
                method: API_SERVICE_CONFIG.getThreadFromPostId.method,
            }),
        }),

        [API_SERVICE_CONFIG.postPostToChannel.serviceName]: builder.query<
            PostPostToChannelResponseShape,
            APIRequestPayload
        >({
            query: (payload: PostPostToChannelPayload) => ({
                url: API_SERVICE_CONFIG.postPostToChannel.path,
                method: API_SERVICE_CONFIG.postPostToChannel.method,
                body: payload,
            }),
        }),
    }),
});

export default mattermostApi;
