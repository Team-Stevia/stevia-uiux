import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {fetchBoards} from "../api/api";

const initialState = {
    board: [],
    status: 'idle',
    error: null,
};

/**
 * 게시판 목록을 가져오기 위한 Thunk 액션 생성 함수
 *
 * @param {string} accessToken - 사용자 인증 토큰
 * @param {Function} rejectWithValue - 비동기 작업이 실패할 때 사용
 * @returns {Promise<Array>} fetchBoards 함수가 반환하는 Promise. 게시판 목록(Array) 포함
 */
export const boardList = createAsyncThunk(
    'boards/fetchBoards',
    async (accessToken, {rejectWithValue}) => {
        try {
            return await fetchBoards(accessToken);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const boardSlice = createSlice({
    name: 'boards',
    initialState,
    reducers: {
        setBoards(state, action) {
            state.boards = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(boardList.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(boardList.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.board = action.payload;
                state.error = null; // 성공 시 에러 초기화
            })
            .addCase(boardList.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload; // 실패 시 에러 메시지 설정
            });
    },
});

export const {setBoards} = boardSlice.actions;

export default boardSlice.reducer;
