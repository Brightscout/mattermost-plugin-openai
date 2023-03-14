import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {MenuItem} from '@brightscout/mattermost-ui-library';

// Mattermost
import {getPost} from 'mattermost-redux/selectors/entities/posts';
import {GlobalState} from 'mattermost-redux/types/store';

// Actions
import {addPostAndOpenModal} from 'reducers/PostSummarization.reducer';

// Types
import {PostMenuItemProps} from './PostMenuItem.d';

export const PostMenuItem = ({postId}: PostMenuItemProps) => {
    // Initializing Hooks
    const dispatch = useDispatch();

    // Selectors
    const Post = useSelector((reduxState: GlobalState) => getPost(reduxState, postId));

    /**
     * Opens the summarization modal.
     */
    const handleClick = () => {
        dispatch(
            addPostAndOpenModal({
                post: Post.message,
                isDialogOpen: true,
            }),
        );
    };

    return (
        <MenuItem
            label='Summarize this post'
            leadingIcon='Globe'
            onClick={handleClick}
            secondaryLabel=''
            secondaryLabelPosition='inline'
        />
    );
};
