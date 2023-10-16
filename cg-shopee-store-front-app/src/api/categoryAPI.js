import axios from "axios";
import {CATEGORY_BO_API, PUBLIC_CATEGORY_API} from "../constant/api";


export const findAllCategories = async () => {
    let result = null;
    try {
        result = await axios.get(PUBLIC_CATEGORY_API);
    } catch (e) {
        console.log("Find categories API error: " + e);
    }
    return result;
};

export const findAllCategoriesWithSubCategories = async () => {
    let result = null;
    try {
        result = await axios.get(CATEGORY_BO_API);
    } catch (e) {
        console.log("Find categories with subCategories API error: " + e);
    }
    return result;
};

export const findCategoryById = async (categoryId) => {
    let result = null;
    try {
        result = await axios.get(`${PUBLIC_CATEGORY_API}/${categoryId}`);
    } catch (e) {
        console.log("Find subCategory API error: " + e);
    }
    return result;
}
