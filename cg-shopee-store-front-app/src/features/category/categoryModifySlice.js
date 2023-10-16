import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {findAllCategoriesWithSubCategories} from "../../api/categoryAPI";

const initialState = {
    categories: null,
    loading: false,
    error: null,
    success: false,
};


export const getCategoriesWithAllSubCategories = createAsyncThunk(
    "shop/categories/subcategories",
    async () => {
        const response = await findAllCategoriesWithSubCategories();
        return response.data;
});


export const categoryModifySlice = createSlice({
    name: "categoryModify",
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
            //update states of getCategoriesWithAllSubCategories
            .addCase(getCategoriesWithAllSubCategories.pending, (state) => {
                state.success = false;
                state.loading = true;
                state.error = false;
            })
            .addCase(getCategoriesWithAllSubCategories.rejected, (state, action) => {
                state.success = false;
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getCategoriesWithAllSubCategories.fulfilled, (state, action) => {
                state.success = true;
                state.loading = false;
                state.error = false;
                state.categories = action.payload;
            })
    },
});

export const {
    setLoadingModifyCategories,
    setErrorModifyCategories,
    setSuccessModifyCategories,
} = categoryModifySlice.actions;

export const selectLoadingModifyCategories = (state) => state.categoryModify.loading;

export const selectSuccessModifyCategories = (state) => state.categoryModify.success;

export const selectModifyCategoryList = (state) => state.categoryModify.categories;


//Enhancement feature of category slice
export const setLoadingTrueIfCalled = (isCalled) => (dispatch, getState) => {
    const currentValue = selectLoadingModifyCategories(getState());
    if (currentValue === isCalled) {
        dispatch(setLoadingModifyCategories(true));
    }
};

export default categoryModifySlice.reducer;