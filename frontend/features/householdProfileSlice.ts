import { createSlice } from "@reduxjs/toolkit";


export const householdProfileSlice = createSlice({
    name : "householdProfiles",
    initialState : {
        householdProfiles : {},
        reload : false
    },
    reducers : {
        setHouseholdProfiles : (state, action) => {
            state.householdProfiles = action.payload
        },
        reloadHouseholdProfiles : (state) => { 
            console.log("reload")
            state.reload = !state.reload 
        }    
    }
});

export const { setHouseholdProfiles, reloadHouseholdProfiles } = householdProfileSlice.actions;

export default householdProfileSlice.reducer;