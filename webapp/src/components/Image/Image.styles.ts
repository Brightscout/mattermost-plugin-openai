import styled from 'styled-components';

import Colors from 'styles/colorsForJs.module.scss';

import {ImageProps} from './Image.d';

export const ImageWrapper = styled('div')<Pick<ImageProps, 'size'>>(({size}) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: size,
    height: size,
    position: 'relative',

    '&:hover .image-footer': {
        height: '50px',
    },
}));

export const SkeletonLoaderWrapper = styled('div')({
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    inset: '0 0 0',
});

export const SpinnerWrapper = styled('div')({
    position: 'absolute',
    display: 'grid',
    placeItems: 'center',
    background: Colors.black_80,
    height: '100%',
    width: '100%',
});

export const StyledImage = styled('img')<{isLoading: boolean}>(({isLoading}) => ({
    cursor: 'pointer',
    minWidth: '100%',
    minHeight: '100%',
    visibility: isLoading ? 'hidden' : 'visible',
}));

export const ImageFooter = styled('div')<{isDownloadInProgress: boolean}>(
    ({isDownloadInProgress}) => ({
        overflow: 'hidden',
        display: 'flex',
        position: 'absolute',
        height: isDownloadInProgress ? '0px !important' : 0,
        backgroundImage: `linear-gradient(to top, ${Colors.black_80} 60%, transparent)`,
        bottom: 0,
        left: 0,
        width: '100%',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        transition: '100ms ease-in-out',

        button: {
            all: 'unset',
            cursor: 'pointer',
        },

        svg: {
            color: Colors.white,
        },
    }),
);
