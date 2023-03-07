import React, {useMemo} from 'react';
import {useDispatch} from 'react-redux';

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
export const App = (): JSX.Element => {
    const dispatch = useDispatch();

    useMemo(() => {
        dispatch(fetchConfigCredentialsFromSettings());
    }, []);

    return <></>;
};
