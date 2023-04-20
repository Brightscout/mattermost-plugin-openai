import {pluginReduxStateId} from 'constants/common';

const getPluginState = (state: ReduxState) => state[pluginReduxStateId];

export const getPostSummarizationState = (state: ReduxState): ThreadSummarizationState => getPluginState(state).threadSummarizationSlice;

export const getPromptChatSlice = (state: ReduxState): PromptChatState => getPluginState(state).promptChatSlice;

export const getApiRequestCompletionState = (state: ReduxState): ApiRequestCompletionState => getPluginState(state).apiRequestCompletionSlice;

export const getIsSidebarOpen = (state: ReduxState) => state.views.rhs.isSidebarOpen;

export const getErrorDialogState = (state: ReduxState): ErrorDialogState => getPluginState(state).errorDialogSlice;
