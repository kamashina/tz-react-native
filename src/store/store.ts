import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {authApi} from './api/authApi';
import {driversApi} from './api/getDriversApi';

const rootReducer = combineReducers({
  [driversApi.reducerPath]: driversApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat([driversApi.middleware, authApi.middleware]),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
