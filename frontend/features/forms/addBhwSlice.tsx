

import { createSlice } from "@reduxjs/toolkit";


export const addBhwSlice = createSlice({
    name: 'addBhw',
    initialState: {
        visible : false,
        user_id : ""
    },
    reducers: {
        showAddBhwForm : (state : any, action) => { state.visible = true; state.user_id = action.payload.user_id; },
        hideAddBhwForm : (state : any) => { state.visible = false; },
    },
});

export const { showAddBhwForm, hideAddBhwForm } = addBhwSlice.actions;

export default addBhwSlice.reducer;