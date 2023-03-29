import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState: ConfigCredentialState = {
    openAIApiKey: '',
    openAIOrganizationId: '',
};

const credentialSlice = createSlice({
    name: 'credentialSlice',
    initialState,
    reducers: {
        addCredentials: (
            state: ConfigCredentialState,
            action: PayloadAction<OpenAIApiKeyFromWebapp>,
        ) => {
            state.openAIApiKey = action.payload.openAIAPIKey;
            state.openAIOrganizationId = action.payload.openAIOrganizationId;
        },
    },
});

export const {addCredentials} = credentialSlice.actions;
export default credentialSlice.reducer;
