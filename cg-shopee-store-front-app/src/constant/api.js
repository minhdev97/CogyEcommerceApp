export const API = "https://cogy-ecommerce-service-f7583ca5f974.herokuapp.com/api";

export const PUBLIC_PRODUCT_API = API + '/products';

export const AUTH_PRODUCT_API = API + '/auth/products';

export const PUBLIC_CATEGORY_API = API + '/categories';
export const PUBLIC_HOME_SUB_CATEGORY_API = API + '/sub-categories';
export const CART_LINE_MANAGEMENT_API = API + '/cart-lines';

export const CART_LINE_MANAGEMENT_API_ADD = API + '/cart-lines/new-cartline';

export const PUBLIC_SUB_CATEGORY_API = API + "/sub-categories/categories";

export const AUTH_VARIANT_API = API + '/auth/variants';

export const SELLER_API = API + '/sellers';

export const VOUCHER_API = API + '/vouchers';

export const CART_MANAGEMENT_API = API + '/carts';

export const USER_MANAGEMENT_API = API + "/users";

export const CATEGORY_BO_API = API + "/categories/bo";

export const MAIL_API = API + "/mails";

export const PROVINCES_API = "https://provinces.open-api.vn/api/";

export const CONFIRM_REGISTRATION = API + "/confirm-registration";

export const districtsApi = (provinceId) => (`${PROVINCES_API}p/${provinceId}?depth=2`);

export const wardsApi = (districtId) => (`${PROVINCES_API}d/${districtId}?depth=2`);

export const ORDER_API = API + "/orders";

export const SELLER_LOCATION_API = API + "/seller-location";

export const LOGIN_API = API + "/login";

export const REGISTER_API = API + "/register";

export const RESET_PASSWORD_API = API + "/reset";

export const CONFIRM_EMAIL_API = API + "/confirm-email";









