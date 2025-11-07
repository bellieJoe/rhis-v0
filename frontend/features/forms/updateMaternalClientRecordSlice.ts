

import { createSlice } from "@reduxjs/toolkit";

export const updateMaternalClientRecord = createSlice({
    name: 'updateMaternalClientRecord',
    initialState: {
        visible : false,
        maternal_client : {},
        reload : false,
    },
    reducers: {
        showUpdateMaternalForm : (state : any, action) => { 
            state.visible = true; 
            console.log(action);
            state.maternal_client = action.payload.maternal_client;
        },
        hideUpdateMaternalForm : (state : any) => { state.visible = false; },
        maternalClientUpdated : (state : any) => { state.reload = !state.reload; },
    },
});

export const { showUpdateMaternalForm, hideUpdateMaternalForm, maternalClientUpdated } = updateMaternalClientRecord.actions;

export default updateMaternalClientRecord.reducer;