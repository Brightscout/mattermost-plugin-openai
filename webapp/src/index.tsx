import React from 'react';
import {Store, Action} from 'redux';
import {GlobalState} from 'mattermost-redux/types/store';

// Components
import {ChannelHeaderButton} from 'components/ChannelHeaderButton';
import {App} from 'App';

// Containers
import Rhs from 'containers/Rhs';

// Constants
import {channelButtonTooltip, rightSidebarHeaderTitle} from 'constants/common';

// Reducers
import reducers from 'reducers';

// eslint-disable-next-line import/no-unresolved
import {PluginRegistry} from './types/mattermost-webapp';
import {id} from './manifest';

export default class Plugin {
    public async initialize(registry: PluginRegistry, store: Store<GlobalState, Action<Record<string, unknown>>>) {
        registry.registerRootComponent(App);
        registry.registerReducer(reducers);
        const {showRHSPlugin} = registry.registerRightHandSidebarComponent(Rhs, rightSidebarHeaderTitle);
        registry.registerChannelHeaderButtonAction(<ChannelHeaderButton />, () => store.dispatch(showRHSPlugin), null, channelButtonTooltip);

        // @see https://developers.mattermost.com/extend/plugins/webapp/reference/
    }
}

declare global {
    interface Window {
        registerPlugin(id: string, plugin: Plugin): void;
    }
}

window.registerPlugin(id, new Plugin());
