import { createSlice } from "@reduxjs/toolkit";


export const assignRhuFormSlice = createSlice({
    name: 'assignRhuForm',
    initialState: {
        visible : false,
        user : {}
    },
    reducers: {
        assignRhu : (state : any, action) => { state.visible = true; state.user = action.payload.user; },
        hideAssignRhu : (state : any) => { state.visible = false; state.user = {}; },
    },
});

export const { assignRhu, hideAssignRhu } = assignRhuFormSlice.actions;

export default assignRhuFormSlice.reducer;