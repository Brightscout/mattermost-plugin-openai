import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState: PromptChatState = {
    chats: [],
};

const promptChatSlice = createSlice({
    name: 'promptChatSlice',
    initialState,
    reducers: {
        addChats: (state: PromptChatState, action: PayloadAction<string>) => {
            state.chats.push(action.payload);
        },
    },
});

export const {addChats} = promptChatSlice.actions;

export default promptChatSlice.reducer;
