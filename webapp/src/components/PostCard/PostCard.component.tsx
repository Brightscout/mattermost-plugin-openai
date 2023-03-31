// TODO: Component to be removed in future PR. Should be imported from MM-UI library.
import React from 'react';

// Components
import {PostHeader} from './subComponents/PostHeader';

// Types
import {PostCardProps} from './PostCard.d';

// Styles
import {PostCardWrapper} from './PostCard.styles';

/**
 * PostCard Component
 *
 * @example Correct usage
 * ```tsx
 * <PostCard
 *  avatarComponent={avatarComponent}
 *  floatingMenuComponents={[<button>Test</button>]}
 *  authorName={authorName}
 *  botBadgeComponent={botBadgeComponent}
 *  timeStampComponent={timeStampComponent}
 *  postMessage={postMessage}
 * ```
 */
export const PostCard = ({
    avatarComponent,
    floatingMenuComponents,
    authorName,
    botBadgeComponent,
    timeStampComponent,
    postMessage,
}: PostCardProps) => (
    <PostCardWrapper>
        {avatarComponent}
        <div>
            <PostHeader
                authorName={authorName}
                floatingMenuComponents={floatingMenuComponents}
                botBadgeComponent={botBadgeComponent}
                timeStampComponent={timeStampComponent}
            />
            <div>{postMessage}</div>
        </div>
    </PostCardWrapper>
);
