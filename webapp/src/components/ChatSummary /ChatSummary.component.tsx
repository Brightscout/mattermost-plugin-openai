import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {Icon} from '@brightscout/mattermost-ui-library';

// Actions
import {resetChat} from 'reducers/PromptChat.reducer';

// Constants
import {ClearContextConfirmationDialog} from 'constants/common';

// Colors
import Colors from 'styles/colorsForJs.module.scss';

// Types
import {ChatInputProps} from './ChatSummary.d';

// Styled Components
import {Container, Header, Title, StyledContent, CloseButton, ClearContextConfirmation} from './ChatSummary.styles';

export const ChatSummary = ({
    chat = 'Lorem Ipsum Testing 1234Lorem Ipsum Testing 1234Lorem Ipsum Testing 1234Lorem Ipsum Testing 1234',
}: ChatInputProps) => {
    const dispatch = useDispatch();

    const [isSummaryExpanded, setIsSummaryExpanded] = useState(false);
    const [isCloseIconHovered, setIsCloseIconHovered] = useState(false);
    const [isClearConfirmationModalOpen, setIsClearConfirmationModalOpen] = useState(false);

    return (
        <>
            <Container
                className={`${isSummaryExpanded ? 'summary-expanded' : ''} ${
                    isCloseIconHovered || isClearConfirmationModalOpen ? 'close-warning' : ''
                }`}
                onClick={() => setIsSummaryExpanded((prevState) => !prevState)}
            >
                <Header>
                    <Title>{'SUMMARY'}</Title>
                    <CloseButton
                        onMouseEnter={() => isSummaryExpanded && setIsCloseIconHovered(true)}
                        onMouseLeave={() => setIsCloseIconHovered(false)}
                        onClick={(e) => {
                            if (isSummaryExpanded) {
                                e.stopPropagation();
                                setIsClearConfirmationModalOpen(true);
                            }
                        }}
                    >
                        <Icon
                            name={isSummaryExpanded ? 'Close' : 'ArrowDown'}
                            iconColor={isCloseIconHovered || isClearConfirmationModalOpen ? Colors.white : Colors.centerChannel}
                            size={isSummaryExpanded ? 18 : 16}
                        />
                    </CloseButton>
                </Header>
                <StyledContent className={`${isSummaryExpanded ? 'summary-expanded' : ''}`}>{chat}</StyledContent>
            </Container>
            <ClearContextConfirmation
                show={isClearConfirmationModalOpen}
                destructive={true}
                title={ClearContextConfirmationDialog.title}
                description={ClearContextConfirmationDialog.description}
                primaryActionText={ClearContextConfirmationDialog.primaryActionText}
                secondaryActionText={ClearContextConfirmationDialog.secondaryActionText}
                onSubmitHandler={() => {
                    dispatch(resetChat());
                    setIsClearConfirmationModalOpen(false);
                }}
                onCloseHandler={() => setIsClearConfirmationModalOpen(false)}
            />
        </>
    );
};
