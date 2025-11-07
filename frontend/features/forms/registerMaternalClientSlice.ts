

import { createSlice } from "@reduxjs/toolkit";

export const registerMaternalClient = createSlice({
    name: 'registerMaternalClient',
    initialState: {
        visible : false,
        household_profile : {},
        reload : false,
    },
    reducers: {
        showRegisterMaternalForm : (state : any, action) => { 
            state.visible = true;
            console.log(action);
            state.household_profile = action.payload.household_profile;
        },
        hideRegisterMaternalForm : (state : any) => { state.visible = false; },
        maternalClientRegistered : (state : any) => { state.reload = !state.reload; },
    },
});

export const { showRegisterMaternalForm, hideRegisterMaternalForm, maternalClientRegistered } = registerMaternalClient.actions;

export default registerMaternalClient.reducer;