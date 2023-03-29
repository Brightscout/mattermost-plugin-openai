import styled from 'styled-components';

import Colors from 'styles/colorsForJs.module.scss';

export const PostCardWrapper = styled('div')({
    display: 'flex',
    width: '100%',
    gap: '10px',
    position: 'relative',
    padding: '8px',

    '&:hover': {
        background: Colors.centerChannel_4,
        '.post__floating-menu': {
            display: 'flex',
        },
    },
});
