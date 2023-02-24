import {useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {setApiRequestCompletionState} from 'reducers/apiRequest';

import services from 'services';

function usePluginApi() {
    const pluginState = useSelector((state: ReduxState) => state['plugins-mattermost-plugin-open-ai' as unknown as 'mattermost-plugin-open-ai']);
    const dispatch = useDispatch();

    const makeApiRequest = async (apiServiceName: ApiServiceName, payload?: APIRequestPayload): Promise<any> => {
        return dispatch(services.endpoints[apiServiceName].initiate(payload)); //TODO: add proper type here
    };

    const makeApiRequestWithCompletionStatus = async (serviceName: ApiServiceName, payload?: APIRequestPayload) => {
        const apiRequest = await makeApiRequest(serviceName, payload);
        if (apiRequest) {
            dispatch(setApiRequestCompletionState(serviceName));
        }
    };

    const getApiState = useCallback(
        (apiServiceName: ApiServiceName, body?: APIRequestPayload) => {
            const {data, isError, isLoading, isSuccess, error, isUninitialized} = services.endpoints[apiServiceName].select(
                body as APIRequestPayload,
            )(pluginState);
            return {
                data,
                isError,
                isLoading,
                isSuccess,
                error,
                isUninitialized,
            };
        },
        [pluginState],
    );

    return {
        makeApiRequest,
        makeApiRequestWithCompletionStatus,
        getApiState,
        pluginState,
    };
}

export default usePluginApi;
