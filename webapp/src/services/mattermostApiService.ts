import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react';

import {API_SERVICE_CONFIG} from 'constants/apiServiceConfig';

// Utils
import {getPluginApiBaseUrl} from 'utils';

const mattermostApi = createApi({
    reducerPath: 'mattermostApi',
    baseQuery: fetchBaseQuery({
        baseUrl: getPluginApiBaseUrl().mattermostApiBaseUrl,
    }),
    endpoints: (builder) => ({
        [API_SERVICE_CONFIG.getThreadFromPostId.serviceName]: builder.query<PostThreadResponseShape, APIRequestPayload>(
            {
                query: (payload: GetThreadFromPost) => ({
                    url: `${API_SERVICE_CONFIG.getThreadFromPostId.path}/${payload.postId}/thread`,
                    method: API_SERVICE_CONFIG.getThreadFromPostId.method,
                }),
            },
        ),
    }),
});

export default mattermostApi;
