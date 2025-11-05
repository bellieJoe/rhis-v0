

import { createSlice } from "@reduxjs/toolkit";

export const registerMaternalClient = createSlice({
    name: 'registerMaternalClient',
    initialState: {
        visible : false,
        household_profile : {}
    },
    reducers: {
        showRegisterMaternalForm : (state : any, action) => { 
            state.visible = true; 
            console.log(action);
            state.household_profile = action.payload.household_profile;
        },
        hideRegisterMaternalForm : (state : any) => { state.visible = false; },
    },
});

export const { showRegisterMaternalForm, hideRegisterMaternalForm } = registerMaternalClient.actions;

export default registerMaternalClient.reducer;