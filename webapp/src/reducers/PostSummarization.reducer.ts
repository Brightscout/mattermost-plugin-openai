import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState: PostSummarizationState = {
    post: '',
    isDialogOpen: false,
};

const postSummarizationSlice = createSlice({
    name: 'postSummarizationSlice',
    initialState,
    reducers: {
        addPostAndOpenModal: (
            state: PostSummarizationState,
            action: PayloadAction<PostSummarizationState>,
        ) => {
            state.post = action.payload.post.trim();
            state.isDialogOpen = action.payload.isDialogOpen;
        },
        closeAndResetState: (state: PostSummarizationState) => {
            state.post = '';
            state.isDialogOpen = false;
        },
    },
});

export const {addPostAndOpenModal, closeAndResetState} = postSummarizationSlice.actions;
export default postSummarizationSlice.reducer;
