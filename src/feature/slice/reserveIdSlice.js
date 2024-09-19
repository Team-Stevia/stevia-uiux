import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    id: null,
}

const reserveIdSlice = createSlice({
        name: 'reserveId',
        initialState,
        reducers: {
            setReserveId: (state, action) => {
                state.id = action.payload;
            },
            clearReserveId(state) {
                state.id = null;
            },
        },
    });

export const {setReserveId, clearReserveId} = reserveIdSlice.actions;
export default reserveIdSlice.reducer;