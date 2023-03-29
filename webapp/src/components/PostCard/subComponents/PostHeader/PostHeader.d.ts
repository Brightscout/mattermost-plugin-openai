import {ReactNode} from 'react';

export type PostHeaderProps = {

    /**
     * Name of the post author.
     */
    authorName: string;

    /**
     * Mattermost bot badge component.
     */
    botBadgeComponent?: ReactNode;

    /**
     * Mattermost time stamp component.
     */
    timeStampComponent?: ReactNode;

    /**
     * Components to be rendered in the floating menu component.
     */
    floatingMenuComponents?: ReactNode[];
};
