import {combineReducers} from '@reduxjs/toolkit';

import services from 'services';

const reducers = combineReducers({
    [services.reducerPath]: services.reducer,
});

export default reducers;
