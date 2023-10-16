import axios from "axios";
import {PUBLIC_SUB_CATEGORY_API, PUBLIC_PRODUCT_API , PUBLIC_HOME_SUB_CATEGORY_API} from "../constant/api";


export const findSubCategoriesByCategoryId = async (id) => {
    let result = null;
    try {
        result = await axios.get(`${PUBLIC_SUB_CATEGORY_API}/${id}/list`);
    } catch (e) {
        console.log("Find sub categories API error: " + e);
    }
    return result?.data;
};

export const findTop10ViewRelatedProducts = async (productId) => {
    let result = null;
    try {
        result = await axios.get(`${PUBLIC_PRODUCT_API}/${productId}/related-products`);
    } catch (e) {
        console.log('Find related products API error: ' + e);
    }
    return result;
};

export const find5RandomSubCategories = async () => {
    let result = null;
    try {
        result = await  axios.get(`${PUBLIC_HOME_SUB_CATEGORY_API}`);
    } catch (e) {
        console.log('Find related products API error: ' + e);
    }
    return result;
}