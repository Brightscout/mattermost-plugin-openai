import React from 'react';

// Types
import {DisplayMessageProps} from './DisplayMessage.d';

// Styles
import {StyledCard} from './DisplayMessage.styles';

/**
 * DisplayMessage Component
 *
 * @example Correct usage
 * ```tsx
 * <DisplayMessage message={message} isError={isError} />
 * ```
 */
export const DisplayMessage = ({message, isError}: DisplayMessageProps) => <StyledCard isError={isError}>{message}</StyledCard>;
