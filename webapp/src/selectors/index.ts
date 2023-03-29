const getPluginState = (state: ReduxState) => state['plugins-open-ai'];

export const getConfigCredentials = (state:ReduxState): ConfigCredentialState => getPluginState(state).credentialSlice;

export const getPostSummarizationState = (state: ReduxState): ThreadSummarizationState => getPluginState(state).threadSummarizationSlice;

export const getPromptChatSlice = (state: ReduxState): PromptChatState => getPluginState(state).promptChatSlice;

export const getApiRequestCompletionState = (state: ReduxState): ApiRequestCompletionState => getPluginState(state).apiRequestCompletionSlice;

export const getIsSidebarOpen = (state: ReduxState) => state.views.rhs.isSidebarOpen;
