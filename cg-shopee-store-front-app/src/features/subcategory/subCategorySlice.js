import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {
    find5RandomSubCategories,
} from "../../api/subCategoryAPI";

const initialState = {
    value: null,
    values: null,
    loading: false,
    error: null,
    success: false,
};
export const get5RandomSubCategories = createAsyncThunk("home/sub-category/list", async () => {
    const response = await find5RandomSubCategories();
    return response.data;
});

export const subCategorySlice = createSlice({
    name: "subCategory",
    initialState,
    reducers: {
        setLoadingSubCategories: (state, action) => {
            state.loading = action.payload;
        },
        setErrorSubCategories: (state, action) => {
            state.error = action.payload;
        },
        setSuccessSubCategories: (state, action) => {
            state.success = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(get5RandomSubCategories.pending, (state) => {
                state.success = false;
                state.loading = true;
                state.error = false;
            })
            .addCase(get5RandomSubCategories.rejected, (state, action) => {
                state.success = false;
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(get5RandomSubCategories.fulfilled, (state, action) => {
                state.success = true;
                state.loading = false;
                state.error = false;
                state.values = action.payload;
            })
    },
});

export const {
    setLoadingSubCategories,
    setSuccessSubCategories,
} = subCategorySlice.actions;

export const selectLoadingSubCategories = (state) => state.subCategory.loading;
export const selectSuccessSubCategories = (state) => state.subCategory.success;
export const selectSubCategoryList = (state) => state.subCategory.values;
export const selectSubCategoryDetail = (state) => state.subCategory.value;

//Enhancement feature of category slice
export const setLoadingTrueIfCalled = (isCalled) => (dispatch, getState) => {
    const currentValue = selectLoadingSubCategories(getState());
    if (currentValue === isCalled) {
        dispatch(setLoadingSubCategories(true));
    }
};

export default subCategorySlice.reducer;