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
export const ChatInput = ({value, isLoading, handleOnSend, handleOnChange}: ChatInputProps) => {
    const [isFocused, setIsFocused] = useState(false);

    const items = [
        {label: '/image', value: '/image'},
    ];

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
                    value={value}
                    onChange={handleOnChange}
                    component='textarea'
                    items={items}
                    fullWidth
                    disableResize
                    removeCloseButton
                    className={`${value ? 'contain-value' : ''}`}
                    rows={2}
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
