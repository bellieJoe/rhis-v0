import { createSlice } from "@reduxjs/toolkit";

interface UpdateHouseholdProfileState {
    visible: boolean;
    householdProfile: any; // or a proper interface instead of 'any'
}

const initialState: UpdateHouseholdProfileState = {
    visible: false,
    householdProfile: {},
};

export const updateHouseholdProfileSlice = createSlice({
    name: 'updateHouseholdProfile',
    initialState,
    reducers: {
        updateProfile: (state, action) => {
            state.visible = true;
            state.householdProfile = action.payload.householdProfile;
        },
        hideUpdateProfile: (state) => {
            state.visible = false;
            state.householdProfile = {};
        },
    },
});

export const { updateProfile, hideUpdateProfile } = updateHouseholdProfileSlice.actions;

export default updateHouseholdProfileSlice.reducer;