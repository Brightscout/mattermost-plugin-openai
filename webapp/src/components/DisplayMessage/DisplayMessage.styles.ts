import styled from 'styled-components';
import {Card} from '@brightscout/mattermost-ui-library';

import Colors from 'styles/colorsForJs.module.scss';

import {DisplayMessageProps} from './DisplayMessage.d';

export const StyledCard = styled(Card)<Pick<DisplayMessageProps, 'isError'>>(({isError}) => ({
    background: isError ? Colors.error_8 : '',
    border: `1px solid ${isError ? Colors.error : ''}`,
    color: isError ? Colors.error : '',
}));
