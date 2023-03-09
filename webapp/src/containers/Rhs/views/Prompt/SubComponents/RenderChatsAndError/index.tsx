import React from 'react';

import {DisplayMessage} from 'components/DisplayMessage';
import {ChatSummary} from 'components/ChatSummary ';
import {Chat} from 'components/Chat';

export const RenderChatsAndError = ({errorMessage, chats}:{errorMessage: string, chats: ChatsType}) => {
    if (errorMessage) {
        return <DisplayMessage message={errorMessage} isError />;
    }

    return (
        <>
            {chats.
                map(({id, content, isSummary, role}) => (
                    <React.Fragment key={id}>
                        {isSummary ? (
                            <ChatSummary chat={content} />
                        ) : (
                            <Chat chat={content} isUser={role === 'user'} />
                        )}
                    </React.Fragment>
                )).
                reverse()}
        </>
    );
};
