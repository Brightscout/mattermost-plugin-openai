import React, {useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Spinner} from '@brightscout/mattermost-ui-library';

// Mattermost
import {getUsers} from 'mattermost-redux/selectors/entities/common';
import {GlobalState} from 'mattermost-redux/types/store';

// Components
import {DisplayMessage} from 'components/DisplayMessage';

// Selectors
import {getPostSummarizationState} from 'selectors';

// Hooks
import useOpenAIApi from 'hooks/useOpenAIApi';
import useMattermostApi from 'hooks/useMattermostApi';
import useApiRequestCompletionState from 'hooks/useApiRequestCompletionState';

// Constants
import {API_SERVICE, API_SERVICE_CONFIG} from 'constants/apiServiceConfig';
import {THREAD_SUMMARY_MODAL} from 'constants/common';

// Utils
import {mapErrorMessageFromOpenAI, parseThreadPrompt} from 'utils';

// Actions
import {closeAndResetState} from 'reducers/ThreadSummarization.reducer';

// Styles
import {StyledSummarizationDialog} from './ThreadSummaryDialog.styles';

/**
 * ThreadSummaryDialog Component
 *
 * @example Correct usage
 * ```tsx
 * <ThreadSummaryDialog />
 * ```
 */
export const ThreadSummaryDialog = () => {
    const [payload, setPayload] = useState<GetCompletionPayload>();

    // Initializing hooks
    const dispatch = useDispatch();
    const {
        getApiState: getMattermostApiState,
        makeApiRequestWithCompletionStatus: makeMattermostApiRequestWithCompletionStatus,
    } = useMattermostApi();
    const {state, getApiState, makeApiRequestWithCompletionStatus} = useOpenAIApi();
    const [isCopied, setIsCopied] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    // Selectors
    const {postId, isDialogOpen} = getPostSummarizationState(state);
    const Users = useSelector((reduxState: GlobalState) => getUsers(reduxState));

    const getThreadApiPayload = {postId};

    const {isLoading: isThreadLoading, data: threadData} = getMattermostApiState(
        API_SERVICE_CONFIG.getThreadFromPostId.serviceName,
        getThreadApiPayload,
    ) as {isLoading: boolean; data: PostThreadResponseShape};

    const {isLoading, data} = getApiState(
        API_SERVICE_CONFIG.getCompletion.serviceName,
        payload,
    ) as {isLoading: boolean; data: CompletionResponseShape};

    /**
     * After fetching thread for a given post, we then parse the thread to payload and send it to completion api.
     */
    useApiRequestCompletionState({
        serviceName: API_SERVICE_CONFIG.getThreadFromPostId.serviceName,
        payload: getThreadApiPayload,
        services: API_SERVICE.mattermostApiService,
        handleSuccess: () => {
            const threadPayload = parseThreadPrompt(threadData, Users);
            setPayload(threadPayload);
            makeApiRequestWithCompletionStatus(
                API_SERVICE_CONFIG.getCompletion.serviceName,
                threadPayload,
            );
        },
    });

    /**
     * Hook runs after completion api is completed.
     * Here we are using to catch any errors coming from the open ai servers
     */
    useApiRequestCompletionState({
        serviceName: API_SERVICE_CONFIG.getCompletion.serviceName,
        payload,
        handleError: (error) => setErrorMessage(mapErrorMessageFromOpenAI(error)),
    });

    /**
     * Copies the response data to the clipboard
     */
    const handleCopy = () => {
        navigator.clipboard.writeText(data.choices[0].text.trim());
        setIsCopied(true);
    };

    /**
     * Whenever postId changes we fetch the threads present in the post.
     */
    useMemo(() => {
        if (isDialogOpen) {
            setIsCopied(false);
            setErrorMessage('');
            makeMattermostApiRequestWithCompletionStatus(
                API_SERVICE_CONFIG.getThreadFromPostId.serviceName,
                getThreadApiPayload,
            );
        }
    }, [postId]);

    return (
        <StyledSummarizationDialog
            show={isDialogOpen}
            title={THREAD_SUMMARY_MODAL.title}
            subtitle={THREAD_SUMMARY_MODAL.subtitle}
            className={`${isThreadLoading || isLoading ? 'isLoading' : ''} ${
                errorMessage ? 'hasError' : ''
            }`}
            primaryActionText={THREAD_SUMMARY_MODAL.primaryActionText({isCopied})}
            onSubmitHandler={handleCopy}
            onCloseHandler={() => dispatch(closeAndResetState())}
        >
            {errorMessage && <DisplayMessage isError marginBottom={10} message={errorMessage} />}
            {isThreadLoading || isLoading ? (
                <Spinner />
            ) : (
                !errorMessage && <p>{data && data.choices[0].text.trim()}</p>
            )}
        </StyledSummarizationDialog>
    );
};
