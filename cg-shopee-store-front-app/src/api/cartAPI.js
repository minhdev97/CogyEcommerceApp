import axios from "axios";
import { CART_MANAGEMENT_API } from "../constant/api";

export const findCartById = async (id) => {
    let result = null;
    try {
        result = await axios.get(`${CART_MANAGEMENT_API}/${id}`);
    } catch (e) {
        console.log('API Find cart by Id error: ' + e);
    }
    return result;
};

