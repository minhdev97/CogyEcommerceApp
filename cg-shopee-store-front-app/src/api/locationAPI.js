import axios from "axios";
import {districtsApi, PROVINCES_API, SELLER_API, USER_MANAGEMENT_API, wardsApi} from "../constant/api";
import {getSellerId, getToken, getUserId} from "../service/userService";
import {configToken} from "../util/tokenConfig";

export const fetchProvinces = async () => {
    let result = [];
    try {
        result = await axios.get(PROVINCES_API);
        result = result.data;
    } catch (e) {
        console.log("API fetch Provinces error: ");
        console.log(e);
    }
    return result;
}


export const fetchDistricts = async (provinceId) => {
    let result = [];
    try {
        result = await axios.get(districtsApi(provinceId));
        result = result.data.districts;
    } catch (e) {
        console.log("API fetch Districts error: ");
        console.log(e);
    }
    return result;
}


export const fetchWards = async (districtId) => {
    let result = [];
    try {
        result = await axios.get(wardsApi(districtId));
        result = result.data.wards;
    } catch (e) {
        console.log("API fetch Wards error: ");
        console.log(e);
    }
    return result;
}

export const fetchSellerLocations = async () => {
    let result = [];
    try {
        result = await axios.get(`${SELLER_API}/${getSellerId()}/seller-locations`, configToken(getToken()));
        result = result.data.locations;
        console.log(result)
    } catch (e) {
        console.log("API fetchSellerLocations error: ");
        console.log(e);
    }
    return result;
}

export const fetchUserLocations = async () => {
    let result = [];
    try {
        result = await axios.get(`${USER_MANAGEMENT_API}/${getUserId()}/locations`, configToken(getToken()));
        result = result.data.locations;
        console.log(result)
    } catch (e) {
        console.log("API fetchUserLocations error: ");
        console.log(e);
    }
    return result;
}
