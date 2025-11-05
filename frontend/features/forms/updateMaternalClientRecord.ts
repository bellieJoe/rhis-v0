

import { createSlice } from "@reduxjs/toolkit";

export const updateMaternalClientRecord = createSlice({
    name: 'updateMaternalClientRecord',
    initialState: {
        visible : false,
        maternal_client : {}
    },
    reducers: {
        showUpdateMaternalForm : (state : any, action) => { 
            state.visible = true; 
            console.log(action);
            state.maternal_client = action.payload.maternal_client;
        },
        hideUpdateMaternalForm : (state : any) => { state.visible = false; },
    },
});

export const { showUpdateMaternalForm, hideUpdateMaternalForm } = updateMaternalClientRecord.actions;

export default updateMaternalClientRecord.reducer;