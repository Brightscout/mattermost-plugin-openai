export const MMCSRF = 'MMCSRF';
export const MMAUTHTOKEN = 'MMAUTHTOKEN';
export const MMUSERID = 'MMUSERID';
export const HEADER_CSRF_TOKEN = 'X-CSRF-Token';
export const HEADER_AUTHORIZATION = 'authorization';

export const BaseUrlOpenAi = 'https://api.openai.com/v1';

export const pluginId = 'open-ai';

export const openAISvgUri =
    "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg viewBox='0 0 34 34' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='34' height='34' fill='%230DA380'/%3E%3Cpath d='m25.686 15.184c0.2267-0.6734 0.3051-1.3868 0.23-2.0925-0.0752-0.7058-0.3021-1.3875-0.6657-1.9998-0.539-0.9255-1.362-1.6582-2.3504-2.0925-0.9884-0.43434-2.0911-0.54783-3.1491-0.32414-0.6011-0.65952-1.3676-1.1514-2.2224-1.4263-0.8548-0.27489-1.7678-0.32306-2.6475-0.1397-0.8797 0.18337-1.6949 0.59182-2.3639 1.1843-0.669 0.59251-1.1681 1.3482-1.4473 2.1912-0.7048 0.1426-1.3707 0.4319-1.9531 0.8487-0.58242 0.4167-1.068 0.9513-1.4242 1.568-0.54487 0.9239-0.77775 1.9948-0.66496 3.0579s0.5654 2.0632 1.2924 2.8559c-0.22754 0.6731-0.30673 1.3864-0.23228 2.0921s0.30082 1.3876 0.66398 2.0001c0.5397 0.9258 1.3634 1.6587 2.3526 2.093 0.9891 0.4344 2.0925 0.5477 3.1511 0.3238 0.4775 0.5304 1.0643 0.9543 1.7211 1.2432 0.6568 0.289 1.3686 0.4364 2.0878 0.4324 1.0844 1e-3 2.1411-0.3379 3.0175-0.9679 0.8765-0.63 1.5273-1.5183 1.8586-2.5369 0.7047-0.1428 1.3705-0.4323 1.9529-0.849 0.5824-0.4168 1.068-0.9512 1.4244-1.5677 0.5384-0.9226 0.7673-1.9895 0.6539-3.0482-0.1135-1.0586-0.5634-2.0548-1.2854-2.846zm-7.6219 10.507c-0.8881 0.0014-1.7484-0.3056-2.43-0.8673l0.1198-0.067 4.0368-2.2985c0.1005-0.0581 0.1839-0.141 0.2421-0.2406 0.0581-0.0995 0.089-0.2123 0.0897-0.3271v-5.6141l1.7065 0.9738c0.0084 0.0042 0.0157 0.0104 0.0213 0.0179s0.0093 0.0162 0.0108 0.0254v4.6522c-0.0021 0.9927-0.4029 1.9441-1.1145 2.646-0.7116 0.702-1.6761 1.0972-2.6825 1.0993zm-8.1615-3.4378c-0.44541-0.7586-0.60533-1.6479-0.45164-2.5114l0.11996 0.071 4.0408 2.2985c0.1 0.0579 0.2138 0.0884 0.3297 0.0884s0.2298-0.0305 0.3297-0.0884l4.9361-2.8071v1.9437c-5e-4 0.01-0.0032 0.0199-0.0081 0.0288-0.0048 0.0088-0.0117 0.0165-0.0199 0.0224l-4.0888 2.3261c-0.8726 0.4958-1.909 0.6299-2.8816 0.3726-0.9727-0.2572-1.8021-0.8847-2.3062-1.7446zm-1.0631-8.6735c0.44849-0.7635 1.1564-1.3459 1.9984-1.644v4.731c-0.0015 0.1143 0.0281 0.2269 0.0857 0.3261 0.0577 0.0991 0.1412 0.1812 0.242 0.2377l4.9121 2.7952-1.7066 0.9738c-0.0093 0.0048-0.0196 0.0073-0.03 0.0073-0.0105 0-0.0208-0.0025-0.03-0.0073l-4.0807-2.3221c-0.87095-0.498-1.5064-1.3162-1.767-2.2753-0.2607-0.9591-0.12544-1.9811 0.37614-2.842v0.0196zm14.021 3.2132-4.9281-2.8228 1.7026-0.97c0.0093-0.0049 0.0196-0.0074 0.03-0.0074 0.0105 0 0.0208 0.0025 0.03 0.0074l4.0807 2.326c0.624 0.3552 1.1326 0.878 1.4666 1.5076s0.4795 1.3399 0.4196 2.048c-0.06 0.7081-0.3229 1.3848-0.758 1.951-0.4352 0.5663-1.0247 0.9987-1.6997 1.2469v-4.731c-0.0035-0.1141-0.0371-0.2253-0.0974-0.3228-0.0602-0.0974-0.1451-0.1776-0.2463-0.2329zm1.6986-2.5193-0.1199-0.071-4.0328-2.3181c-0.1005-0.0582-0.2151-0.0889-0.3317-0.0889-0.1167 0-0.2312 0.0307-0.3318 0.0889l-4.9319 2.807v-1.9436c-0.0011-0.0099 6e-4 -0.0199 0.0048-0.0289 0.0043-9e-3 0.0109-0.0167 0.0192-0.0224l4.0807-2.3221c0.6254-0.3554 1.3405-0.52781 2.0616-0.49705 0.7211 0.03077 1.4184 0.26345 2.0104 0.67075 0.592 0.4074 1.0542 0.9725 1.3324 1.6295 0.2783 0.6569 0.3613 1.3784 0.2391 2.0801l-1e-4 0.0158zm-10.68 3.4456-1.7065-0.9698c-0.0086-0.0051-0.0159-0.0119-0.0214-0.0201-0.0056-0.0082-0.0092-0.0174-0.0107-0.0272v-4.6402c9e-4 -0.7119 0.2073-1.4087 0.5949-2.0092 0.3877-0.60039 0.9406-1.0796 1.5942-1.3814 0.6535-0.30187 1.3807-0.41398 2.0965-0.32321 0.7158 0.09076 1.3905 0.38065 1.9455 0.83576l-0.12 0.06709-4.0367 2.2983c-0.1005 0.0582-0.1839 0.1411-0.242 0.2406-0.0582 0.0995-0.0891 0.2123-0.0898 0.3272l-4e-3 5.6022zm0.9273-1.9711 2.1982-1.2499 2.2023 1.2499v2.4994l-2.1943 1.2498-2.2022-1.2498-4e-3 -2.4994z' fill='%23fff'/%3E%3C/svg%3E%0A";

