import {useEffect} from 'react';
import {useDispatch} from 'react-redux';

import {resetApiRequestCompletionState} from 'reducers/apiRequest';
import {getApiRequestCompletionState} from 'selectors';

import usePluginApi from './usePluginApi';

type Props = {
    handleSuccess?: () => void;
    handleError?: (error: ApiErrorResponse) => void;
    serviceName: ApiServiceName;
    payload?: APIRequestPayload;
};

function useApiRequestCompletionState({handleSuccess, handleError, serviceName, payload}: Props) {
    const {getApiState, state} = usePluginApi();
    const dispatch = useDispatch();

    // Observe for the change in redux state after API call and do the required actions
    useEffect(() => {
        if (getApiRequestCompletionState(state).requests.includes(serviceName) && getApiState(serviceName, payload)) {
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
    }, [getApiRequestCompletionState(state).requests.includes(serviceName), getApiState(serviceName, payload)]);
}

export default useApiRequestCompletionState;
