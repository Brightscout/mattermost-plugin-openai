export type ChatInputProps = {

    /**
     * Value of the textarea.
     */
    value: string;

    /**
     * If `loading = true` the send button is disabled
     */
    isLoading?: boolean;

    /**
     * Handler triggered when there is a change in the value of the textarea
     * @param value - changed value.
     */
    handleOnChange: (value: string) => void;

    /**
     * Handler triggered when the send button is clicked.
     */
    handleOnSend: () => void;
};
