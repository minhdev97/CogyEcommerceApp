import axios from "axios";
import {CART_LINE_MANAGEMENT_API, CART_LINE_MANAGEMENT_API_ADD, CART_MANAGEMENT_API} from "../constant/api"
import {configToken} from "../util/tokenConfig";
import {getToken} from "../service/userService";

export const findCartLines = async (cartId) => {
    let result = null;
    try {
        result = await axios.get(`${CART_MANAGEMENT_API}/${cartId}`, configToken(getToken()));
    } catch (e) {
        console.log('ERROR: ' + e);
    }
    return result;
};

export const findCartLine = async (cartLineId) => {
    let result = null;
    try {
        result = await axios.get(`${CART_LINE_MANAGEMENT_API}/${cartLineId}`, configToken(getToken()));
    } catch (e) {
        console.log("ERROR: " + e);
    }
    return result;
};

export const createCartLine = async (cartLine) => {
    let result = null;
    try {
        result = await axios.post(`${CART_LINE_MANAGEMENT_API}`, cartLine, configToken(getToken()));
    } catch (e) {
        console.log("ERROR: " + e);
    }
    return result;
};

export const addNewCartLine = async (cartLine) => {
    let result = null;
    try {
        result = await axios.post(`${CART_LINE_MANAGEMENT_API_ADD}`, cartLine, configToken(getToken()));
    } catch (e) {
        console.log('ERROR: ' + e);
    }
    return result;
};

export const updateCartLine = async (cartLine) => {
    let result = null;
    console.log(cartLine.id)
    try {
        console.log(`${CART_LINE_MANAGEMENT_API}/${cartLine.id}`)
        result = await axios.put(`${CART_LINE_MANAGEMENT_API}/${cartLine.id}`, {quantity: cartLine.quantity}, configToken(getToken()));
    } catch (e) {
        console.log("ERROR: " + e);
    }
    return result;
};

export const deleteCartLine = async (cartLineId) => {
    let result = null;
    try {
        result = await axios.delete(`${CART_LINE_MANAGEMENT_API}/${cartLineId}`, configToken(getToken()));
    } catch (e) {
        console.log("ERROR: " + e);
    }
    return result;
};

export const deleteSelectedCartLines = async (cartLineIds) => {
    let result = null;
    try {
        const cartLineIdsParam = cartLineIds.join(',');
        result = await axios.delete(`${CART_LINE_MANAGEMENT_API}/selected/${cartLineIdsParam}`, configToken(getToken()));
    } catch (e) {
        console.log("ERROR: ", e);
    }
    return result;
};

export const reduceStock = async (cartLineIds) => {
    console.log(cartLineIds);
    let result = null;
    try {
        await axios.post(`${CART_LINE_MANAGEMENT_API}/checkout`, {cartLineIds: cartLineIds}, configToken(getToken()));
        console.log(result);
    } catch (e) {
        console.log("ERROR: " + e);
    }
    return result;
};

export const getListStockOfVariantByCartLineIds = async (cartLineIds) => {
    let result = null;
    try {
        const cartLineIdsParam = cartLineIds.join(',');
        result = await axios.get(`${CART_LINE_MANAGEMENT_API}/stock/${cartLineIdsParam}`, configToken(getToken()));
        result = result.data.stocks;
    } catch (e) {
        console.log("ERROR: getListStockOfVariantByCartLineIds");
        console.log(e);
    }
    return result;
};



