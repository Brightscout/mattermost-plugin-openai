import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {MenuItem} from '@brightscout/mattermost-ui-library';

// Mattermost
import {getPost} from 'mattermost-redux/selectors/entities/posts';
import {GlobalState} from 'mattermost-redux/types/store';

// Actions
import {addPostAndOpenModal} from 'reducers/ThreadSummarization.reducer';

// Constants
import {POST_MENU_ITEM} from 'constants/common';

// Types
import {PostMenuItemProps} from './PostMenuItem.d';

/**
 * PostMenuItem Component
 *
 * @example Correct usage
 * ```tsx
 * <PostMenuItem postId={postId} />
 * ```
 */
export const PostMenuItem = ({postId}: PostMenuItemProps) => {
    // Initializing Hooks
    const dispatch = useDispatch();

    // Selectors
    const Post = useSelector((reduxState: GlobalState) => getPost(reduxState, postId));

    /**
     * Opens the summarization modal and stores the postId in the slice to be used by the dialog component.
     */
    const handleClick = () => {
        dispatch(
            addPostAndOpenModal({
                postId: Post.id,
                isDialogOpen: true,
            }),
        );
    };

    return (
        <MenuItem
            label={POST_MENU_ITEM.label}
            leadingIcon={POST_MENU_ITEM.leadingIcon}
            onClick={handleClick}
            secondaryLabelPosition='inline'
        />
    );
};
