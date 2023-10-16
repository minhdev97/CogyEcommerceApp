import axios from "axios";
import {API, USER_MANAGEMENT_API} from "../constant/api";
import {getToken, getUserId} from "../service/userService";
import {configToken} from "../util/tokenConfig";

export const createSeller = async (seller) => {
    let result = null;
    try {
        result = await axios.post(
            `${USER_MANAGEMENT_API}/${getUserId()}/sellers`,
            seller,
            configToken(getToken())
        );
        result = result.data;
    } catch (e) {
        console.log("API create seller error: ");
        console.log(e);
    }
    return result;
};

export const isExistNameOfSeller = async (name) => {
    let result = true;
    try {
        result = await axios.get(`${API}/sellers/names/${name}`, configToken(getToken()));
        result = result.data.result;
    } catch (e) {
        console.log("API check name seller error: ");
        console.log(e);
    }
    return result;
}