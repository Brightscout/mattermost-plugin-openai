import styled from 'styled-components';
import {Card} from '@brightscout/mattermost-ui-library';

import Colors from 'styles/colorsForJs.module.scss';

import {ChatProps} from './Chat.d';

export const StyledCard = styled(Card)<Pick<ChatProps, 'isUser'>>(({isUser}) => ({
    background: isUser ? Colors.primary_72 : Colors.centerChannel_8,
    width: 'fit-content',
    display: 'inline-flex',
    alignItems: 'center',
    alignSelf: isUser ? 'flex-end' : 'flex-start',
    color: isUser ? Colors.white : Colors.centerChannel,
}));

export const StyledText = styled.pre({
    font: 'unset',
    border: 'none',
    whiteSpace: 'pre-wrap',
    fontWeight: 500,
    display: 'inline-block',
    padding: 0,
    margin: 0,
    background: 'transparent !important',
    wordBreak: 'unset',
});
