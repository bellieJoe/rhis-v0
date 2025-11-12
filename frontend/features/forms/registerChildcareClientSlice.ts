

import { createSlice } from "@reduxjs/toolkit";

export const registerChildcareClient = createSlice({
    name: 'registerChildcareClient',
    initialState: {
        visible : false,
        household_profile : {},
        reload : false,
    },
    reducers: {
        showRegisterChildcareClient : (state : any, action) => { 
            state.visible = true;
            console.log(action);
            state.household_profile = action.payload.household_profile;
        },
        hideRegisterChildcareForm : (state : any) => { state.visible = false; },
        childcareClientRegistered : (state : any) => { state.reload = !state.reload; },
    },
});

export const { showRegisterChildcareClient, hideRegisterChildcareForm, childcareClientRegistered } = registerChildcareClient.actions;

export default registerChildcareClient.reducer;