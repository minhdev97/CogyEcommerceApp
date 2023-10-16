import axios from "axios";
import { SELLER_LOCATION_API } from "../constant/api";

export const findAllSellerLocations = async () => {
    let result = null;
    try {
        result = await axios.get(SELLER_LOCATION_API);
        console.log(result.data);
    } catch (e) {
        console.log('API Find cart by Id error: ' + e);
    }
    return result;
};

