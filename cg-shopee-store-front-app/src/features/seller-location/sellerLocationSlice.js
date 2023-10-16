import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {
    findAllSellerLocations
} from "../../api/sellerLocationAPI";

const initialState = {
    value: null,
    values: null,
    loading: false,
    error: null,
    success: false,
};
export const getSellerLocationsList = createAsyncThunk("home/seller-location/list", async () => {
    const response = await findAllSellerLocations();
    return response.data;
});

export const sellerLocationSlice = createSlice({
    name: "seller-location",
    initialState,
    reducers: {
        setLoadingCategories: (state, action) => {
            state.loading = action.payload;
        },
        setErrorCategories: (state, action) => {
            state.error = action.payload;
        },
        setSuccessCategories: (state, action) => {
            state.success = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getSellerLocationsList.pending, (state) => {
                state.success = false;
                state.loading = true;
                state.error = false;
            })
            .addCase(getSellerLocationsList.rejected, (state, action) => {
                state.success = false;
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getSellerLocationsList.fulfilled, (state, action) => {
                state.success = true;
                state.loading = false;
                state.error = false;
                state.values = action.payload;
            })
    },
});

export const {
    setLoadingSellerLocations,
    setSuccessSellerLocations,
} = sellerLocationSlice.actions;

export const selectLoadingSellerLocations = (state) => state.sellerLocation.loading;
export const selectSuccessSellerLocations = (state) => state.sellerLocation.success;
export const selectSellerLocationsList = (state) => state.sellerLocation.values;
export const selectSellerLocation = (state) => state.sellerLocation.value;

//Enhancement feature of category slice
export const setLoadingTrueIfCalled = (isCalled) => (dispatch, getState) => {
    const currentValue = selectLoadingSellerLocations(getState());
    if (currentValue === isCalled) {
        dispatch(setLoadingSellerLocations(true));
    }
};

export default sellerLocationSlice.reducer;