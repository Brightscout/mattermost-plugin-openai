import styled from 'styled-components';
import {Button, MMSearch} from '@brightscout/mattermost-ui-library';

import Colors from 'styles/colorsForJs.module.scss';

// Styles for the container
export const Container = styled('div')({
    width: '100%',
    alignItems: 'center',

    border: `1px solid ${Colors.centerChannel_24}`,
    gap: '2px',

    '& > div:first-child': {
        flex: 1,
    },

    '&.focused': {
        borderColor: Colors.primary,
    },
});

// Styles for the text area
export const StyledTextArea = styled(MMSearch)({
    '& .select__option-list': {
        top: 'unset',
        bottom: '67px',
    },

    '& fieldset': {
        border: 'none',
    },
});

// Styles for the send button
export const StyledButton = styled(Button)({
    height: '32px',

    svg: {
        pointerEvents: 'none',
    },
});

export const ButtonWrapper = styled('div')({
    background: Colors.centerChannel_4,
    display: 'flex',
    justifyContent: 'end',
    padding: '10px',
    height: '48px',
});
