

import { createSlice } from "@reduxjs/toolkit";

export const registerFamilyPlanningClient = createSlice({
    name: 'registerFamilyPlanningClient',
    initialState: {
        visible : false,
        household_profile : {},
        reload : false,
    },
    reducers: {
        showRegisterFamilyPlanningClient : (state : any, action) => { 
            state.visible = true;
            console.log("action");
            state.household_profile = action.payload.household_profile;
        },
        hideRegisterFamilyPlanningForm : (state : any) => { state.visible = false; },
        familyPlanningClientRegistered : (state : any) => { state.reload = !state.reload; },
    },
});

export const { showRegisterFamilyPlanningClient, hideRegisterFamilyPlanningForm, familyPlanningClientRegistered } = registerFamilyPlanningClient.actions;

export default registerFamilyPlanningClient.reducer;