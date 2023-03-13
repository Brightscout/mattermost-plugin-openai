import React from 'react';

import {Prompt} from './views/Prompt';

import {Container} from './styles';

/**
 * Rhs Component
 * This is the Rhs component for the plugin.
 *
 * @example Correct usage
 * ```tsx
 * <Rhs />
 * ```
 */
const Rhs = (): JSX.Element => (
    <Container className='rhs-container'>
        <Prompt />
    </Container>
);

export default Rhs;
