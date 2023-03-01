export const getAllChats = (state: ReduxState): PromptChatState => state['plugins-mattermost-plugin-open-ai'].promptChatSlice;

export const getApiRequestCompletionState = (state: ReduxState): ApiRequestCompletionState => {
    return state['plugins-mattermost-plugin-open-ai'].apiRequestCompletionSlice;
};
