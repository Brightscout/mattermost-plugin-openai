// Export Utils functions here

/**
 * Parses the chat by removing the colon and the chat sender ( eg: AI: Hi let me help you -> Hi let me help you)
 * @param chat - chat either made by the user or ai.
 */
export const parseConversationalChat = ({chat}: {chat: string}): string => chat.split(':').pop()?.trim() ?? chat;

/**
 * Parses the payload required for the completion API to give response.
 * All the previous chat's if any are appended with the prompt to persist the context.
 * @param prompt - The prompt to generate completions for.
 * @param temperature - Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic.
 * @param max_tokens - The maximum number of tokens to generate in the completion. ( 1 token = 4 characters )
 * @param model -ID of the model to use.
 * @param chatHistory - array of previous chats to append to the prompt to get the context.
 */
export const parseCompletionPayload = ({
    temperature = 0,
    max_tokens = 200,
    model = 'text-davinci-003',
    prompt,
    chatHistory,
}: GetCompletionPayload & {chatHistory: string[]}): GetCompletionPayload => {
    const historyAppended = chatHistory.join('\n');
    const chatMode = 'The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly.\n';
    return {
        temperature,
        max_tokens,
        model,
        prompt: chatMode + historyAppended + `Human: ${prompt}.`,
    };
};
