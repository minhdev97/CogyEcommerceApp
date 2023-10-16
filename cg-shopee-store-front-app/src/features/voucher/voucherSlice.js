import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
    createNewVoucher,
    editVoucher,
    findVoucherById,
    findVouchersBySellerId,
    findVouchersByStatus,
    removeVoucher,
} from '../../api/voucherAPI';

const initialState = {
    values: null,
    value: null,
    loading: false,
    error: null,
    success: false,
};

export const fetchVouchersBySellerId = createAsyncThunk('vouchers/fetchBySellerId', async () => {
    const response = await findVouchersBySellerId();
    return response.data;
});

export const fetchVouchersByStatus = createAsyncThunk(
    'vouchers/fetchByStatus',
    async ({ sellerId, statusId, token }) => {
        const response = await findVouchersByStatus(sellerId, statusId, token);
        return response.data;
    },
);

export const fetchVoucherById = createAsyncThunk('vouchers/fetchById', async (sellerId, voucherId, token) => {
    const response = await findVoucherById(sellerId, voucherId, token);
    return response.data;
});

export const createVoucher = createAsyncThunk(
    'vouchers/create',
    async ({ sellerId, createVoucherRequestDTO, token }) => {
        const response = await createNewVoucher(sellerId, createVoucherRequestDTO, token);
        return response.data;
    },
);

export const updateVoucher = createAsyncThunk(
    'vouchers/update',
    async ({ sellerId, id, editVoucherRequestDTO, token }) => {
        const response = await editVoucher(sellerId, id, editVoucherRequestDTO, token);
        return response.data;
    },
);

export const deleteVoucher = createAsyncThunk('vouchers/delete', async ({ sellerId, id, token }) => {
    const response = await removeVoucher(sellerId, id, token);
    return response.data;
});

const voucherSlice = createSlice({
    name: 'voucher',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        setSuccess: (state, action) => {
            state.success = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchVouchersBySellerId.pending, (state) => {
                state.success = false;
                state.loading = true;
                state.error = false;
            })
            .addCase(fetchVouchersBySellerId.fulfilled, (state, action) => {
                state.success = true;
                state.loading = false;
                state.values = action.payload;
                state.error = false;
            })
            .addCase(fetchVouchersBySellerId.rejected, (state, action) => {
                state.success = false;
                state.loading = false;
                state.error = action.error;
            })
            .addCase(fetchVouchersByStatus.pending, (state) => {
                state.success = false;
                state.loading = true;
                state.error = false;
            })
            .addCase(fetchVouchersByStatus.fulfilled, (state, action) => {
                state.success = true;
                state.loading = false;
                state.values = action.payload;
                state.error = false;
            })
            .addCase(fetchVouchersByStatus.rejected, (state, action) => {
                state.success = false;
                state.loading = false;
                state.error = action.error;
            })
            .addCase(fetchVoucherById.pending, (state) => {
                state.success = false;
                state.loading = true;
                state.error = false;
            })
            .addCase(fetchVoucherById.fulfilled, (state, action) => {
                state.success = true;
                state.loading = false;
                state.value = action.payload;
                state.error = false;
            })
            .addCase(fetchVoucherById.rejected, (state, action) => {
                state.success = false;
                state.loading = false;
                state.error = action.error;
            })
            .addCase(createVoucher.pending, (state) => {
                state.success = false;
                state.loading = true;
                state.error = false;
            })
            .addCase(createVoucher.fulfilled, (state, action) => {
                state.success = true;
                state.loading = false;
                state.value = action.payload;
                state.error = false;
                state.values.push(action.payload);
            })
            .addCase(createVoucher.rejected, (state, action) => {
                state.success = false;
                state.loading = false;
                state.error = action.error;
            })
            .addCase(updateVoucher.pending, (state) => {
                state.success = false;
                state.loading = true;
                state.error = false;
            })
            .addCase(updateVoucher.fulfilled, (state, action) => {
                state.success = true;
                state.loading = false;
                state.value = action.payload;
                state.error = false;
                state.values = state.values.map((voucher) =>
                    voucher.id === action.payload.id ? action.payload : voucher,
                );
            })
            .addCase(updateVoucher.rejected, (state, action) => {
                state.success = false;
                state.loading = false;
                state.error = action.error;
            })
            .addCase(deleteVoucher.pending, (state) => {
                state.success = false;
                state.loading = true;
                state.error = false;
            })
            .addCase(deleteVoucher.fulfilled, (state, action) => {
                state.success = true;
                state.loading = false;
                state.value = action.payload;
                state.error = false;
                state.values = state.values.filter((voucher) => voucher.id !== action.payload);
            })
            .addCase(deleteVoucher.rejected, (state, action) => {
                state.success = false;
                state.loading = false;
                state.error = action.error;
            });
    },
});
export const { setLoading, setError, setSuccess } = voucherSlice.actions;
export const voucher = (state) => state.voucher.value;
export const voucherListSelector = (state) => state.voucher.values;
export const selectLoading = (state) => state.voucher.loading;
export const selectError = (state) => state.voucher.error;
export const selectSuccess = (state) => state.voucher.success;
export default voucherSlice.reducer;
