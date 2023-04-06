import styled from 'styled-components';

export const Container = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    height: '100%',
});

export const ChatArea = styled('div')({
    display: 'flex',
    flexDirection: 'column-reverse',
    flex: 1,
    overflowY: 'auto',
    paddingRight: '10px',
});
