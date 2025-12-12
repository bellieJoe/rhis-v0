import { createSlice } from "@reduxjs/toolkit";
import { setHouseholdProfiles } from "./householdProfileSlice";


export const viewMemberSlice = createSlice({
    name : "viewMember",
    initialState : {
        household_id : 0,
    },
    reducers : {
        setHouseholdId : (state, action) => {
            state.household_id = action.payload
        }
    }
});

export const { setHouseholdId } = viewMemberSlice.actions;

export default viewMemberSlice.reducer;