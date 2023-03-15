import styled from 'styled-components';
import {Modal, LinearProgress} from '@brightscout/mattermost-ui-library';

import Colors from 'styles/colorsForJs.module.scss';

export const StyledNativeTextArea = styled('textarea')({
    padding: '10px',
    border: `1px solid ${Colors.centerChannel_16}`,
    color: Colors.centerChannel,
    backgroundColor: Colors.centerChannelBg,
    outline: 'none',
    resize: 'none',
    width: '100%',

    '&:focus': {
        borderWidth: 2,
        borderColor: Colors.primary,
    },
});

export const StyledSummarizedText = styled('pre')({
    font: 'unset',
    border: 'none',
    whiteSpace: 'pre-wrap',
    fontWeight: 500,
    display: 'inline-block',
    padding: 0,
    margin: 0,
    background: 'transparent !important',
    wordBreak: 'break-word',
});

export const StyledSummarizationDialog = styled(Modal)({
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

    '& .modal-content div:nth-child(2)': {
        position: 'relative',
    },

    '&.isLoading .mm-modalFooter button': {
        color: Colors.centerChannel_32,
        background: Colors.centerChannel_8,
        borderColor: Colors.centerChannel_32,
        pointerEvents: 'none',
        cursor: 'default',
    },
});

export const StyledLinearProgress = styled(LinearProgress)({
    position: 'absolute !important' as 'absolute',
    top: 0,
    left: 0,
    width: '100%',
});
