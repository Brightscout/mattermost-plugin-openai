import useMattermostApi from './useMattermostApi';
import useOpenAiApi from './useOpenAiApi';
import usePluginApi from './usePluginApi';

const useHooksBasedOnService = ({
    service,
}: {
    service: 'useOpenAiApi' | 'useMattermostApi' | 'usePluginApi';
}) => {
    switch (service) {
        case 'usePluginApi': return usePluginApi;
        case 'useMattermostApi': return useMattermostApi;
        default: return useOpenAiApi;
    }
};

export default useHooksBasedOnService;
