import { createSlice } from "@reduxjs/toolkit";

export const toastSlice = createSlice({
    name : "toast",
    initialState : {
        severity : null,
        summary : null,
        detail : null,
        life : 3000
    },
    reducers : {
        setToast : (state, action) => {
            state.severity = action.payload.severity;
            state.summary = action.payload.summary;
            state.detail = action.payload.detail;
            state.life = action.payload.life;
        }
    }
});

export const { setToast } = toastSlice.actions;

export default toastSlice.reducer;