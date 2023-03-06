import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState: PromptChatState = {
    chats: [],
};

const promptChatSlice = createSlice({
    name: 'promptChatSlice',
    initialState,
    reducers: {
        addChats: (state: PromptChatState, action: PayloadAction<{role: 'user' | 'assistant' | 'system'; content: string; id: string}>) => {
            state.chats.push(action.payload);
        },
        addSummary: (state: PromptChatState, action: PayloadAction<{role: 'assistant'; content: string; id: string; isSummary?: boolean}>) => {
            state.chats = state.chats.filter(({isSummary}) => !isSummary);
            state.chats.push(action.payload);
        },
        resetChat: (state: PromptChatState) => {
            state.chats = [];
        },
    },
});

export const {addChats, addSummary, resetChat} = promptChatSlice.actions;

export default promptChatSlice.reducer;
