type Chat = {
    role: 'user' | 'system' | 'assistant';
    content: string;
    id: string;
    isSummary?: boolean;
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
