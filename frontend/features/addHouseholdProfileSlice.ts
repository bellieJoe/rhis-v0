import { createSlice } from "@reduxjs/toolkit";


export const addHouseholdProfileSlice = createSlice({
    name: 'addHouseholdProfile',
    initialState: {
        visible : false,
        addHead : false,
        addMember : false,
        householdNo : "",
        date_of_visit : "",
    },
    reducers: {
        addHead : (state : any, action) => { 
            state.addHead = true; 
            state.addMember = false;
            state.householdNo = action.payload.householdNo;
            state.householdId = action.payload.householdId
        },
        addMember : (state : any) => { 
            state.addMember = true; 
            state.addHead = false;
        },
        show : (state : any) => { state.visible = true;
            console.log("show add household")
        },
        hide : (state : any) => { state.visible = false; },
    },
});

export const { show, hide, addHead, addMember } = addHouseholdProfileSlice.actions;

export default addHouseholdProfileSlice.reducer;