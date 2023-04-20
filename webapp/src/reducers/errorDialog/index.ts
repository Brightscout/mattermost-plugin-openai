import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState: ErrorDialogState = {
    visibility: false,
    title: '',
    description: '',
};

export const errorDialogSlice = createSlice({
    name: 'errorDialogSlice',
    initialState,
    reducers: {
        toggleErrorDialog: (state: ErrorDialogState, action: PayloadAction<ErrorDialogState>) => {
            state.visibility = action.payload.visibility;
            state.title = action.payload.title;
            state.description = action.payload.description;
        },
    },
});

export const {toggleErrorDialog} = errorDialogSlice.actions;

export default errorDialogSlice.reducer;
