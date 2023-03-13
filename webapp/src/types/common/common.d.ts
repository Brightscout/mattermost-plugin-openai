// Type of chat stored inside the chats state in promptChat slice
type ChatsType = {
    role: 'user' | 'system' | 'assistant';
    content: string;
    id: string;
    isSummary?: boolean;
}[];
