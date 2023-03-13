import styled from 'styled-components';
import {Dialog} from '@brightscout/mattermost-ui-library';

import Colors from 'styles/colorsForJs.module.scss';

export const Container = styled('div')({
    width: '100%',
    cursor: 'pointer',
    background: Colors.summaryCard_04,
    color: Colors.centerChannel,
    border: `1px solid ${Colors.centerChannel_16}`,
    borderRadius: '4px',
    boxShadow: Colors.elevation1,
    padding: 16,
    transition: 'max-height 250ms ease-in-out',
    maxHeight: '56px',

    '&.summary-expanded': {
        maxHeight: '100%',
    },

    '&.close-warning': {
        background: Colors.error,
        color: Colors.white,
    },
});

export const Header = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: '16px',
});

export const Title = styled('p')({
    fontWeight: '600',
    margin: 0,
});

export const StyledContent = styled.p({
    fontWeight: 500,
    maxHeight: 0,
    overflow: 'hidden',

    '&.summary-expanded': {
        maxHeight: '100%',
    },
});

export const CloseButton = styled('button')({
    all: 'unset',
});

export const ClearContextConfirmation = styled(Dialog)({
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
