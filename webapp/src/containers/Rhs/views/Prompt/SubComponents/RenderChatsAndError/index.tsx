import React from 'react';

// Components
import {DisplayMessage} from 'components/DisplayMessage';
import {ChatCard} from 'components/ChatCard/ChatCard.component';

// Utils
import {parseChatWithTemplateIfSummary} from 'utils';

// Constants
import {CHAT_API_ROLES} from 'constants/common';

export const RenderChatsAndError = ({errorMessage, chats}:{errorMessage: string, chats: ChatsType}) => {
    if (errorMessage) {
        return <DisplayMessage message={errorMessage} isError />;
    }

    return (
        <>
            {chats.
                map(({id, content, role, isSummary, isImage}) => (
                        <React.Fragment key={id}>
                                <ChatCard createdAt={id} chat={parseChatWithTemplateIfSummary({isSummary, content})} isUser={role === CHAT_API_ROLES.user} isImage={isImage} />
                        </React.Fragment>
                    )).
                reverse()}
        </>
    );
};
