import {useSelector, useDispatch} from 'react-redux';

import {setApiRequestCompletionState} from 'reducers/apiRequest';

import openAiApiService from 'services/openAiApiService';

function useOpenAiApi() {
    const state = useSelector((reduxState: ReduxState) => reduxState);
    const dispatch = useDispatch();

    // Pass payload only in POST requests for GET requests there is no need to pass payload argument
    const makeApiRequest = async (serviceName: ApiServiceName, payload: APIRequestPayload) =>
        dispatch(openAiApiService.endpoints[serviceName].initiate(payload));

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
        const {data, isError, isLoading, isSuccess, error, isUninitialized} = openAiApiService.endpoints[
            serviceName
        ].select(payload)(state['plugins-open-ai']);
        return {data, isError, isLoading, isSuccess, error, isUninitialized};
    };

    return {makeApiRequest, makeApiRequestWithCompletionStatus, getApiState, state};
}

export default useOpenAiApi;
