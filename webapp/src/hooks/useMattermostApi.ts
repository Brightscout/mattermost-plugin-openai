import {useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';

// Reducers
import {setApiRequestCompletionState} from 'reducers/apiRequest';

// Services
import mattermostApiService from 'services/mattermostApiService';

// Constants
import {pluginReduxStateId} from 'constants/common';

function useMattermostApi() {
    const state = useSelector((reduxState: ReduxState) => reduxState);
    const dispatch = useDispatch();

    // Pass payload only in POST requests. For GET requests, there is no need to pass a payload argument
    const makeApiRequest = useCallback(
        async (serviceName: ApiServiceName, payload: APIRequestPayload) =>
            dispatch(mattermostApiService.endpoints[serviceName].initiate(payload)),
        [dispatch],
    );

    const makeApiRequestWithCompletionStatus = useCallback(
        async (serviceName: ApiServiceName, payload: APIRequestPayload): Promise<void> => {
            await makeApiRequest(serviceName, payload);
            dispatch(setApiRequestCompletionState(serviceName));
        },
        [dispatch],
    );

    // Pass payload only in POST requests. For GET requests, there is no need to pass a payload argument
    const getApiState = useCallback(
        (serviceName: ApiServiceName, payload: APIRequestPayload) => {
            const {data, isError, isLoading, isSuccess, error, isUninitialized} =
                mattermostApiService.endpoints[serviceName].select(payload)(
                    state[pluginReduxStateId],
                );
            return {data, isError, isLoading, isSuccess, error, isUninitialized};
        },
        [state],
    );

    return {makeApiRequest, makeApiRequestWithCompletionStatus, getApiState, state};
}

export default useMattermostApi;
