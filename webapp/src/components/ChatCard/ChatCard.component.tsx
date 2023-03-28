import React from 'react';
import {useSelector} from 'react-redux';

// Mattermost
import {getCurrentUser} from 'mattermost-redux/selectors/entities/users';
import {GlobalState} from 'mattermost-redux/types/store';

// Utils
import {getProfileImgUrl} from 'utils';

// Styles
import {PostCard} from 'components/PostCard';

// Constants
import {openAiBotName, openAISvgUri} from 'constants/common';

export const ChatCard = ({isUser, chat}: {isUser: boolean; chat: string}) => {
    const {Avatar} = window.Components;
    const PostUtils = window.PostUtils;

    const currentUser = useSelector((reduxState: GlobalState) => getCurrentUser(reduxState));
    const userAvatarUrl = isUser ? getProfileImgUrl({userId: currentUser.id}) : openAISvgUri;

    const formattedText = PostUtils.formatText(chat);

    return (
        <PostCard
            avatarComponent={<Avatar url={userAvatarUrl} />}
            authorName={isUser ? currentUser.username : openAiBotName}
            postMessage={PostUtils.messageHtmlToComponent(formattedText)}
        />
    );
};
