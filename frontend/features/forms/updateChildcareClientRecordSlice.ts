

import { createSlice } from "@reduxjs/toolkit";

export const updateChildcareClientRecord = createSlice({
    name: 'updateChildcareClientRecord',
    initialState: {
        visible : false,
        childcare_client : {},
        reload : false,
    },
    reducers: {
        showUpdateChildcareForm : (state : any, action) => { 
            state.visible = true; 
            console.log(action);
            state.childcare_client = action.payload.childcare_client;
        },
        hideUpdateChildcareForm : (state : any) => { state.visible = false; state.childcare_client = {}; },
        childcareClientUpdated : (state : any) => { state.reload = !state.reload; },
    },
});

export const { showUpdateChildcareForm, hideUpdateChildcareForm, childcareClientUpdated } = updateChildcareClientRecord.actions;

export default updateChildcareClientRecord.reducer;