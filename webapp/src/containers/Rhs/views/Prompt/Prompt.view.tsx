import React, {useMemo, useState} from 'react';
import {useDispatch} from 'react-redux';

// Components
import {ChatInput} from 'components/ChatInput';

// Hooks
import usePluginApi from 'hooks/usePluginApi';
import useApiRequestCompletionState from 'hooks/useApiRequestCompletionState';

// Actions
import {addChats} from 'reducers/PromptChat.reducer';

// Selectors
import {getAllChats} from 'selectors';

// Utils
import {parseCompletionPayload} from 'utils';

// Constants
import {API_SERVICE_CONFIG} from 'constants/apiServiceConfig';

// Styles
import {Chat} from 'components/Chat';

import {Container, ChatArea} from './Prompt.styles';

/**
 * Prompt View
 *
 * @example correct usage
 * ```tsx
 * <Prompt />
 * ```
 */
export const Prompt = () => {
    // Initialize hooks
    const dispatch = useDispatch();
    const {state, getApiState, makeApiRequestWithCompletionStatus} = usePluginApi();
    const [promptValue, setPromptValue] = useState('');

    // Selectors
    const {chats} = getAllChats(state);

    /**
     * The below disable of eslint is intentional.
     * The payload needs to be constant till the request cycle to be completed for our custom api to work.
     * We want the payload to change only when the prompt value changes.
     */
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const payload = useMemo(() => parseCompletionPayload({prompt: promptValue, chatHistory: chats}), [promptValue]);

    const {data, isLoading} = getApiState(API_SERVICE_CONFIG.getCompletion.serviceName, payload);

    /**
     * On Clicking the send button we are adding the user entered prompt to a state array,
     * and sending request to the open ai servers for the response.
     */
    const handleSend = async () => {
        dispatch(addChats(`Human: ${promptValue.trim()}`));
        makeApiRequestWithCompletionStatus(API_SERVICE_CONFIG.getCompletion.serviceName, payload);
    };

    /**
     * Triggers on changing the value in the text area,
     * in `loading` state the user wont be able to change the content in the text area.
     */
    const handleOnChange = ({target: {value}}: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (!isLoading) {
            setPromptValue(value);
        }
    };

    /**
     * On getting the success response from the api, we are resetting the text area,
     * and also storing the response in a state array.
     */
    useApiRequestCompletionState({
        serviceName: API_SERVICE_CONFIG.getCompletion.serviceName,
        payload,
        handleSuccess: () => {
            setPromptValue('');
            dispatch(addChats(data?.choices?.[0].text.trim() ?? 'Internal error please try again'));
        },
    });

    return (
        <Container>
            <ChatArea>{chats.map((chat, index) => (
                <Chat
                    key={chat}
                    chat={chat}
                    isUser={index % 2 === 0}
                />)).reverse()} </ChatArea>
            <ChatInput
                value={promptValue}
                isLoading={isLoading}
                handleOnChange={handleOnChange}
                handleOnSend={handleSend}
            />
        </Container>
    );
};
