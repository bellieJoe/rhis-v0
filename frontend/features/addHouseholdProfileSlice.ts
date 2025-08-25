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
    },
    reducers: {
        addHead : (state : any, action) => { 
            state.addHead = true; 
            state.addMember = false;
            state.visible = true;
            state.householdNo = action.payload.householdNo;
            state.householdId = action.payload.householdId,
            state.date_of_visit = action.payload.date_of_visit
        },
        addMember : (state : any, action) => { 
            state.addMember = true; 
            state.addHead = false;
            state.visible = true;
            state.householdNo = action.payload.householdNo;
            state.householdId = action.payload.householdId,
            state.date_of_visit = action.payload.date_of_visit
        },
        show : (state : any) => { state.visible = true;
            console.log("show add household")
        },
        hide : (state : any) => { state.visible = false; },
    },
});

export const { show, hide, addHead, addMember } = addHouseholdProfileSlice.actions;

export default addHouseholdProfileSlice.reducer;