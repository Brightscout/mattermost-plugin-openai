import styled from 'styled-components';

import Colors from 'styles/colorsForJs.module.scss';

export const EmptyStateWrapper = styled('div')({
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    gap: '30px',
});

export const EmptyStateSvg = styled('svg')({
    fill: Colors.centerChannel_56,
    width: '64px',
});

export const Title = styled('h1')({
    color: Colors.centerChannel_56,
});

export const SubTitle = styled('p')({
    color: Colors.centerChannel_56,
    fontSize: '20px',
});

export const StyledExampleBox = styled('div')({
    background: Colors.centerChannel_4,
    whiteSpace: 'pre-wrap',
    padding: '20px',
    borderRadius: '10px',
    textAlign: 'center',
    width: '350px',
    pointerEvents: 'none',

    '& span': {
        display: 'block',
    },
});
