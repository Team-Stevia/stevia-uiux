import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {loginUser} from "../api/api.js";

//초기 상태 정의
const initialState = {
    accessToken: null,
    status: 'idle',
    error: null,
};
/**
 * 사용자 로그인을 위한 Thunk 액션 생성 함수
 * 사용자 인증을 위한 비동기 액션 디스패치
 */
export const login = createAsyncThunk(
    'auth/login',
    async ({ studentId, password }) => {
        return loginUser({studentId, password});
    }
);


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.accessToken = null;
            state.refreshToken = null;
        },
        setAccessToken: (state, action) => {
            state.accessToken = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.accessToken = action.payload.accessToken;
                state.error = null; // 성공 시 에러 초기화
            })
            .addCase(login.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message; // 실패 시 에러 메시지 설정
            });
    },
});

export const { logout ,setAccessToken} = authSlice.actions;

export default authSlice.reducer;
