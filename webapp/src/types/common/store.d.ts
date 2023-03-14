interface ReduxState extends GlobalState {
    views: {
        rhs: {
            isSidebarOpen: boolean;
        };
    };
    'plugins-mattermost-plugin-open-ai': RootState<
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
        'openAiPluginApi'
        >;
    },
    never,
    'openAiPluginApi'
    >;
}

type ApiRequestCompletionState = {
    requests: ApiServiceName[];
};

type PromptChatState = {
    chats: {
        role: 'user' | 'system' | 'assistant';
        content: string;
        id: string;
        isSummary?: boolean;
    }[];
};

type ConfigCredentialState = {
    openAIApiKey: string;
    openAIOrganizationId: string;
};

type PostSummarizationState = {
    post: string;
    isDialogOpen: boolean;
};
