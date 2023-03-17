import {useSelector, useDispatch} from 'react-redux';

import {setApiRequestCompletionState} from 'reducers/apiRequest';

import mattermostApiService from 'services/mattermostApiService';

function useMattermostApi() {
    const state = useSelector((reduxState: ReduxState) => reduxState);
    const dispatch = useDispatch();

    // Pass payload only in POST requests for GET requests there is no need to pass payload argument
    const makeApiRequest = async (serviceName: ApiServiceName, payload: APIRequestPayload) =>
        dispatch(mattermostApiService.endpoints[serviceName].initiate(payload));

    const makeApiRequestWithCompletionStatus = async (
        serviceName: ApiServiceName,
        payload: APIRequestPayload,
    ): Promise<void> => {
        const apiRequest = await makeApiRequest(serviceName, payload);
        if (apiRequest as unknown) {
            dispatch(setApiRequestCompletionState(serviceName));
        }
    };

    // Pass payload only in POST requests for GET requests there is no need to pass payload argument
    const getApiState = (serviceName: ApiServiceName, payload: APIRequestPayload) => {
        const {data, isError, isLoading, isSuccess, error, isUninitialized} =
            mattermostApiService.endpoints[serviceName].select(payload)(
                state['plugins-mattermost-plugin-open-ai'],
            );
        return {data, isError, isLoading, isSuccess, error, isUninitialized};
    };

    return {makeApiRequest, makeApiRequestWithCompletionStatus, getApiState, state};
}

export default useMattermostApi;
