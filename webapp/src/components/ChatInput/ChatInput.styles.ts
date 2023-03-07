import styled from 'styled-components';
import {TextArea, Button} from '@brightscout/mattermost-ui-library';

import Colors from 'styles/colorsForJs.module.scss';

// Styles for the container
export const Container = styled('div')({
    display: 'flex',
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
export const StyledTextArea = styled(TextArea)({
    '&.contain-value label': {
        display: 'none',
    },

    '& textarea': {
        resize: 'none',
    },

    '& textarea::-webkit-scrollbar': {
        width: '5px',
    },

    '& textarea:focus + label': {
        display: 'none',
    },

    '& fieldset': {
        width: '100%',
        inset: '0 0 0',
        border: 0,
    },

    '& fieldset legend': {
        display: 'none',
    },
});

// Styles for the send button
export const StyledButton = styled(Button)({
    marginRight: '10px',
    width: '80px',
});
