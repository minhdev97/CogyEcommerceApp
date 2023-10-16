import axios from 'axios';
import { API } from '../constant/api';

const API_BASE_URL = `${API}`;
const apiClient = axios.create({
    baseURL: API_BASE_URL,
});

export default apiClient;
