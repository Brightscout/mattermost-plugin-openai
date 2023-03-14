import React, {useMemo} from 'react';
import {useDispatch} from 'react-redux';

// components
import {PostSummaryDialog} from 'components/PostSummaryDialog/PostSummaryDialog.component';

// reducers
import {fetchConfigCredentialsFromSettings} from 'reducers/Credentials.reducer';

/**
 * App Component
 * This is main App component for plugin.
 *
 * @example Correct usage
 * ```tsx
 * <App />
 * ```
 */
export const App = () => {
    const dispatch = useDispatch();

    useMemo(() => {
        dispatch(fetchConfigCredentialsFromSettings());
    }, []);

    return <PostSummaryDialog />;
};
