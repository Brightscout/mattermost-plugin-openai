import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState: PromptChatState = {
    title: '',
    chats: [],
};

export const promptChatReducer = createSlice({
    name: 'promptChatSlice',
    initialState,
    reducers: {
        addChats: (state: PromptChatState, action: PayloadAction<string>) => {
            state.chats.push(action.payload);
        },
    },
});
