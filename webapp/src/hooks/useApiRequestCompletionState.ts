import {useEffect} from 'react';
import {useDispatch} from 'react-redux';

// Reducers
import {resetApiRequestCompletionState} from 'reducers/apiRequest';

// Selectors
import {getApiRequestCompletionState} from 'selectors';

// Constants
import {API_SERVICE} from 'constants/apiServiceConfig';

// Hooks
import useHooksBasedOnService from './useHooksBasedOnService';

type Props = {
    handleSuccess?: () => void;
    handleError?: (error: ApiErrorResponse) => void;
    serviceName: ApiServiceName;
    payload?: APIRequestPayload;
    services?: API_SERVICE;
};

function useApiRequestCompletionState({
    handleSuccess,
    handleError,
    serviceName,
    payload,
    services = API_SERVICE.pluginApiService,
}: Props) {
    const {getApiState, state} = useHooksBasedOnService({service: services})();
    const dispatch = useDispatch();

    // Observe for the change in redux state after API call and do the required actions
    useEffect(() => {
        if (
            getApiRequestCompletionState(state).requests.includes(serviceName) &&
            getApiState(serviceName, payload)
        ) {
            const {isError, isSuccess, isUninitialized, error} = getApiState(serviceName, payload);
            if (isSuccess && !isError) {
                // eslint-disable-next-line no-unused-expressions
                handleSuccess?.();
            }

            if (!isSuccess && isError) {
                // eslint-disable-next-line no-unused-expressions
                handleError?.(error as ApiErrorResponse);
            }

            if (!isUninitialized) {
                dispatch(resetApiRequestCompletionState(serviceName));
            }
        }
    }, [
        getApiRequestCompletionState(state).requests.includes(serviceName),
        getApiState(serviceName, payload),
    ]);
}

export default useApiRequestCompletionState;
