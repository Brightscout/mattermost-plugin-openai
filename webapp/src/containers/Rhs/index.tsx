import React from 'react';
import {Button, Card} from '@brightscout/mattermost-ui-library';

import usePluginApi from 'hooks/usePluginApi';
import {API_SERVICE_CONFIG} from 'constants/apiServiceConfig';

/**
 * This is Rhs component for plugin
 * @returns {JSX.Element}
 */
const Rhs = (): JSX.Element => {
    const {makeApiRequest, getApiState} = usePluginApi();
    const {data, isLoading} = getApiState(API_SERVICE_CONFIG.getCompletion.serviceName, {
        prompt: 'welcome the user',
        temperature: 0,
        max_tokens: 200,
        model: 'text-davinci-003',
    });

    return (
        <>
            <Card className='welcome-card'>
                {data?.choices && <p>{data.choices[0]?.text}</p>}
                <Button
                    disabled={isLoading}
                    fullWidth={true}
                    onClick={() =>
                        makeApiRequest(API_SERVICE_CONFIG.getCompletion.serviceName, {
                            prompt: 'welcome the user',
                            temperature: 0,
                            max_tokens: 200,
                            model: 'text-davinci-003',
                        })
                    }
                >
                    {'Say Hi'}
                </Button>
            </Card>
        </>
    );
};

export default Rhs;
