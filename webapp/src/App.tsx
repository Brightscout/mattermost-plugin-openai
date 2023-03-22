import React, {useMemo} from 'react';
import {useDispatch} from 'react-redux';

// components
import {ThreadSummaryDialog} from 'components/ThreadSummaryDialog';

// reducers
import {fetchConfigCredentialsFromSettings} from 'reducers/Credentials.reducer';

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
    const dispatch = useDispatch();

    /**
     * Before the first render we are fetching the configuration settings from the mattermost webapp.
     */
    useMemo(() => {
        dispatch(fetchConfigCredentialsFromSettings());
    }, []);

    return <ThreadSummaryDialog />;
};
