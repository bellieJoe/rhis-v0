import { createSlice } from "@reduxjs/toolkit";


export const updateHealthServiceSlice = createSlice({
    name: 'updateHealthService',
    initialState: {
        visible : false,
        householdProfile : {},
        reset : false,
        loading : false
    },
    reducers: {
        showUpdateHealthService : (state : any, actions) => { 
            state.visible = true
            state.householdProfile = actions.payload.householdProfile;
            console.log("show update health service", state.householdProfile)
        },
        hideUpdateHealthService : (state : any) => { state.visible = false; },
        resetHealthServiceForm : (state : any) => { state.reset = !state.reset; },
        onHealthServiceSubmit : (state : any) => { 
            console.log("test")
            state.loading = true; 
        },
        onHealthServiceFinish : (state : any) => { 
            console.log("finish")
            state.loading = false; 
        },
    },
});

export const { showUpdateHealthService, hideUpdateHealthService, resetHealthServiceForm, onHealthServiceSubmit, onHealthServiceFinish } = updateHealthServiceSlice.actions;

export default updateHealthServiceSlice.reducer;