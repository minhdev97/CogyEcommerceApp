import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
    findProfile,
    updateProfile,
} from "../../api/userAPI";

const initialState = {
    values: null,
    value: null,
    loading: false,
    error: null,
    success: false,
};



export const getProfile = createAsyncThunk("profile/detail", async (userName) => {
    const response = await findProfile(userName);
    return response.data;
});

export const editProfile = createAsyncThunk("profile/update", async (profile) => {
    const response = await updateProfile(profile);
    return response.data;
});


export const profileSlice = createSlice({
    name: "cartLine",
    initialState,
    reducers: {
        setLoadingProfile: (state, action) => {
            state.loading = action.payload;
        },
        setErrorProfile: (state, action) => {
            state.error = action.payload;
        },
        setSuccessProfile: (state, action) => {
            state.success = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
             .addCase(getProfile.pending, (state) => {
                state.success = false;
                state.loading = true;
                state.error = false;
            })
            .addCase(getProfile.rejected, (state, action) => {
                state.success = false;
                state.loading = false;
                state.error = action.error;
            })
            .addCase(getProfile.fulfilled, (state, action) => {
                state.success = true;
                state.loading = false;
                state.value = action.payload;
                state.error = false;
            })
            .addCase(editProfile.pending, (state) => {
                state.success = false;
                state.loading = true;
                state.error = false;
            })
            .addCase(editProfile.rejected, (state, action) => {
                state.success = false;
                state.loading = false;
                state.error = action.error;
            })
            .addCase(editProfile.fulfilled, (state, action) => {
                state.success = true;
                state.loading = false;
                state.value = action.payload;
                state.error = false;
            })
    },
});

export const {
    setLoadingProfile,
    setErrorProfile,
    setSuccessProfile,
} = profileSlice.actions;

export const selectLoadingProfile = (state) => state.cartLine.loading;
export const selectProfileLineEdited = (state) => state.cartLine.value;

export const setLoadingTrueIfCalled = (isCalled) => (dispatch, getState) => {
    const currentValue = selectLoadingProfile(getState());
    if (currentValue === isCalled) {
        dispatch(setLoadingProfile(true));
    }
};

export default profileSlice.reducer;
