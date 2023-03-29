import styled from 'styled-components';

export const PostHeaderWrapper = styled('div')({
    display: 'flex',
    width: 'fit-content',
    alignItems: 'start',
    marginBottom: '4px',
    gap: '4px',
});

export const PostHeaderAuthorName = styled('p')({
    fontWeight: 600,
    lineHeight: '20px',
    margin: '0 !important',
});

export const PostFloatingMenu = styled('div')({
    zIndex: 10,
    border: '1px solid transparent',
    borderRadius: '4px',
    position: 'absolute',
    top: '4px',
    right: '8px',
    gap: '4px',
    display: 'none',
    justifyContent: 'end',
    alignItems: 'center',
    padding: '4px',
});
