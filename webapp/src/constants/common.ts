export const MMCSRF = 'MMCSRF';
export const MMAUTHTOKEN = 'MMAUTHTOKEN';
export const MMUSERID = 'MMUSERID';
export const HEADER_CSRF_TOKEN = 'X-CSRF-Token';
export const HEADER_AUTHORIZATION = 'authorization';

export const BaseUrlOpenAi = 'https://api.openai.com/v1';

export const pluginId = 'open-ai';

export const openAiSvgUri =
    "data:image/svg+xml,%3Csvg width='34' height='34' viewBox='0 0 34 34' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='34' height='34' fill='%230DA380'/%3E%3Cpath d='M25.6863 15.1842C25.913 14.5108 25.9914 13.7974 25.9163 13.0917C25.8411 12.3859 25.6142 11.7042 25.2506 11.0919C24.7116 10.1664 23.8886 9.43369 22.9002 8.99936C21.9118 8.56502 20.8091 8.45153 19.7511 8.67522C19.15 8.0157 18.3835 7.52379 17.5287 7.24891C16.6739 6.97402 15.7609 6.92585 14.8812 7.10921C14.0015 7.29258 13.1863 7.70103 12.5173 8.29355C11.8483 8.88606 11.3492 9.64178 11.07 10.4848C10.3652 10.6274 9.69927 10.9167 9.11686 11.3335C8.53444 11.7502 8.04891 12.2848 7.69271 12.9015C7.14784 13.8254 6.91496 14.8963 7.02775 15.9594C7.14054 17.0225 7.59315 18.0226 8.32015 18.8153C8.09261 19.4884 8.01342 20.2017 8.08787 20.9074C8.16232 21.6131 8.38869 22.295 8.75185 22.9075C9.29155 23.8333 10.1153 24.5662 11.1044 25.0005C12.0935 25.4349 13.1969 25.5482 14.2555 25.3243C14.733 25.8547 15.3198 26.2786 15.9766 26.5675C16.6334 26.8565 17.3452 27.0039 18.0644 26.9999C19.1488 27.0009 20.2055 26.662 21.0819 26.032C21.9584 25.402 22.6092 24.5137 22.9405 23.4951C23.6452 23.3523 24.311 23.0628 24.8934 22.6461C25.4758 22.2293 25.9614 21.6949 26.3178 21.0784C26.8562 20.1558 27.0851 19.0889 26.9717 18.0302C26.8582 16.9716 26.4083 15.9754 25.6863 15.1842ZM18.0644 25.6909C17.1763 25.6923 16.316 25.3853 15.6344 24.8236L15.7542 24.7566L19.791 22.4581C19.8915 22.4 19.9749 22.3171 20.0331 22.2175C20.0912 22.118 20.1221 22.0052 20.1228 21.8904V16.2763L21.8293 17.2501C21.8377 17.2543 21.845 17.2605 21.8506 17.268C21.8562 17.2755 21.8599 17.2842 21.8614 17.2934V21.9456C21.8593 22.9383 21.4585 23.8897 20.7469 24.5916C20.0353 25.2936 19.0708 25.6888 18.0644 25.6909ZM9.90291 22.2531C9.4575 21.4945 9.29758 20.6052 9.45127 19.7417L9.57123 19.8127L13.612 22.1112C13.712 22.1691 13.8258 22.1996 13.9417 22.1996C14.0576 22.1996 14.1715 22.1691 14.2714 22.1112L19.2075 19.3041V21.2478C19.207 21.2578 19.2043 21.2677 19.1994 21.2766C19.1946 21.2854 19.1877 21.2931 19.1795 21.299L15.0907 23.6251C14.2181 24.1209 13.1817 24.255 12.2091 23.9977C11.2364 23.7405 10.407 23.113 9.90291 22.2531ZM8.8398 13.5796C9.28829 12.8161 9.9962 12.2337 10.8382 11.9356V16.6666C10.8367 16.7809 10.8663 16.8935 10.9239 16.9927C10.9816 17.0918 11.0651 17.1739 11.1659 17.2304L16.078 20.0256L14.3714 20.9994C14.3621 21.0042 14.3518 21.0067 14.3414 21.0067C14.3309 21.0067 14.3206 21.0042 14.3114 20.9994L10.2307 18.6773C9.35975 18.1793 8.72435 17.3611 8.46366 16.402C8.20296 15.4429 8.33822 14.4209 8.8398 13.56V13.5796ZM22.8606 16.7928L17.9325 13.97L19.6351 13C19.6444 12.9951 19.6547 12.9926 19.6651 12.9926C19.6756 12.9926 19.6859 12.9951 19.6951 13L23.7758 15.326C24.3998 15.6812 24.9084 16.204 25.2424 16.8336C25.5764 17.4632 25.7219 18.1735 25.662 18.8816C25.602 19.5897 25.3391 20.2664 24.904 20.8326C24.4688 21.3989 23.8793 21.8313 23.2043 22.0795V17.3485C23.2008 17.2344 23.1672 17.1232 23.1069 17.0257C23.0467 16.9283 22.9618 16.8481 22.8606 16.7928ZM24.5592 14.2735L24.4393 14.2025L20.4065 11.8844C20.306 11.8262 20.1914 11.7955 20.0748 11.7955C19.9581 11.7955 19.8436 11.8262 19.743 11.8844L14.8111 14.6914V12.7478C14.81 12.7379 14.8117 12.7279 14.8159 12.7189C14.8202 12.7099 14.8268 12.7022 14.8351 12.6965L18.9158 10.3744C19.5412 10.019 20.2563 9.84659 20.9774 9.87735C21.6985 9.90812 22.3958 10.1408 22.9878 10.5481C23.5798 10.9555 24.042 11.5206 24.3202 12.1776C24.5985 12.8345 24.6815 13.556 24.5593 14.2577L24.5592 14.2735ZM13.8797 17.7191L12.1732 16.7493C12.1646 16.7442 12.1573 16.7374 12.1518 16.7292C12.1462 16.721 12.1426 16.7118 12.1411 16.702V12.0618C12.142 11.3499 12.3484 10.6531 12.736 10.0526C13.1237 9.45221 13.6766 8.97305 14.3302 8.67117C14.9837 8.3693 15.7109 8.25719 16.4267 8.34796C17.1425 8.43872 17.8172 8.72861 18.3722 9.18372L18.2522 9.25081L14.2155 11.5491C14.115 11.6073 14.0316 11.6902 13.9735 11.7897C13.9153 11.8892 13.8844 12.002 13.8837 12.1169L13.8797 17.7191ZM14.807 15.748L17.0052 14.4981L19.2075 15.748V18.2474L17.0132 19.4972L14.811 18.2474L14.807 15.748Z' fill='white'/%3E%3C/svg%3E%0A";

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
 * Constants used with chat completion api
 */
export const ChatCompletionApi = {
    responseObject: 'chat.completion',
    summarizationPrompt: 'Summarizing...',
    summarizationContent: 'Summarize the chat precisely',
    invalidApiCode: 'invalid_api_key',
    invalidOrganizationCode: 'invalid_organization',
} as const;

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
