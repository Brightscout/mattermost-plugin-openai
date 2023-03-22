import {combineReducers} from '@reduxjs/toolkit';

import openAiApiService from 'services/openAiApiService';
import mattermostApiService from 'services/mattermostApiService';
import pluginApiService from 'services/pluginApiService';

import apiRequestCompletionSlice from './apiRequest';
import promptChatSlice from './PromptChat.reducer';
import credentialSlice from './Credentials.reducer';
import threadSummarizationSlice from './ThreadSummarization.reducer';

const reducers = combineReducers({
    apiRequestCompletionSlice,
    promptChatSlice,
    credentialSlice,
    threadSummarizationSlice,
    [pluginApiService.reducerPath]: pluginApiService.reducer,
    [mattermostApiService.reducerPath]: mattermostApiService.reducer,
    [openAiApiService.reducerPath]: openAiApiService.reducer,
});

export type RootPluginState = ReturnType<typeof reducers>;

export default reducers;
