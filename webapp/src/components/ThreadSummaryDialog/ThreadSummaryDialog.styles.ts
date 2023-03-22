import styled from 'styled-components';
import {Modal} from '@brightscout/mattermost-ui-library';

import Colors from 'styles/colorsForJs.module.scss';

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

    '&.isLoading .modal-content div:nth-child(2)': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '300px',
    },

    '&.isLoading .mm-modalFooter button': {
        color: Colors.centerChannel_32,
        background: Colors.centerChannel_8,
        borderColor: Colors.centerChannel_32,
        pointerEvents: 'none',
        cursor: 'default',
    },

    '&.hasError .mm-modalFooter button:nth-of-type(2)': {
        display: 'none',
    },
});
