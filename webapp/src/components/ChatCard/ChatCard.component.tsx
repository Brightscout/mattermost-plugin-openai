import React from 'react';
import {useSelector} from 'react-redux';

// Mattermost
import {getCurrentUser} from 'mattermost-redux/selectors/entities/users';
import {GlobalState} from 'mattermost-redux/types/store';

// Components
import {Image} from 'components/Image';
import {PostCard} from 'components/PostCard';

// Utils
import {getProfileImgUrl} from 'utils';

// Constants
import {IMAGE_GENERATIONS, openAiBotName, openAISvgUri} from 'constants/common';

// Styles
import {StyledGroupImageContainer} from './ChatCard.styles';

/**
 * ChatCard Component
 *
 * @example Correct usage
 * ```tsx
 * <ChatCard
 *  isUser={isUser}
 *  chat={chat}
 *  isImage={isImage}
 * />
 * ```
 */
export const ChatCard = ({
    isUser,
    chat,
    isImage = false,
}: {
    isUser: boolean;
    chat: string;
    isImage?: boolean;
}) => {
    const {Avatar} = window.Components;
    const PostUtils = window.PostUtils;

    const currentUser = useSelector((reduxState: GlobalState) => getCurrentUser(reduxState));
    const userAvatarUrl = isUser ? getProfileImgUrl({userId: currentUser.id}) : openAISvgUri;

    const formattedText = PostUtils.formatText(chat);

    return (
        <PostCard
            avatarComponent={<Avatar url={userAvatarUrl} />}
            authorName={isUser ? currentUser.username : openAiBotName}
            postMessage={
                isImage ? (
                    <>
                        {PostUtils.messageHtmlToComponent(
                            PostUtils.formatText(IMAGE_GENERATIONS.expiryInfo({plural: true})),
                        )}
                        <StyledGroupImageContainer>
                            {chat.split(' ').map((url) => (
                                <Image
                                    key={url}
                                    size='100%'
                                    src={url}
                                    alt={IMAGE_GENERATIONS.altTextForGeneratedImages}
                                />
                            ))}
                        </StyledGroupImageContainer>
                    </>
                ) : (
                    PostUtils.messageHtmlToComponent(formattedText)
                )
            }
        />
    );
};
