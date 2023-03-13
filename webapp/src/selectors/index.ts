const getPluginState = (state: ReduxState) => state['plugins-mattermost-plugin-open-ai'];

export const getAllChats = (state: ReduxState): PromptChatState => state['plugins-mattermost-plugin-open-ai'].promptChatSlice;

export const getApiRequestCompletionState = (state: ReduxState): ApiRequestCompletionState => getPluginState(state).apiRequestCompletionSlice;
