import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState: PromptChatState = {
    chats: [],
    isRequestOnProcess: false,
    isChatSummarized: false,
};

const promptChatSlice = createSlice({
    name: 'promptChatSlice',
    initialState,
    reducers: {
        addChats: (
            state: PromptChatState,
            action: PayloadAction<Chat>,
        ) => {
            state.chats.push(action.payload);
        },
        popLastChat: (state: PromptChatState) => {
            state.chats.pop();
        },
        addSummary: (
            state: PromptChatState,
            action: PayloadAction<Chat>,
        ) => {
            state.chats = state.chats.filter(({isSummary}) => !isSummary);
            state.chats.push(action.payload);
        },
        resetChat: (state: PromptChatState) => {
            state.chats = [];
        },
        setChatPromptPayload: (state: PromptChatState, action: PayloadAction<{payload: GetChatCompletionPayload}>) => {
            state.payload = action.payload.payload;
        },
        setIsChatSummarized: (state: PromptChatState, action: PayloadAction<boolean>) => {
            state.isChatSummarized = action.payload;
        },
    },
});

export const {addChats, addSummary, resetChat, popLastChat, setChatPromptPayload, setIsChatSummarized} = promptChatSlice.actions;

export default promptChatSlice.reducer;
