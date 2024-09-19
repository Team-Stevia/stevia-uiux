import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {loginUser} from "../apis/loginApi.js";


/**
 * 사용자 로그인을 위한 Thunk 액션 생성 함수
 * 사용자 인증을 위한 비동기 액션 디스패치
 */
export const login = createAsyncThunk(
    'auth/login',
    async ({studentId, password}) => {
        return loginUser({studentId, password});
    }
);

const initialState = {
    accessToken: null,
    status: 'idle',
    error: null,
    reservedId: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.accessToken = null;
            state.refreshAccessToken = null;
        },
        setAccessToken: (state, action) => {
            state.accessToken = action.payload;
            state.reservedId = null;
        },
        setReservedId: (state, action) => {
            state.reservedId = action.payload;
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

export default authSlice.reducer;
export const {logout, setAccessToken, setReservedId} = authSlice.actions;