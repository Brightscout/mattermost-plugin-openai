// Constants
import {API_SERVICE} from 'constants/apiServiceConfig';

import useMattermostApi from './useMattermostApi';
import useOpenAIApi from './useOpenAIApi';
import usePluginApi from './usePluginApi';

const useHooksBasedOnService = ({service}: {service: API_SERVICE}) => {
    switch (service) {
        case API_SERVICE.pluginApiService:
            return usePluginApi;
        case API_SERVICE.mattermostApiService:
            return useMattermostApi;
        default:
            return useOpenAIApi;
    }
};

export default useHooksBasedOnService;
