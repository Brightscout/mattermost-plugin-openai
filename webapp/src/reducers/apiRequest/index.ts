import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState: ApiRequestCompletionState = {
    requests: [],
};

export const apiRequestCompletionSlice = createSlice({
    name: 'globalApiRequestSlice',
    initialState,
    reducers: {

        /**
         * Holds the state of all the completed api calls
         */
        setApiRequestCompletionState: (state: ApiRequestCompletionState, action: PayloadAction<ApiServiceName>) => {
            state.requests = [...state.requests, action.payload];
        },
        resetApiRequestCompletionState: (state: ApiRequestCompletionState, action: PayloadAction<ApiServiceName>) => {
            state.requests = state.requests.filter((request) => request !== action.payload);
        },
    },
});

export const {setApiRequestCompletionState, resetApiRequestCompletionState} = apiRequestCompletionSlice.actions;

export default apiRequestCompletionSlice.reducer;
