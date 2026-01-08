import { createSlice } from "@reduxjs/toolkit";


export const addHouseholdProfileSlice = createSlice({
    name: 'addHouseholdProfile',
    initialState: {
        visible : false,
        addHead : false,
        addMember : false,
        householdNo : "",
        householdId : "",
        date_of_visit : "",
        title : "Add Household Member",
        household : null,
        addFamilyMember : false,
        family_head_id : ""
    },
    reducers: {
        addHead : (state : any, action) => { 
            state.addHead = true; 
            state.addMember = false;
            state.visible = true;
            state.householdNo = action.payload.householdNo;
            state.householdId = action.payload.householdId,
            state.date_of_visit = action.payload.date_of_visit;
            state.title = "Add Household Head";
            state.household = action.payload.household
        },
        addMember : (state : any, action) => { 
            state.addMember = true; 
            state.addHead = false;
            state.addFamilyMember = false;
            state.visible = true;
            state.householdNo = action.payload.householdNo;
            state.householdId = action.payload.householdId,
            state.date_of_visit = action.payload.date_of_visit;
            state.title = "Add Household Member";
            state.household = action.payload.household
        },
        addFamilyMember : (state : any, action) => { 
            state.addMember = false; 
            state.addHead = false;
            state.addFamilyMember = true;
            state.visible = true;
            state.family_head_id = action.payload.family_head_id
            state.householdNo = action.payload.householdNo;
            state.householdId = action.payload.householdId,
            state.date_of_visit = action.payload.date_of_visit;
            state.title = "Add Family Member";
            state.household = action.payload.household
        },
        addMemberGeneral : (state : any, action) => { 
            state.addMember = false; 
            state.addHead = false;
            state.addFamilyMember = false;
            state.visible = true;
            state.householdNo = action.payload.householdNo;
            state.householdId = action.payload.householdId,
            state.date_of_visit = action.payload.date_of_visit;
            state.title = "Add Household Member";
            state.household = null;
        },
        show : (state : any) => { state.visible = true;
            console.log("show add household")
        },
        hide : (state : any) => { 
            state.visible = false; 
            state.addMember = false; 
            state.addHead = false;
            state.addFamilyMember = false;
            state.householdNo = "";
            state.householdId = "",
            state.date_of_visit = "";
            state.title = "Add Household Member";
        },
    },
});

export const { show, hide, addHead, addMember, addMemberGeneral, addFamilyMember } = addHouseholdProfileSlice.actions;

export default addHouseholdProfileSlice.reducer;