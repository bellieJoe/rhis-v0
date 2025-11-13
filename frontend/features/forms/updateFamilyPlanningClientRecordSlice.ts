

import { createSlice } from "@reduxjs/toolkit";

export const updateFamilyPlanningClientRecord = createSlice({
    name: 'updateFamilyPlanningClientRecord',
    initialState: {
        visible : false,
        family_planning_client : {},
        reload : false,
    },
    reducers: {
        showUpdateFamilyPlanningForm : (state : any, action) => { 
            state.visible = true; 
            console.log(action);
            state.family_planning_client = action.payload.family_planning_client;
        },
        hideUpdateFamilyPlanningForm : (state : any) => { state.visible = false; state.family_planning_client = {}; },
        familyPlanningClientUpdated : (state : any) => { state.reload = !state.reload; },
    },
});

export const { showUpdateFamilyPlanningForm, hideUpdateFamilyPlanningForm, familyPlanningClientUpdated } = updateFamilyPlanningClientRecord.actions;

export default updateFamilyPlanningClientRecord.reducer;