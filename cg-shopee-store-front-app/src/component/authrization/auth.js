import axios from 'axios';
import {LOGIN_API, REGISTER_API} from "../../constant/api";

export const login = async (username, password) => {
    try {
        const response = await axios.post(LOGIN_API, { username, password });
        localStorage.setItem('user', JSON.stringify(response.data));
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};

export const register = async (fullName, username, email, password, phone) => {
    try {
        const response = await axios.post(REGISTER_API, {
            fullName,
            username,
            email,
            password,
            phone,
        });
        localStorage.setItem('user', JSON.stringify(response.data));
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};
