import {useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {setApiRequestCompletionState} from 'reducers/apiRequest';

import pluginApiService from 'services/pluginApiService';

function usePluginApi() {
    const state = useSelector((reduxState: ReduxState) => reduxState);
    const dispatch = useDispatch();

    // Pass payload only in POST requests for GET requests there is no need to pass payload argument
    const makeApiRequest = useCallback(
        async (serviceName: ApiServiceName, payload: APIRequestPayload) =>
            dispatch(pluginApiService.endpoints[serviceName].initiate(payload)),
        [dispatch],
    );

    const makeApiRequestWithCompletionStatus = useCallback(
        async (serviceName: ApiServiceName, payload: APIRequestPayload): Promise<void> => {
            const apiRequest = await makeApiRequest(serviceName, payload);
            if (apiRequest as unknown) {
                dispatch(setApiRequestCompletionState(serviceName));
            }
        },
        [dispatch],
    );

    // Pass payload only in POST requests for GET requests there is no need to pass payload argument
    const getApiState = useCallback(
        (serviceName: ApiServiceName, payload: APIRequestPayload) => {
            const {data, isError, isLoading, isSuccess, error, isUninitialized} =
                pluginApiService.endpoints[serviceName].select(payload)(state['plugins-open-ai']);
            return {data, isError, isLoading, isSuccess, error, isUninitialized};
        },
        [state],
    );

    return {makeApiRequest, makeApiRequestWithCompletionStatus, getApiState, state};
}

export default usePluginApi;
