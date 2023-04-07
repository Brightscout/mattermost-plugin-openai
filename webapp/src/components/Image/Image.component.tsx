import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {Skeleton, Spinner, Tooltip} from '@brightscout/mattermost-ui-library';
import {saveAs} from 'file-saver';

// Mattermost
import {getCurrentChannelId} from 'mattermost-redux/selectors/entities/common';
import {GlobalState} from 'mattermost-redux/types/store';

// Constants
import {DOWNLOAD_ICON, POST_CHANNEL_ICON} from 'constants/icons';
import {API_SERVICE, API_SERVICE_CONFIG} from 'constants/apiServiceConfig';
import {IMAGE_GENERATIONS} from 'constants/common';

// Hooks
import useMattermostApi from 'hooks/useMattermostApi';
import useApiRequestCompletionState from 'hooks/useApiRequestCompletionState';

// Types
import {ImageProps} from './Image.d';

// Styles
import {
    ImageFooter,
    ImageWrapper,
    SkeletonLoaderWrapper,
    SpinnerWrapper,
    StyledImage,
} from './Image.styles';

/**
 * Image Component
 *
 * @example Correct usage
 * ```tsx
 * <Image
 *  src={src}
 *  alt={alt}
 *  size={size}
 * />
 * ```
 */
export const Image = ({src, alt, size = '100%'}: ImageProps) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isDownloadInProgress, setIsDownloadInProgress] = useState(false);
    const {makeApiRequestWithCompletionStatus} = useMattermostApi();

    const currentChannelId = useSelector((state: GlobalState) => getCurrentChannelId(state));

    // Payload
    const payload: PostPostToChannelPayload = {
        channel_id: currentChannelId,
        message: IMAGE_GENERATIONS.expiryInfo({plural: false}) + `\n![](${src})`,
    };

    /**
     * Downloads the image to the local system on clicking the delete button on image footer.
     */
    const handleDownloadImage = async () => {
        setIsDownloadInProgress(true);
        const response = await fetch(src, {mode: 'no-cors'});
        const blob = await response.blob();
        saveAs(blob, IMAGE_GENERATIONS.fileNameForDownloadedImage);
        setIsDownloadInProgress(false);
    };

    /**
     * Sends the image as post to the current channel in mattermost on clicking the send button on image footer.
     */
    const handleCreatingPostInCurrentChannel = () => {
        setIsDownloadInProgress(true);
        makeApiRequestWithCompletionStatus(
            API_SERVICE_CONFIG.postPostToChannel.serviceName,
            payload,
        );
    };

    useApiRequestCompletionState({
        serviceName: API_SERVICE_CONFIG.postPostToChannel.serviceName,
        services: API_SERVICE.mattermostApiService,
        payload,
        handleSuccess: () => setIsDownloadInProgress(false),
    });

    return (
        <ImageWrapper size={size}>
            {isLoading && (
                <SkeletonLoaderWrapper>
                    <Skeleton variant='rectangular' />
                </SkeletonLoaderWrapper>
            )}
            {isDownloadInProgress && (
                <SpinnerWrapper>
                    <Spinner />
                </SpinnerWrapper>
            )}
            <StyledImage
                isLoading={isLoading}
                src={src}
                alt={alt}
                onLoad={() => setIsLoading(false)}
            />
            {!isLoading && (
                <ImageFooter isDownloadInProgress={isDownloadInProgress} className='image-footer'>
                    <Tooltip text={IMAGE_GENERATIONS.downloadButtonTooltipText}>
                        <button type='button' onClick={handleDownloadImage}>
                            {DOWNLOAD_ICON}
                        </button>
                    </Tooltip>

                    <Tooltip text={IMAGE_GENERATIONS.postToChannelButtonTooltipText}>
                        <button type='button' onClick={handleCreatingPostInCurrentChannel}>
                            {POST_CHANNEL_ICON}
                        </button>
                    </Tooltip>
                </ImageFooter>
            )}
        </ImageWrapper>
    );
};