export const openAiBotName = 'Open ai';
export const PLUGIN_ID = 'plugins-open-ai';

/** channel button tooltip text */
export const channelButtonTooltip = 'Open-ai';

/** plugin header tile */
export const rightSidebarHeaderTitle = 'Open-ai';

export const ErrorMessages = {
    internalServerError: 'Something went wrong, please try again',
    invalidApiKey: 'The API key provided is not valid',
    invalidOrganizationId: 'No organization found with the given ID',
} as const;

/**
 * Constants used in clear context confirmation dialog in ChatSummary component.
 */
export const ClearContextConfirmationDialog = {
    title: 'Do you really want to clear the context?',
    description: 'Clearing the context would create a new chat context',
    primaryActionText: 'Clear',
    secondaryActionText: 'Cancel',
} as const;

/**
 * Constants used in the thread summary modal.
 */
export const THREAD_SUMMARY_MODAL = {
    title: 'Thread Summary',
    subtitle: 'Summarization of the post thread',
    primaryActionText: ({isCopied}: {isCopied: boolean}) => (isCopied ? 'Copied' : 'Copy'),
} as const;

/**
 * Constants used in the post menu item component
 */
export const POST_MENU_ITEM = {
    label: 'Summarize',
    leadingIcon: 'Globe',
} as const;

/**
 * Constants required to create prompt for summarizing the thread.
 */
export const PARSE_THREAD_PROMPT = {
    systemPrompt: 'Summarize the below thread briefly\n',
    recursiveSummarizationPrompt: '\nSummarize the below thread with above context\n',
} as const;

/**
 * Constants used with chat completion API.
 */
export const ChatCompletionApi = {
    responseObject: 'chat.completion',
    summarizationPrompt: 'Summarizing...',
    summarizationContent: 'Summarize the chat precisely',
    invalidApiCode: 'invalid_api_key',
    invalidOrganizationCode: 'invalid_organization',
} as const;

/**
 * Constants used for chat roles in chat completions API.
 */
export const CHAT_API_ROLES = {
    user: 'user',
    system: 'system',
    assistant: 'assistant',
} as const;

export const IMAGE_GENERATIONS = {
    expiryInfo: ({plural = true}: {plural: boolean}) =>
        `*The ${
            plural ? 'Images' : 'Image'
        } will expire after an hour. Please download it for further use.*`,
    fileNameForDownloadedImage: 'image.png',
    altTextForGeneratedImages: 'Prompt response',
    downloadButtonTooltipText: 'Download',
    postToChannelButtonTooltipText: 'Post to channel',
} as const;

export const IMAGE_RESOLUTIONS = {
    x1024: '1024x1024',
    x512: '512x512',
    x256: '256x256',
} as const;

/**
 * Type of encodings used by the gpt3Tokenizer
 */
export const TOKENIZATION_TYPE = {
    gpt3: 'gpt3',

    // Different set of encoding which handles whitespace more efficiently
    codex: 'codex',
} as const;

/**
 * Constants used in the resolution confirmation modal.
 */
export const RESOLUTION_CONFIRMATION_DIALOG = {
    title: 'Choose Resolution',
    description: 'Choose the resolution for the image to be generated',
    primaryActionText: 'Send',
} as const;
