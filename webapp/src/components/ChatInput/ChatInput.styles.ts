import styled from 'styled-components';
import {Button, AutoComplete} from '@brightscout/mattermost-ui-library';

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
export const StyledTextArea = styled(AutoComplete)({
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
    marginRight: '10px',
    width: '80px',
});
