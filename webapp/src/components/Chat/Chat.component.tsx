import React from 'react';

import {parseConversationalChat} from 'utils';

// Types
import {ChatProps} from './Chat.d';

// Styles
import {StyledCard, StyledText} from './Chat.styles';

/**
 * Chat Component
 *
 * @example Correct usage
 * ```tsx
 * <Chat chat={chat} isUser={isUser} />
 * ```
 */
export const Chat = ({chat, isUser}: ChatProps) => (
    <StyledCard isUser={isUser}>
        <StyledText>{parseConversationalChat({chat})}</StyledText>
    </StyledCard>
);
