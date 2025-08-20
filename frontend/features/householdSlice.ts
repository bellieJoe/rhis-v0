import { createSlice } from "@reduxjs/toolkit";


export const householdSlice = createSlice({
    name : "household",
    initialState : {
        households : {},
        reload : false
    },
    reducers : {
        setHouseholds : (state, action) => {
            state.households = action.payload
        },
        reloadHouseholds : (state) => { 
            console.log("reload")
            state.reload = !state.reload 
        }    
    }
});

export const { setHouseholds, reloadHouseholds } = householdSlice.actions;

export default householdSlice.reducer;