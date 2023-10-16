import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
    findCartLines,
    findCartLine,
    createCartLine,
    updateCartLine,
    deleteCartLine,
    addNewCartLine, deleteSelectedCartLines,
} from '../../api/cartLineAPI';

const initialState = {
    values: [],
    value: null,
    loading: false,
    error: null,
    success: false,
};

export const getCartLines = createAsyncThunk('cart-lines/list', async (cartId) => {
    const response = await findCartLines(cartId);
    return response.data.cartLines;
});

export const getCartLine = createAsyncThunk('cart-lines/detail', async (cartLineId) => {
    const response = await findCartLine(cartLineId);
    return response.data;
});

export const addCartLine = createAsyncThunk('cart-lines/create', async (cartLine) => {
    const response = await createCartLine(cartLine);
    return response.data;
});

export const addToCart = createAsyncThunk('cart-lines/add', async (cartLine) => {
    const response = await addNewCartLine(cartLine);
    return response.data;
});

export const editCartLine = createAsyncThunk('cart-lines/update', async (cartLine) => {
    const response = await updateCartLine(cartLine);
    return response.data;
});

export const removeCartLine = createAsyncThunk('cart-lines/remove', async (cartLineId) => {
    const response = await deleteCartLine(cartLineId);
    return response.data;
});

export const removeCartLines = createAsyncThunk('cart-lines/removeSelected', async (cartLineIds) => {
    await deleteSelectedCartLines(cartLineIds);
    return cartLineIds;
});


export const cartLineSlice = createSlice({
    name: 'cartLine',
    initialState,
    reducers: {
        setLoadingCartLines: (state, action) => {
            state.loading = action.payload;
        },
        setErrorCartLines: (state, action) => {
            state.error = action.payload;
        },
        setSuccessCartLines: (state, action) => {
            state.success = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCartLines.pending, (state) => {
                state.success = false;
                state.loading = true;
                state.error = false;
            })
            .addCase(getCartLines.rejected, (state, action) => {
                state.success = false;
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getCartLines.fulfilled, (state, action) => {
                state.success = true;
                state.loading = false;
                state.values = action.payload;
                state.error = false;
            })

            .addCase(getCartLine.pending, (state) => {
                state.success = false;
                state.loading = true;
                state.error = false;
            })
            .addCase(getCartLine.rejected, (state, action) => {
                state.success = false;
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getCartLine.fulfilled, (state, action) => {
                state.success = true;
                state.loading = false;
                state.value = action.payload;
                state.error = false;
            })

            .addCase(addCartLine.pending, (state) => {
                state.success = false;
                state.loading = true;
                state.error = false;
            })
            .addCase(addCartLine.rejected, (state, action) => {
                state.success = false;
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(addCartLine.fulfilled, (state, action) => {
                state.success = true;
                state.loading = false;
                state.value = action.payload;
                state.error = false;
            })

            .addCase(editCartLine.pending, (state) => {
                state.success = false;
                state.loading = true;
                state.error = false;
            })
            .addCase(editCartLine.rejected, (state, action) => {
                state.success = false;
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(editCartLine.fulfilled, (state, action) => {
                state.success = true;
                state.loading = false;
                state.value = action.payload;
                state.error = false;
            })
            .addCase(removeCartLine.pending, (state) => {
                state.success = false;
                state.loading = true;
                state.error = false;
            })
            .addCase(removeCartLine.rejected, (state, action) => {
                state.success = false;
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(removeCartLine.fulfilled, (state, action) => {
                state.success = true;
                state.loading = false;
                state.values = state.values.filter((cartLine) => cartLine.id !== action.payload);
                state.error = false;
            })
            .addCase(removeCartLines.pending, (state) => {
                state.success = false;
                state.loading = true;
                state.error = false;
            })
            .addCase(removeCartLines.rejected, (state, action) => {
                state.success = false;
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(removeCartLines.fulfilled, (state, action) => {
                state.success = true;
                state.loading = false;
                const cartIdsToRemove = action.payload;
                if (cartIdsToRemove.length === 0) {
                    state.values = state.values.filter((cartLine) => cartLine.isSelected);
                } else {
                    state.values = state.values.filter((cartLine) => !cartIdsToRemove.includes(cartLine.id));
                }
                state.error = false;
            })
            .addCase(addToCart.pending, (state) => {
                state.success = false;
                state.loading = true;
                state.error = false;
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.success = false;
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                const newCartLine = action.payload;
                const existingCartLineIndex = state.values.findIndex((cartLine) => cartLine.id === newCartLine.id);
                if (existingCartLineIndex !== -1) {
                    const updatedValues = state.values.map((cartLine, index) =>
                        index === existingCartLineIndex ? { ...cartLine, quantity: newCartLine.quantity } : cartLine,
                    );
                    return {
                        ...state,
                        success: true,
                        loading: false,
                        values: updatedValues,
                        error: false,
                    };
                } else {
                    return {
                        ...state,
                        success: true,
                        loading: false,
                        values: [...state.values, newCartLine],
                        error: false,
                    };
                }
            });
    },
});

export const { setLoadingCartLines, setErrorCartLines, setSuccessCartLines } = cartLineSlice.actions;

export const selectLoadingCartLines = (state) => state.cartLine.loading;
export const selectErrorCartLines = (state) => state.cartLine.error;
export const selectSuccessCartLines = (state) => state.cartLine.success;
export const selectCartLineList = (state) => state.cartLine.values;
export const selectCartLineDetail = (state) => state.cartLine.value;
export const selectCartLineAdded = (state) => state.cartLine.value;
export const selectCartLineEdited = (state) => state.cartLine.value;
export const selectCartLineRemoved = (state) => state.cartLine.value;

export const setLoadingTrueIfCalled = (isCalled) => (dispatch, getState) => {
    const currentValue = selectLoadingCartLines(getState());
    if (currentValue === isCalled) {
        dispatch(setLoadingCartLines(true));
    }
};

export default cartLineSlice.reducer;
