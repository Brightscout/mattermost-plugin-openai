import React, {useMemo} from 'react';
import {useDispatch} from 'react-redux';

// components
import {ThreadSummaryDialog} from 'components/ThreadSummaryDialog';

// reducers
import {addCredentials} from 'reducers/Credentials.reducer';

// constants
import {API_SERVICE_CONFIG} from 'constants/apiServiceConfig';

// hooks
import usePluginApi from 'hooks/usePluginApi';
import useApiRequestCompletionState from 'hooks/useApiRequestCompletionState';

/**
 * App Component
 * This is the main App component for the plugin.
 *
 * @example Correct usage
 * ```tsx
 * <App />
 * ```
 */
export const App = () => {
    // Initializing Hooks
    const dispatch = useDispatch();
    const {makeApiRequestWithCompletionStatus, getApiState} = usePluginApi();

    const {data} = getApiState(API_SERVICE_CONFIG.getOpenAIApiKeyFromWebapp.serviceName);

    /**
     * Before the first render we are fetching the configuration settings from the mattermost webapp.
     */
    useMemo(() => {
        makeApiRequestWithCompletionStatus(
            API_SERVICE_CONFIG.getOpenAIApiKeyFromWebapp.serviceName,
        );
    }, []);

    useApiRequestCompletionState({
        services: 'usePluginApi',
        serviceName: API_SERVICE_CONFIG.getOpenAIApiKeyFromWebapp.serviceName,
        handleSuccess: () => {
           if (data) {
            dispatch(addCredentials(data));
           }
        },
    });

    return <ThreadSummaryDialog />;
};
