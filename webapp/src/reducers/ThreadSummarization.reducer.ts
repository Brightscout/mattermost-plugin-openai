import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState: ThreadSummarizationState = {
    postId: '',
    isDialogOpen: false,
};

const threadSummarizationSlice = createSlice({
    name: 'postSummarizationSlice',
    initialState,
    reducers: {

        /**
         * Stores the postId and opens the summarization modal.
         */
        addPostAndOpenModal: (
            state: ThreadSummarizationState,
            action: PayloadAction<ThreadSummarizationState>,
        ) => {
            state.postId = action.payload.postId.trim();
            state.isDialogOpen = action.payload.isDialogOpen;
        },

        /**
         * Resets the state and closes the summarization modal.
         */
        closeAndResetState: (state: ThreadSummarizationState) => {
            state.postId = '';
            state.isDialogOpen = false;
        },
    },
});

export const {addPostAndOpenModal, closeAndResetState} = threadSummarizationSlice.actions;
export default threadSummarizationSlice.reducer;
