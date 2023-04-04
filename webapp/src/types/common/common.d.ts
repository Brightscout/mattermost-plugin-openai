type Chat = {
    role: 'user' | 'system' | 'assistant';
    content: string;
    id: string;
    isSummary?: boolean;
    isImage?: boolean;
};

type UseApiResponse<T> = {
    data: T;
    isError: boolean;
    isLoading: boolean;
    isSuccess: boolean;
    error: ApiErrorResponse;
    isUninitialized: boolean;
};

// Type of chat stored inside the chats state in promptChat slice
type ChatsType = Chat[];

type ParseThread = {
    totalToken: number;
    bpe: number[];
    text: string[];
    message: string;
}[]

type ImageResolution = '256x256' | '512x512' | '1024x1024'
