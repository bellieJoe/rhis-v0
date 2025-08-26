import { createSlice } from "@reduxjs/toolkit";


export const updateHouseholdProfileAddtnlInfoSlice = createSlice({
    name: 'updateHouseholdProfileAddtnlInfo',
    initialState: {
        visible: false,
        householdProfile: {},
    },
    reducers: {
        updateProfileAdditnlInfo: (state, action) => {
            state.visible = true;
            state.householdProfile = action.payload.householdProfile;
        },
        hideUpdateProfileAdditnlInfo : (state) => {
            state.visible = false;
            state.householdProfile = {};
        },
    },
});

export const { updateProfileAdditnlInfo, hideUpdateProfileAdditnlInfo } = updateHouseholdProfileAddtnlInfoSlice.actions;

export default updateHouseholdProfileAddtnlInfoSlice.reducer;