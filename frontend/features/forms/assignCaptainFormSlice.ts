import { createSlice } from "@reduxjs/toolkit";


export const assignCaptainFormSlice = createSlice({
    name: 'assignCapptainForm',
    initialState: {
        visible : false,
        user : {}
    },
    reducers: {
        assignCaptain : (state : any, action) => { state.visible = true; state.user = action.payload.user; },
        hideAssignCaptain : (state : any) => { state.visible = false; state.user = {}; },
    },
});

export const { assignCaptain, hideAssignCaptain } = assignCaptainFormSlice.actions;

export default assignCaptainFormSlice.reducer;