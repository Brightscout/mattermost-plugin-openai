const getPluginState = (state: ReduxState) => state['plugins-mattermost-plugin-open-ai'];

export const getConfigCredentials = (state:ReduxState): ConfigCredentialState => getPluginState(state).credentialSlice;

export const getAllChats = (state: ReduxState): PromptChatState => getPluginState(state).promptChatSlice;

export const getApiRequestCompletionState = (state: ReduxState): ApiRequestCompletionState => getPluginState(state).apiRequestCompletionSlice;
