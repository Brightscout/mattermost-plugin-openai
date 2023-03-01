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
        {},
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
