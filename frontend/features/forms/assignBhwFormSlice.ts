import { createSlice } from "@reduxjs/toolkit";


export const assignBhwFormSlice = createSlice({
    name: 'assignBhwForm',
    initialState: {
        visible : false,
        user : {}
    },
    reducers: {
        assignBhw : (state : any, action) => { state.visible = true; state.user = action.payload.user; },
        hideAssignBhw : (state : any) => { state.visible = false; state.user = {}; },
    },
});

export const { assignBhw, hideAssignBhw } = assignBhwFormSlice.actions;

export default assignBhwFormSlice.reducer;