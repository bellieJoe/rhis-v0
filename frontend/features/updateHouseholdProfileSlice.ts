import { createSlice } from "@reduxjs/toolkit";

interface UpdateHouseholdProfileState {
    visible: boolean;
    householdProfile: any; // or a proper interface instead of 'any'
    title?: string;
}

const initialState: UpdateHouseholdProfileState = {
    visible: false,
    householdProfile: {},
    title: 'Update Household Profile',
};

export const updateHouseholdProfileSlice = createSlice({
    name: 'updateHouseholdProfile',
    initialState,
    reducers: {
        updateProfile: (state, action) => {
            state.visible = true;
            state.householdProfile = action.payload.householdProfile;
            state.title = action.payload.householdProfile.updated_details?.member_relationship_id == 1 ? 'Update Household Head Personal Information' : 'Update Household Member Personal Information';
        },
        hideUpdateProfile: (state) => {
            state.visible = false;
            state.householdProfile = {};
        },
    },
});

export const { updateProfile, hideUpdateProfile } = updateHouseholdProfileSlice.actions;

export default updateHouseholdProfileSlice.reducer;