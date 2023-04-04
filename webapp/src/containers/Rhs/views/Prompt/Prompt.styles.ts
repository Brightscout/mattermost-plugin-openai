import styled from 'styled-components';
import {Dialog, Radio} from '@brightscout/mattermost-ui-library';

export const Container = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    height: '100%',
});

export const ChatArea = styled('div')({
    display: 'flex',
    flexDirection: 'column-reverse',
    flex: 1,
    overflowY: 'auto',
    paddingRight: '10px',
});

export const ResolutionDialog = styled(Dialog)({
    '& h2': {
        margin: 0,
    },

    '&.fade': {
        opacity: 1,
        transition: 'opacity 0.15s linear',
        '&:not(.show)': {
            opacity: 0,
        },
    },

    '&.show .modal-dialog': {
        transform: 'none',
    },
});

export const ResolutionRadio = styled(Radio)({

    '& .mm-radio-input': {
        margin: 0,
    },

    '& .mm-radio-active': {
        margin: 0,
        height: '7px',
        width: '7px',
        top: '50%',
        left: '50%',
    },

    '& .mm-radio-input:checked ~ .mm-radio-active': {
        transform: 'scale(1) translate(-50%,-50%)',
    },
});

export const ResolutionWrapper = styled('div')({
    display: 'flex',
    justifyContent: 'space-evenly',
});
