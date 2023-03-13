import React, {useState, useEffect} from 'react';

// Types
import {ChatInputProps} from './ChatInput.d';

// Styles
import {StyledButton, StyledTextArea, Container} from './ChatInput.styles';

/**
 * ChatInput Component
 *
 * @example Correct usage
 * ```tsx
 * <ChatInput
 *  value={value}
 *  isLoading={loading}
 *  handleOnChange={handleOnChange}
 *  handleOnSend={handleOnSend}
 * />
 */
export const ChatInput = ({value, handleOnChange, isLoading, handleOnSend}: ChatInputProps) => {
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
        setIsFocused(false);
    }, [isLoading]);

    return (
        <Container
            className={`${isFocused && !isLoading ? 'focused' : ''}`}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
        >
            <StyledTextArea
                className={`${value ? 'contain-value' : ''}`}
                rows={2}
                label='Please enter your prompt'
                onChange={handleOnChange}
                value={value}
            />
            <StyledButton
                {...(isLoading && {iconName: 'Spinner'})}
                disabled={isLoading || Boolean(!value)}
                onClick={handleOnSend}
            >
                Send
            </StyledButton>
        </Container>
    );
};
