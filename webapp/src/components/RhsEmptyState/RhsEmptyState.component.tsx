import React from 'react';

// Constants
import {OPEN_AI_ICON} from 'constants/icons';
import {RHS_EMPTY_STATE} from 'constants/common';

// Styles
import {EmptyStateWrapper, EmptyStateSvg, Title, SubTitle, StyledExampleBox} from './RhsEmptyState.styles';

/**
 * RhsEmptyState component
 *
 * @example correct usage
 * ```tsx
 * <RhsEmptyState />
 * ```
 */
export const RhsEmptyState = () => (
    <EmptyStateWrapper>
        <Title>{RHS_EMPTY_STATE.title}</Title>
        <EmptyStateSvg viewBox={RHS_EMPTY_STATE.emptyStateSvgViewBox}>
            {OPEN_AI_ICON}
        </EmptyStateSvg>
        <SubTitle>{RHS_EMPTY_STATE.subtitle}</SubTitle>
        <StyledExampleBox>{RHS_EMPTY_STATE.chatExample}</StyledExampleBox>
        <StyledExampleBox>
            <span>{RHS_EMPTY_STATE.imageInstructionExample}</span>
            <span>{RHS_EMPTY_STATE.imageExample}</span>
        </StyledExampleBox>
    </EmptyStateWrapper>
);
