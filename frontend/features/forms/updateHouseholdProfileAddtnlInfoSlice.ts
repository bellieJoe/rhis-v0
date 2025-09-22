import { createSlice } from "@reduxjs/toolkit";

interface UpdateHouseholdProfileState {
    visible: boolean;
    householdProfile: any; // or a proper interface instead of 'any'
    title?: string;
}

const initialState: UpdateHouseholdProfileState = {
    visible: false,
    householdProfile: {},
    title: 'Update Household Profile Additional Information',
};

export const updateHouseholdProfileAddtnlInfoSlice  = createSlice({
    name: 'updateHouseholdProfileAddtnlInfo',
    initialState,
    reducers: {
        updateProfileAdditnlInfo: (state, action) => {
            state.visible = true;
            state.householdProfile = action.payload.householdProfile;
            state.title = action.payload.householdProfile.updated_details?.member_relationship_id == 1 ? 'Update Household Head Additional Information' : 'Update Household Member Additional Information';
        },
        hideUpdateProfileAdditnlInfo : (state) => {
            state.visible = false;
            state.householdProfile = {};
        },
    },
});

export const { updateProfileAdditnlInfo, hideUpdateProfileAdditnlInfo } = updateHouseholdProfileAddtnlInfoSlice.actions;

export default updateHouseholdProfileAddtnlInfoSlice.reducer;