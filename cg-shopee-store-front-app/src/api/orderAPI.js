import axios from "axios";
import {API, ORDER_API, SELLER_API, USER_MANAGEMENT_API} from "../constant/api";
import {getSellerId, getToken, getUserId} from "../service/userService";
import {configToken} from "../util/tokenConfig";

export const findOrdersBySellerId = async (status) => {
    let result = null;
    try {
        let apiUrl = `${SELLER_API}/${getSellerId()}/orders`;
        if (status !== "all") {
            apiUrl += `?status=${status}`;
        }

        result = await axios.get(apiUrl, configToken(getToken()));
        result = result.data.orderList;
    } catch (e) {
        console.log("API Find orders by sellerId error: ");
        console.log(e);
    }
    return result;
}

export const findOrdersByUserId = async (status) => {
    let result = null;
    try {
        let apiUrl = `${USER_MANAGEMENT_API}/${getUserId()}/orders`;
        if (status !== "all") {
            apiUrl += `?status=${status}`;
        }
        result = await axios.get(apiUrl, configToken(getToken()));
        result = result.data.orderList;
    } catch (e) {
        console.log("API Find orders by UserId error: ");
        console.log(e);
    }
    return result;
}

export const saveOrder = async (order) => {
    let result = null;
    try {
        result = await axios.post(`${ORDER_API}`, order, configToken(getToken()));
    } catch (e) {
        console.log('ERROR: ' + e);
    }
    return result;
};

export const postOrderToDeliveryService = async (requestBody) => {
    let result = null;
    try {
        result = await axios.put(`${SELLER_API}/${getSellerId()}/orders`, requestBody, configToken(getToken()));
        result = result.data;
    } catch (e) {
        console.log("API postOrderToDeliveryService error: ")
        console.log(e);
    }
    return result;
}

export const getShippingFeeOfGHTKDeliveryService = async (listRequest) => {
    let result = null;
    try {
        result = await axios.post(`${API}/shipping-fee`, {listRequest}, configToken(getToken()));
        result = result.data.listResponse;
    } catch (e) {
        console.log("API getShippingFeeOfGHTKDeliveryService error: ")
        console.log(e);
    }
    return result;
}