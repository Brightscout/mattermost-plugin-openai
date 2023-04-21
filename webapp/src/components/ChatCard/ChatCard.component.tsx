import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {PostCard} from '@brightscout/mattermost-ui-library';

// Mattermost
import {getCurrentUser} from 'mattermost-redux/selectors/entities/users';
import {GlobalState} from 'mattermost-redux/types/store';

// Components
import {Image} from 'components/Image';

// Utils
import {getProfileImgUrl, getImageExpiryTime} from 'utils';

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
    createdAt = '0',
    isUser,
    chat,
    isImage = false,
}: {
    createdAt?: string;
    isUser: boolean;
    chat: string;
    isImage?: boolean;
}) => {
    const {Avatar} = window.Components;
    const PostUtils = window.PostUtils;
    const [isImageLoadingError, setIsImageLoadingError] = useState(false);

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
                        {
                            isImageLoadingError ? PostUtils.messageHtmlToComponent(
                                PostUtils.formatText(IMAGE_GENERATIONS.errorLoadingImages),
                            ) : PostUtils.messageHtmlToComponent(
                                PostUtils.formatText(IMAGE_GENERATIONS.expiryInfo({plural: true, expiryTime: getImageExpiryTime(createdAt)})),
                            )
                        }
                        <StyledGroupImageContainer>
                            {chat.split(' ').map((url) => (
                                <Image
                                    createdAt={createdAt}
                                    key={url}
                                    size='100%'
                                    src={url}
                                    alt={IMAGE_GENERATIONS.altTextForGeneratedImages}
                                    isImageLoadingError={isImageLoadingError}
                                    handleSetIsImageLoadingError={setIsImageLoadingError}
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
