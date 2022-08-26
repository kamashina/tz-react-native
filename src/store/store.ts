import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {driversApi} from './api/getDriversApi';

const rootReducer = combineReducers({
  [driversApi.reducerPath]: driversApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(driversApi.middleware),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
