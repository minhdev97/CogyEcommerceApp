import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {
    get20SuggestProduct,
    getProductsByPageNumber, getProductsBySubCategoryList
} from "../../api/productAPI";

const initialState = {
    values: null,
    value: null,
    loading: false,
    error: null,
    success: false,
};

export const showProductsByPageNumber = createAsyncThunk (
    "page/product/list",async (page) => {
        const response = await getProductsByPageNumber(page);
        return response.data;
    });
export const showProductsBySubCategory = createAsyncThunk (
    "subcategory-list/product/list", async (subCategoryList) => {
        const response = await getProductsBySubCategoryList(subCategoryList);
        return response.data;
    }
)
export const show20SuggestProducts = createAsyncThunk (
    "view/product/list", async () => {
        const response = await get20SuggestProduct();
        return response.data;
    }
)
export const homeProductSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setLoadingProducts: (state, action) => {
            state.loading = action.payload;
        },
        setErrorProducts: (state, action) => {
            state.error = action.payload;
        },
        setSuccessProducts: (state, action) => {
            state.success = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            //Update states of get products action
            .addCase(showProductsByPageNumber.pending, (state) => {
                state.success = false;
                state.loading = true;
                state.error = false;
            })
            .addCase(showProductsByPageNumber.rejected, (state, action) => {
                state.success = false;
                state.loading = false;
                state.error = action.error;
            })
            .addCase(showProductsByPageNumber.fulfilled, (state, action) => {
                state.success = true;
                state.loading = false;
                state.values = action.payload;
                state.error = false;
            })

            .addCase(show20SuggestProducts.pending, (state) => {
                state.success = false;
                state.loading = true;
                state.error = false;
            })
            .addCase(show20SuggestProducts.rejected, (state, action) => {
                state.success = false;
                state.loading = false;
                state.error = action.error;
            })
            .addCase(show20SuggestProducts.fulfilled, (state, action) => {
                state.success = true;
                state.loading = false;
                state.values = action.payload;
                state.error = false;
            })
    }
});
export const {
    setLoadingProducts,
    setErrorProducts,
    setSuccessProducts,
} = homeProductSlice.actions;
export const selectLoadingProducts = (state) => state.product.loading;
export const selectErrorProducts = (state) => state.product.error;
export const selectSuccessProducts = (state) => state.product.success;
export const selectProductListByPageNumber = (state) => state.product.values;
export const select20SuggestProducts = (state) => state.product.values;

export const setLoadingTrueIfCalled = (isCalled) => (dispatch, getState) => {
    const currentValue = selectLoadingProducts(getState());
    if (currentValue === isCalled) {
        dispatch(setLoadingProducts(true));
    }
};

export default homeProductSlice.reducer;