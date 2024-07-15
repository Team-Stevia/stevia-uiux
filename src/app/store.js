import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../feature/slice/authSlice';
import boardReducer from "../feature/slice/boardSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        boards: boardReducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
});

export default store;