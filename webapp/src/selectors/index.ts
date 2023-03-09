const getPluginState = (state: ReduxState) => state['plugins-mattermost-plugin-open-ai'];

export const getApiRequestCompletionState = (state: ReduxState): ApiRequestCompletionState => getPluginState(state).apiRequestCompletionSlice;
