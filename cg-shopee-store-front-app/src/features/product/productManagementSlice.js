import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {
    findBySellerId,
    findByIdToEdit,
    addProduct,
    saveProduct,
    deleteProduct,
} from "../../api/productAPI";

const initialState = {
    productList: null,
    product: null,
    loading: false,
    error: null,
    success: false,
};

export const getProductsBySellerId = createAsyncThunk(
    "shop/product/list",
    async () => {

        const response = await findBySellerId();
        return response.data;
    });

export const getByIdToEdit = createAsyncThunk(
    "shop/product/edit",
    async ({id}) => {

        const response = await findByIdToEdit(id);
        return response.data;
    });

export const saveNewProduct = createAsyncThunk(
    "shop/product/save",
    async ({product}) => {

        const response = await addProduct(product);
        return response.data;
    });

export const updateProduct = createAsyncThunk(
    "shop/product/update",
    async ({product}) => {

        const response = await saveProduct(product);
        return response.data;
    });

export const removeProduct = createAsyncThunk(
    "shop/product/remove",
    async ({id}) => {

        const response = await deleteProduct(id);
        return response.data;
    });

export const productManagementSlice = createSlice({
    name: "productManagement",
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
            .addCase(getProductsBySellerId.pending, (state) => {
                state.success = false;
                state.loading = true;
                state.error = false;
            })
            .addCase(getProductsBySellerId.rejected, (state, action) => {
                state.success = false;
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getProductsBySellerId.fulfilled, (state, action) => {
                state.success = true;
                state.loading = false;
                state.productList = action.payload;
                state.error = false;
            })

            //Update states of get product action
            .addCase(getByIdToEdit.pending, (state) => {
                state.success = false;
                state.loading = true;
                state.error = false;
            })
            .addCase(getByIdToEdit.rejected, (state, action) => {
                state.success = false;
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getByIdToEdit.fulfilled, (state, action) => {
                state.success = true;
                state.loading = false;
                state.product = action.payload;
                state.error = false;
            })

            //Update states of add product action
            .addCase(saveNewProduct.pending, (state) => {
                state.success = false;
                state.loading = true;
                state.error = false;
            })
            .addCase(saveNewProduct.rejected, (state, action) => {
                state.success = false;
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(saveNewProduct.fulfilled, (state, action) => {
                state.success = true;
                state.loading = false;
                state.product = action.payload;
                state.error = false;
            })

            //Update states of edit product action
            .addCase(updateProduct.pending, (state) => {
                state.success = false;
                state.loading = true;
                state.error = false;
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.success = false;
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.success = true;
                state.loading = false;
                state.product = action.payload;
                state.error = false;
            })

            //Update states of remove product action
            .addCase(removeProduct.pending, (state) => {
                state.success = false;
                state.loading = true;
                state.error = false;
            })
            .addCase(removeProduct.rejected, (state, action) => {
                state.success = false;
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(removeProduct.fulfilled, (state, action) => {
                state.success = true;
                state.loading = false;
                state.product = action.payload;
                state.error = false;
            });
    },
});

export const {
    setLoadingProducts,
} = productManagementSlice.actions;

export const selectLoadingProducts = (state) => state.productManagement.loading;
export const selectSuccessProducts = (state) => state.productManagement.success;
export const selectProductList = (state) => state.productManagement.productList;
export const selectProductDetail = (state) => state.productManagement.product;
export const selectProductAdded = (state) => state.productManagement.product;
export const selectProductEdited = (state) => state.productManagement.product;

//Enhancement feature of product slice
export const setLoadingTrueIfCalled = (isCalled) => (dispatch, getState) => {
    const currentValue = selectLoadingProducts(getState());
    if (currentValue === isCalled) {
        dispatch(setLoadingProducts(true));
    }
};

export default productManagementSlice.reducer;