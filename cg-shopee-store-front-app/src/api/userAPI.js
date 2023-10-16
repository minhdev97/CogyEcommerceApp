import axios from "axios";
import {USER_MANAGEMENT_API} from "../constant/api"
import {configToken} from "../util/tokenConfig";
import {getToken, getUserId} from "../service/userService";

export const findProfile = async () => {
    let result = null;
    try {
        result = await axios.get(`${USER_MANAGEMENT_API}/${getUserId()}/profiles`, configToken(getToken()));
        result = result.data;
    } catch (e) {
        console.log("ERROR: " + e);
    }
    return result;
};


export const updateProfile = async (profile) => {
    let result = null;
    try {
        result = await axios.put(`${USER_MANAGEMENT_API}/${profile.id}/profiles`, profile, configToken(getToken()));
        console.log(result)
        result = result.data;
        console.log(result)
    } catch (e) {
        console.log("ERROR: " + e);
    }
    return result;
};


export const saveUserLocation = async (location) => {
    let result = null;
    try {
        result = await axios.post(`${USER_MANAGEMENT_API}/${getUserId()}/locations`, location, configToken(getToken()));
        result = result.data;
    } catch (e) {
        console.log("API saveUserLocation error: ");
        console.log(e);
    }
    return result;
}
