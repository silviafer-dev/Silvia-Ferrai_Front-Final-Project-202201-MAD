import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { userReducer } from './user/reducer';
import { ticketReducer } from './ticket/reducer';

export const store = configureStore({
    reducer: {
        user: userReducer,
        ticket: ticketReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;