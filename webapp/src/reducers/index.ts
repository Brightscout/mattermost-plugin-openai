import {combineReducers} from '@reduxjs/toolkit';

import services from 'services';

import apiRequestCompletionSlice from './apiRequest';

import promptChatSlice from './PromptChat.reducer';

const reducers = combineReducers({
    apiRequestCompletionSlice,
    promptChatSlice,
    [services.reducerPath]: services.reducer,
});

export type RootPluginState = ReturnType<typeof reducers>;

export default reducers;
