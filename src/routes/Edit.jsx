import React from 'react';
import {
    Stack,
} from '@chakra-ui/react';

import Calendar from '../components/Calendar';
import Edit from '../components/Input';

const View = () => (
    <Stack direction={['column', 'column', 'row']} spacing={8}>
        <Edit />
        <Calendar />
    </Stack>
);

export default View;