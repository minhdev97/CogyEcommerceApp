import axios from 'axios';
import { PUBLIC_PRODUCT_API, SELLER_API } from '../constant/api';
import { configToken } from '../util/tokenConfig';
import {getSellerId, getToken} from "../service/userService";

export const findProductsBySellerId = async (sellerId) => {
    let result = null;
    try {
        result = await axios.get(`${PUBLIC_PRODUCT_API}/sellers/${sellerId}`, configToken(getToken()));
    } catch (error) {
        console.log('Error finding products by seller id:', error);
    }
    return result;
};

export const findVouchersBySellerId = async () => {
    let result = null;
    try {
        result = await axios.get(`${SELLER_API}/${getSellerId()}/vouchers`, configToken(getToken()));
    } catch (error) {
        console.log('Error finding products by seller id:', error);
    }
    return result;
};

export const findVouchersByStatus = async (sellerId, statusId, token) => {
    let result = null;
    try {
        result = await axios.get(SELLER_API + `/${sellerId}/vouchers/status/${statusId}`, configToken(token));
        console.log(result.data);
    } catch (e) {
        console.log('API Find vouchers by status error: ' + e);
    }
    return result;
};

export const findVoucherById = async (sellerId, voucherId, token) => {
    let result = null;
    try {
        result = await axios.get(SELLER_API + `/${sellerId}/vouchers/${voucherId}`, configToken(token));
        console.log(result.data);
    } catch (e) {
        console.log('API Find vouchers by Id error: ' + e);
    }
    return result;
};

export const createNewVoucher = async ( sellerId, createVoucherRequestDTO, token ) => {
    let result = null;
    try {
        result = await axios.post(SELLER_API + `/${sellerId}/vouchers`, createVoucherRequestDTO, configToken(token));
        console.log(result.data);
    } catch (e) {
        console.log('API create vouchers error: ' + e);
    }
    return result;
};

export const editVoucher = async ( sellerId, id, editVoucherRequestDTO, token ) => {
    let result = null;
    try {
        result = await axios.put(SELLER_API + `/${sellerId}/vouchers/${id}`, editVoucherRequestDTO, configToken(token));
        console.log(result.data);
    } catch (e) {
        console.log('API create vouchers error: ' + e);
    }
    return result;
};


export const removeVoucher = async ( sellerId, id, token ) => {
    let result = null;
    try {
        result = axios.delete(SELLER_API + `/${sellerId}/vouchers/${id}`, configToken(token));
        console.log(result.data);
    } catch (e) {
        console.log('API create vouchers error: ' + e);
    }
    return result;
};
