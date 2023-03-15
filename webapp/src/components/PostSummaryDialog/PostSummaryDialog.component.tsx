import React, {useState, useRef, useEffect, useMemo} from 'react';
import {useDispatch} from 'react-redux';

// Hooks
import usePluginApi from 'hooks/usePluginApi';
import useApiRequestCompletionState from 'hooks/useApiRequestCompletionState';

// Actions
import {closeAndResetState} from 'reducers/PostSummarization.reducer';

// Selectors
import {getPostSummarizationState} from 'selectors';

// Constants
import {PostSummaryModal} from 'constants/common';

// Styled Components
import {API_SERVICE_CONFIG} from 'constants/apiServiceConfig';

// Utils
import {parsePostSummaryPayload} from 'utils';

import {
    StyledNativeTextArea,
    StyledSummarizationDialog,
    StyledSummarizedText,
    StyledLinearProgress,
} from './PostSummaryDialog.styles';

export const PostSummaryDialog = () => {
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    // Initializing hooks
    const {state, makeApiRequestWithCompletionStatus, getApiState} = usePluginApi();
    const dispatch = useDispatch();

    // Selectors
    const {post, isDialogOpen} = getPostSummarizationState(state);
    const [postContent, setPostContent] = useState(post);
    const [isSummarized, setIsSummarized] = useState(false);

    /**
     * We want the payload to change only when the post content changes.
     */
    const payload = useMemo(() => parsePostSummaryPayload({post: postContent}), [postContent]);

    const {data, isLoading} = getApiState(
        API_SERVICE_CONFIG.getCompletion.serviceName,
        payload,
    ) as {data: CompletionResponseShape; isLoading: boolean};

    /**
     * On Clicking the summarize button the post is summarized,
     */
    const handleSummarize = async () => {
        makeApiRequestWithCompletionStatus(API_SERVICE_CONFIG.getCompletion.serviceName, payload);
    };

    useApiRequestCompletionState({
        serviceName: API_SERVICE_CONFIG.getCompletion.serviceName,
        payload,
        handleSuccess: () => {
            setIsSummarized((prevState) => !prevState);
        },
    });

    /**
     * To make the height of the text area to grow with content.
     */
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = '80px';
            const scrollHeight = textareaRef.current.scrollHeight;
            textareaRef.current.style.height = scrollHeight + 10 + 'px';
        }
    }, [postContent, isSummarized]);

    /**
     * To change the initial value for the state.
     */
    useEffect(() => {
        if (post !== postContent) {
            setIsSummarized(false);
            setPostContent(post);
        }
    }, [post]);

    return (
            <StyledSummarizationDialog
                show={isDialogOpen}
                title={PostSummaryModal.title}
                subtitle={PostSummaryModal.subtitle}
                primaryActionText={PostSummaryModal.primaryActionText({isSummarized})}
                secondaryActionText={PostSummaryModal.secondaryActionText({isSummarized})}
                onSubmitHandler={() =>
                    (isSummarized ? dispatch(closeAndResetState()) : handleSummarize())
                }
                onCloseHandler={() =>
                    (isSummarized ? setIsSummarized((prevState) => !prevState) : dispatch(closeAndResetState()))
                }
                className={`${isLoading ? 'isLoading' : ''}`}
            >
                {isLoading && <StyledLinearProgress />}
                    {isSummarized ? (
                        <StyledSummarizedText>
                            {data.choices[0].text.trim()}
                        </StyledSummarizedText>
                    ) : (
                        <StyledNativeTextArea
                            disabled={isLoading}
                            placeholder={PostSummaryModal.textAreaPlaceHolder}
                            value={postContent}
                            onChange={({target: {value}}) => setPostContent(value)}
                            ref={textareaRef}
                        />
                    )}
            </StyledSummarizationDialog>
    );
};
