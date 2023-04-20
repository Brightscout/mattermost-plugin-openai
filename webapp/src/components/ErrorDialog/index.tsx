import React from 'react';
import {useDispatch} from 'react-redux';

import {Dialog} from '@brightscout/mattermost-ui-library';

import usePluginApi from 'hooks/usePluginApi';

import {toggleErrorDialog} from 'reducers/errorDialog';
import {getErrorDialogState} from 'selectors';

const ErrorDialog = () => {
    const dispatch = useDispatch();
    const {state} = usePluginApi();
    const {visibility, title, description} = getErrorDialogState(state);

    const handleErrorDialogClose = () => {
        dispatch(
            toggleErrorDialog({
                visibility: false,
                title: '',
                description: '',
            }),
        );
    };

    return (
        <Dialog
            show={visibility}
            title={title || 'Error occurred'}
            description={description || 'Something went wrong. Please try again.'}
            onCloseHandler={handleErrorDialogClose}
            className='open-ai-error-dialog'
        />
    );
};

export default ErrorDialog;
