import { createSlice } from "@reduxjs/toolkit";


export const assignMidwifeFormSlice = createSlice({
    name: 'assignMidwifeForm',
    initialState: {
        visible : false,
        user : {}
    },
    reducers: {
        assignMidwife : (state : any, action) => { state.visible = true; state.user = action.payload.user; },
        hideAssignMidwife : (state : any) => { state.visible = false; state.user = {}; },
    },
});

export const { assignMidwife, hideAssignMidwife } = assignMidwifeFormSlice.actions;

export default assignMidwifeFormSlice.reducer;