import {combineReducers} from '@reduxjs/toolkit';

import services from 'services';

import apiRequestCompletionSlice from './apiRequest';
import promptChatSlice from './PromptChat.reducer';
import credentialSlice from './Credentials.reducer';
import postSummarizationSlice from './PostSummarization.reducer';

const reducers = combineReducers({
    apiRequestCompletionSlice,
    promptChatSlice,
    credentialSlice,
    postSummarizationSlice,
    [services.reducerPath]: services.reducer,
});

export type RootPluginState = ReturnType<typeof reducers>;

export default reducers;
