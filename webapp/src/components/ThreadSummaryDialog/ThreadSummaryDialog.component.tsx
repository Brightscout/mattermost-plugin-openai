import React, {useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import GPT3Tokenizer from 'gpt3-tokenizer';
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
import {PARSE_THREAD_PROMPT, THREAD_SUMMARY_MODAL, TOKENIZATION_TYPE} from 'constants/common';
import {THREAD_SUMMARIZATION_COMPLETION_API_CONFIGS} from 'constants/configs';

// Utils
import {mapErrorMessageFromOpenAI, parseThread, parseThreadPayload} from 'utils';

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
    const tokenizer = new GPT3Tokenizer({type: TOKENIZATION_TYPE.codex});

    // Initializing hooks
    const dispatch = useDispatch();
    const {
        getApiState: getMattermostApiState,
        makeApiRequestWithCompletionStatus: makeMattermostApiRequestWithCompletionStatus,
    } = useMattermostApi();
    const {state, getApiState, makeApiRequestWithCompletionStatus} = useOpenAIApi();
    const [payload, setPayload] = useState<GetCompletionPayload>();
    const [isCopied, setIsCopied] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [startPositionThread, setStartPositionThread] = useState(0);
    const [isWholeThreadSummarized, setIsWholeThreadSummarized] = useState(false);

    // Selectors
    const {postId, isDialogOpen} = getPostSummarizationState(state);
    const Users = useSelector((reduxState: GlobalState) => getUsers(reduxState));

    const getThreadApiPayload = {postId};

    const {isLoading: isThreadLoading, data: threadData} = getMattermostApiState(
        API_SERVICE_CONFIG.getThreadFromPostId.serviceName,
        getThreadApiPayload,
    ) as UseApiResponse<PostThreadResponseShape>;

    const {isLoading, data} = getApiState(
        API_SERVICE_CONFIG.getCompletion.serviceName,
        payload,
    ) as UseApiResponse<CompletionResponseShape>;

    /**
     * This function loops through the threads and creates payload on the go.
     * Whenever payload reaches the `max_token_limit` we save the index of the thread which is last added to the payload and we send this payload to summarize,
     * then we start from the threads which are not summarized using the saved index and creates payload with it,
     * and when the token limit is reached again we append the previous summary to the payload to persist the context and then summarizes it.
     */
    const recursiveSummarizeHandler = () => {
        const threadPayload = parseThread(threadData, Users);
        let payloadPrompt =
        startPositionThread === 0 ? PARSE_THREAD_PROMPT.systemPrompt : data.choices[0].text.trim() + PARSE_THREAD_PROMPT.recursiveSummarizationPrompt;
        let i = startPositionThread;
        if (threadPayload.length === 1) {
             i = threadPayload.length + 1;
             payloadPrompt = PARSE_THREAD_PROMPT.singlePostSystemPrompt + threadPayload[0].message + '\n';
        }
        for (; i < threadPayload.length; i += 1) {
            payloadPrompt += threadPayload[i].message + '\n';
            if (
                tokenizer.encode(payloadPrompt).bpe.length >=
                THREAD_SUMMARIZATION_COMPLETION_API_CONFIGS.threadTokenLimit
            ) {
                setStartPositionThread(i + 1);
                setPayload(parseThreadPayload(payloadPrompt));
                makeApiRequestWithCompletionStatus(
                    API_SERVICE_CONFIG.getCompletion.serviceName,
                    parseThreadPayload(payloadPrompt),
                );
                break;
            }
        }
        if (i >= threadPayload.length) {
            setIsWholeThreadSummarized(true);
            setPayload(parseThreadPayload(payloadPrompt));
            makeApiRequestWithCompletionStatus(
                API_SERVICE_CONFIG.getCompletion.serviceName,
                parseThreadPayload(payloadPrompt),
            );
        }
    };

    /**
     * After fetching thread for a given post, we then parse the thread to payload and send it to completion api.
     */
    useApiRequestCompletionState({
        serviceName: API_SERVICE_CONFIG.getThreadFromPostId.serviceName,
        payload: getThreadApiPayload,
        services: API_SERVICE.mattermostApiService,
        handleSuccess: () => {
            recursiveSummarizeHandler();
        },
    });

    /**
     * Hook runs after completion api is completed.
     * Here we are using to catch any errors coming from the open ai servers
     */
    useApiRequestCompletionState({
        serviceName: API_SERVICE_CONFIG.getCompletion.serviceName,
        payload,
        handleSuccess: () => {
            if (!isWholeThreadSummarized) {
                recursiveSummarizeHandler();
            }
        },
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
