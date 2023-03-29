import React from 'react';

// Components
import {DisplayMessage} from 'components/DisplayMessage';
import {ChatCard} from 'components/ChatCard/ChatCard.component';

// Utils
import {parseChatWithTemplateIfSummary} from 'utils';

export const RenderChatsAndError = ({errorMessage, chats}:{errorMessage: string, chats: ChatsType}) => {
    if (errorMessage) {
        return <DisplayMessage message={errorMessage} isError />;
    }

    return (
        <>
            {chats.
                map(({id, content, role, isSummary}) => (
                        <React.Fragment key={id}>
                                <ChatCard chat={parseChatWithTemplateIfSummary({isSummary, content})} isUser={role === 'user'} />
                        </React.Fragment>
                    )).
                reverse()}
        </>
    );
};
