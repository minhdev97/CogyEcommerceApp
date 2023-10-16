import axios from "axios";
import {MAIL_API} from "../constant/api"
import {configToken} from "../util/tokenConfig";
import {getCartId, getToken} from "../service/userService";

export const sendMail = () => {
    try {
        axios.post(`${MAIL_API}/${getCartId()}`, configToken(getToken())).then();
    } catch (e) {
        console.log("ERROR: " + e);
    }
};