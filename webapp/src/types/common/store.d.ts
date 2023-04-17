interface ReduxState extends GlobalState {
    views: {
        rhs: {
            isSidebarOpen: boolean;
        };
    };
    'plugins-open-ai': RootState<
        {
            [x: string]: QueryDefinition<
                void,
                BaseQueryFn<
                    string | FetchArgs,
                    unknown,
                    FetchBaseQueryError,
                    Record<string, never>,
                    FetchBaseQueryMeta
                >,
                never,
                void,
                'openAiPluginApi',
                'mattermostApi',
            >;
        },
        never,
        'mattermostApi',
        'openAiPluginApi'
    >;
}

type ApiRequestCompletionState = {
    requests: ApiServiceName[];
};

type PromptChatState = {
    chats: ChatsType;
    payload?: GetChatCompletionPayload | GetImageFromTextPayload;
    isRequestOnProcess?: boolean;
    isChatSummarized: boolean;
};

type ConfigCredentialState = {
    openAIApiKey: string;
    openAiOrganizationId: string;
};

type ThreadSummarizationState = {
    postId: string;
    isDialogOpen: boolean;
};
