import {ReactNode} from 'react';

import {PostHeaderProps} from './subComponents/PostHeader/PostHeader.d';

export type PostCardProps = {

    /**
     * Avatar component from mattermost.
     */
    avatarComponent: ReactNode;

    /**
     * Message to be rendered in the post card.
     */
    postMessage: string | ReactNode;
} & Pick<
PostHeaderProps,
| 'floatingMenuComponents'
| 'authorName'
| 'botBadgeComponent'
| 'timeStampComponent'
>;
