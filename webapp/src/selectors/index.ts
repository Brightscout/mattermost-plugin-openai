export const getConfigCredentials = (state: ReduxState): ConfigCredentialState =>
    state['plugins-mattermost-plugin-open-ai'].credentialSlice;

export const getAllChats = (state: ReduxState): PromptChatState =>
    state['plugins-mattermost-plugin-open-ai'].promptChatSlice;

export const getApiRequestCompletionState = (state: ReduxState): ApiRequestCompletionState =>
    state['plugins-mattermost-plugin-open-ai'].apiRequestCompletionSlice;
