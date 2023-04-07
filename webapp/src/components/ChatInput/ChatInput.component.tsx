import React, {useState, useEffect, useRef} from 'react';
import {Spinner} from '@brightscout/mattermost-ui-library';

// Utils
import {getLastValue} from 'utils';

// Constants
import {IMAGE_GENERATIONS, KEY_VALUES, REGEX} from 'constants/common';
import {IMAGE_GENERATIONS_COMMAND_CONFIGS} from 'constants/configs';
import {POST_CHANNEL_ICON} from 'constants/icons';

// Types
import {ChatInputProps} from './ChatInput.d';

// Styles
import {StyledButton, StyledTextArea, Container, ButtonWrapper} from './ChatInput.styles';

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
    const [searchOptions, setSearchOptions] = useState<ImageGenerationOption[]>([]);
    const [optionFilterBy, setOptionFilterBy] = useState('');
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    /**
     * ! This algorithm only supports /image command. Would need to rewrite the algo to support another slash commands.
     */

    const handleValueChange = (inputValue: string) => {
        const lastValue = getLastValue(inputValue);
        const inputValueSplitBySpace = inputValue.split(REGEX.whiteSpace);
        let newFilterBy = lastValue;

        /**
         * Last Value is the word which the current user is typing.
         * eg: /input x25 | here last value is x25 and inputValue is the whole string.
         * So if last value is present and the string starts with `/` we keep updating the filter value so it can be sorted from the search options.
         */
        if (lastValue && inputValue.startsWith(IMAGE_GENERATIONS_COMMAND_CONFIGS.slash)) {
            IMAGE_GENERATIONS_COMMAND_CONFIGS.mainKeys.forEach((item) => {
                if (lastValue.startsWith(item.label)) {
                    const valueOfKey = getLastValue(lastValue, item.label);
                    newFilterBy = valueOfKey;
                }

                /**
                 * Here we update the search options according to the last value.
                 * The reason we are doing this is because when last value is not present, on the else block we are setting search options
                 * and when last value is present the old search options are kept therefore to update the search option we are keeping this check.
                 */
                if (
                    item.label.includes(lastValue) &&
                    !inputValue.includes(item.label) &&
                    inputValueSplitBySpace.length < 3
                ) {
                    setSearchOptions(
                        IMAGE_GENERATIONS_COMMAND_CONFIGS.mainKeys.filter(({label}) =>
                            label.includes(lastValue),
                        ),
                    );
                }
            });

            /**
             * if `/image` and res commands are present, or if the input value does not contain `/image` or if the lastValue === `/input`
             * we are removing the options.
             */
            if (
                (inputValueSplitBySpace.length === 2 &&
                    !inputValueSplitBySpace.includes(
                        IMAGE_GENERATIONS_COMMAND_CONFIGS.image.trim(),
                    )) ||
                lastValue === IMAGE_GENERATIONS_COMMAND_CONFIGS.image.trim()
            ) {
                setSearchOptions([]);
            }

            /**
             * If last value is empty, and the input value contains `/image x256|x512|x1024` then empty the search options.
             */
        } else if (REGEX.imageGenerationSlashPrompt.test(inputValue)) {
            setSearchOptions([]);

            /**
             * If input value equals `/image `, then we show the options for resolution.
             */
        } else if (inputValue === IMAGE_GENERATIONS_COMMAND_CONFIGS.image) {
            setSearchOptions(
                IMAGE_GENERATIONS_COMMAND_CONFIGS.mainKeys.filter(({secondaryLabel}) =>
                    secondaryLabel.includes(IMAGE_GENERATIONS.resolutionPlaceholder),
                ),
            );

            /**
             * If input value starts with a `/` and does not contain white space before `/`.
             */
        } else if (
            inputValue.startsWith(IMAGE_GENERATIONS_COMMAND_CONFIGS.slash) &&
            !REGEX.whiteSpace.test(inputValue) &&
            !(inputValue === IMAGE_GENERATIONS_COMMAND_CONFIGS.image.trim())
        ) {
            setSearchOptions(
                IMAGE_GENERATIONS_COMMAND_CONFIGS.mainKeys.filter(
                    ({label}) => label === IMAGE_GENERATIONS_COMMAND_CONFIGS.image.trim(),
                ),
            );
        } else {
            setSearchOptions([]);
        }

        /**
         * Updating the options filter
         */
        setOptionFilterBy(newFilterBy);
    };

    const onOptionSelectHandler = (
        _: React.MouseEvent<HTMLLIElement, MouseEvent> | React.KeyboardEvent<HTMLInputElement>,
        option: ImageGenerationOption,
    ) => {
        let newVal = value;

        /**
         * Here we are replacing last value with its complete word. For example if user type '/im'
         * we will replace that with '/image ' (just like autocomplete functionality works)
         */
        if (optionFilterBy) {
            const valueArr = value.split(optionFilterBy);
            valueArr.pop();
            newVal = valueArr.join(optionFilterBy);
        }
        handleOnChange(newVal + (option.label ?? '') + ' ');
    };

    const handleSearchSubmit = (event: React.KeyboardEvent) => {
        if (event.key === KEY_VALUES.enter && !event.shiftKey) {
            event.preventDefault();
            const splitPrompt = value.split(REGEX.whiteSpace).filter((string) => string);
            const secondWordInPrompt = splitPrompt[1];
            if (
                (splitPrompt.length < 3 &&
                    value.trim().startsWith(IMAGE_GENERATIONS_COMMAND_CONFIGS.slash) &&
                    (!secondWordInPrompt ||
                        REGEX.resolution.test(secondWordInPrompt) ||
                        secondWordInPrompt === 'x')) ||
                value === ''
            ) {
                return;
            }
            handleOnSend();
        }
    };

    useEffect(() => {
        handleValueChange(value);
    }, [value]);

    /**
     * To make the height of the text area to grow with content.
     */
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = IMAGE_GENERATIONS.textAreaDefaultHeight;
            const scrollHeight = textareaRef.current.scrollHeight;
            textareaRef.current.style.height =
                Math.min(scrollHeight, IMAGE_GENERATIONS.textAreaMaxHeight) + 'px';
        }
    }, [value]);

    return (
        <Container>
            <StyledTextArea
                searchValue={value}
                setSearchValue={handleOnChange}
                onSelect={onOptionSelectHandler}
                autoFocus={false}
                component='textarea'
                items={searchOptions}
                filterBy={optionFilterBy}
                fullWidth
                disableResize
                removeCloseButton
                className={`${value ? 'contain-value' : ''}`}
                inputRef={textareaRef}
                secondaryLabelPosition='inline'
                onKeyPress={handleSearchSubmit}
            />
            <ButtonWrapper>
                <StyledButton disabled={isLoading || !value} onClick={handleOnSend}>
                    {isLoading ? <Spinner /> : POST_CHANNEL_ICON}
                </StyledButton>
            </ButtonWrapper>
        </Container>
    );
};
