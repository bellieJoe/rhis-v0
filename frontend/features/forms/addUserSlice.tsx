

import { createSlice } from "@reduxjs/toolkit";


export const addUserSlice = createSlice({
    name: 'addUser',
    initialState: {
        visible : false
    },
    reducers: {
        showAddUserForm : (state : any) => { state.visible = true; },
        hideAddUserForm : (state : any) => { state.visible = false; },
    },
});

export const { showAddUserForm, hideAddUserForm } = addUserSlice.actions;

export default addUserSlice.reducer;