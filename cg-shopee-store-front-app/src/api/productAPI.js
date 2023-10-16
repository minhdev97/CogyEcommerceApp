import axios from "axios";
import {PUBLIC_PRODUCT_API, SELLER_API} from "../constant/api";
import {configToken} from "../util/tokenConfig";
import {getSellerId, getToken} from "../service/userService";

export const findBySellerId = async () => {
    let result = null;
    try {
        result = await axios.get(`${SELLER_API}/${getSellerId()}/products`, configToken(getToken()));
    } catch (e) {
        console.log("API Find products by sellerId error: ");
        console.log(e);
    }
    return result;
};


export const findByIdToEdit= async (id) => {
    let result = null;
    try {
        result = await axios.get(
            `${SELLER_API}/${getSellerId()}/products/${id}`,
            configToken(getToken())
        );
    } catch (e) {
        console.log("API Find product by Id to edit error: ");
        console.log(e);
    }
    return result;
};

export const addProduct = async (product) => {
    let result = null;
    try {
        result = await axios.post(
            `${SELLER_API}/${getSellerId()}/products`,
            product,
            configToken(getToken())
        );
    } catch (e) {
        console.log("API Create product error: ");
        console.log(e);
    }
    return result;
};

export const saveProduct = async (product) => {
    let result = null;
    try {
        result = await axios.put(
            `${SELLER_API}/${getSellerId()}/products`,
            product,
            configToken(getToken())
        );
    } catch (e) {
        console.log("API Update product error: ");
        console.log(e);
    }
    return result;
};

export const deleteProduct = async (id) => {
    let result = null;
    try {
        result = await axios.delete(
            `${SELLER_API}/${getSellerId()}/products/${id}`,
            configToken(getToken())
        );
    } catch (e) {
        console.log("Delete product API error: ");
        console.log(e);
    }
    return result;
};


export const getProductsByPageNumber = async (pageNumber) => {
    let result = null;
    try {
        result = await axios.get(`${PUBLIC_PRODUCT_API}?page=${pageNumber}`);
    } catch (e) {
        console.log('Error fetching data: ' + e);
    }
    return result;
}

export const getProductsBySubCategoryList = async (subCategoryList) => {
    let result = null;
    try {
        result = await axios.get(`${PUBLIC_PRODUCT_API}/subCategories/list`, subCategoryList);
    } catch (e) {
        console.log('Error fetching data: ' + e);
    }
    return result;
}

export const get20SuggestProduct = async () => {
    let result = null;
    try {
        result = await axios.get(`${PUBLIC_PRODUCT_API}/top-suggest`);
    } catch (e) {
        console.log('Error fetching data: ' + e);
    }
    return result;
}
