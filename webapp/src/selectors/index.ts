export const getApiRequestCompletionState = (state: ReduxState): ApiRequestCompletionState => {
    return state['plugins-mattermost-plugin-open-ai'].apiRequestCompletionSlice;
};
