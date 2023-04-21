import {combineReducers} from '@reduxjs/toolkit';

import mattermostApiService from 'services/mattermostApiService';
import pluginApiService from 'services/pluginApiService';

import apiRequestCompletionSlice from './apiRequest';
import promptChatSlice from './PromptChat.reducer';
import threadSummarizationSlice from './ThreadSummarization.reducer';
import errorDialogSlice from './errorDialog';

const reducers = combineReducers({
    apiRequestCompletionSlice,
    promptChatSlice,
    threadSummarizationSlice,
    errorDialogSlice,
    [pluginApiService.reducerPath]: pluginApiService.reducer,
    [mattermostApiService.reducerPath]: mattermostApiService.reducer,
});

export type RootPluginState = ReturnType<typeof reducers>;

export default reducers;
