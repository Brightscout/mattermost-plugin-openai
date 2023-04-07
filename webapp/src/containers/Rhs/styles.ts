import styled from 'styled-components';
import {Card} from '@brightscout/mattermost-ui-library';

export const Container = styled(Card)({

    // Subtracting the height of the RHS header
    height: 'calc(100% - 63px)',
    padding: '0 16px 24px',
});
