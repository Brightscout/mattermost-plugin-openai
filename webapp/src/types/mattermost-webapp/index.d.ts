export interface PluginRegistry {
    registerRootComponent(component: ReactDOM);
    registerReducer(reducer);
    registerPostTypeComponent(typeName: string, component: React.ElementType);
    registerRightHandSidebarComponent(component: () => JSX.Element, title: string | JSX.Element);
    registerChannelHeaderButtonAction(
        icon: JSX.Element,
        action: () => void,
        dropdownText: string | null,
        tooltipText: string | null,
    );
    registerPostDropdownMenuComponent(component: ({postId}: {postId: string}) => JSX.Element);

    // Add more if needed from https://developers.mattermost.com/extend/plugins/webapp/reference
}
