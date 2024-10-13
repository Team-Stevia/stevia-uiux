import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    reserveId: null,
}

const reserveIdSlice = createSlice({
        name: 'reserveId',
        initialState,
        reducers: {
            setReserveId: (state, action) => {
                state.reserveId = action.payload;
            },
            clearReserveId(state) {
                state.reserveId = null;
            },
        },
    });

export const {setReserveId, clearReserveId} = reserveIdSlice.actions;
export default reserveIdSlice.reducer;