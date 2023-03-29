import React from 'react';

// Types
import {PostHeaderProps} from './PostHeader.d';

// Styles
import {
    PostFloatingMenu,
    PostHeaderAuthorName,
    PostHeaderWrapper,
} from './PostHeader.styles';

/**
 * PostHeader component.
 *
 * @example Correct usage
 * ```tsx
 * <PostHeader
 *  authorName={authorName}
 *  botBadgeComponent={botBadgeComponent}
 *  floatingMenuComponents={floatingMenuComponents}
 * ```
 */
export const PostHeader = ({
    authorName,
    botBadgeComponent,
    timeStampComponent,
    floatingMenuComponents,
}: PostHeaderProps) => (
    <PostHeaderWrapper>
        <PostHeaderAuthorName>{authorName}</PostHeaderAuthorName>
        {botBadgeComponent}
        {timeStampComponent}
        {floatingMenuComponents && (
            <PostFloatingMenu className='post__floating-menu'>
                {floatingMenuComponents}
            </PostFloatingMenu>
        )}
    </PostHeaderWrapper>
);
