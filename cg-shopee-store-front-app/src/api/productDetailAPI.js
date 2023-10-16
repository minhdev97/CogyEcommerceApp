import axios from 'axios';
import { PUBLIC_PRODUCT_API } from '../constant/api';

export const findProductDetailById = async (id) => {
    let result = null;
    try {
        result = await axios.get(`${PUBLIC_PRODUCT_API}/${id}`);
    } catch (e) {
        console.log('API Find product by Id error: ' + e);
    }
    return result;
};

// export default getRecommendationProduct = async () => {
    
// }