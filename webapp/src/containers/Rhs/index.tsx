import React from 'react';
import {Button, Card} from '@brightscout/mattermost-ui-library';

import usePluginApi from 'hooks/usePluginApi';
import {API_SERVICE_CONFIG} from 'constants/apiServiceConfig';

/**
 * Rhs Component
 * This is Rhs component for plugin.
 *
 * @example Correct usage
 * ```tsx
 * <Rhs />
 * ```
 */
const Rhs = (): JSX.Element => {
    const mockPayload = {
        prompt: 'welcome the user',
        temperature: 0,
        max_tokens: 200,
        model: 'text-davinci-003',
    } as const;

    const {makeApiRequest, getApiState} = usePluginApi();
    const {data, isLoading} = getApiState(API_SERVICE_CONFIG.getCompletion.serviceName, mockPayload);

    return (
        <Card className='welcome-card'>
            {data?.choices && <p>{data.choices[0]?.text}</p>}
            <Button
                disabled={isLoading}
                fullWidth={true}
                onClick={() => makeApiRequest(API_SERVICE_CONFIG.getCompletion.serviceName, mockPayload)}
            >
                {'Say Hi'}
            </Button>
        </Card>
    );
};

export default Rhs;
