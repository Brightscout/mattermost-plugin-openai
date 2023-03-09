type ChatsType = {
    role: 'user' | 'system' | 'assistant';
    content: string;
    id: string;
    isSummary?: boolean;
}[];
