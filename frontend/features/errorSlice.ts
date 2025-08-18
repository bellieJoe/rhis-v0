import { createSlice } from "@reduxjs/toolkit";


export const errorSlice = createSlice({
    name : "error",
    initialState : {
        errors : []
    },
    reducers : {
        setErrors : (state, action) => { state.errors = action.payload },
    }
});

export const { setErrors } = errorSlice.actions;

export default errorSlice.reducer;