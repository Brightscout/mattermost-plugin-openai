import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

import {API_SERVICE_CONFIG} from 'constants/apiServiceConfig';

import {getPluginApiBaseUrl} from 'utils';

const initialState: ConfigCredentialState = {
    openAIApiKey: '',
    openAIOrganizationId: '',
};

/**
 * Fetches the config settings from the webapp
 */
export const fetchConfigCredentialsFromSettings = createAsyncThunk('credentialSlice/fetchOpenAIApiKey', async () => {
    const rawResponse = await fetch(`${getPluginApiBaseUrl().pluginApiBaseUrl}/${API_SERVICE_CONFIG.getOpenAIApiKeyFromWebapp.path}`);
    const response = await rawResponse.json();
    return response;
});

const credentialSlice = createSlice({
    name: 'credentialSlice',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchConfigCredentialsFromSettings.fulfilled, (state, action) => {
            state.openAIApiKey = action.payload.openAIAPIKey;
            state.openAIOrganizationId = action.payload.openAIOrganizationId;
        });
    },
});

export default credentialSlice.reducer;
