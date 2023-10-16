//Layouts

import {HeaderOnly, SimpleLayout} from '../component/Layout';
import {ShopManagement} from '../component/Layout';
//pages
import Home from '../pages/Home';
import Category from '../pages/Category';
import Profile from '../pages/Profile';
import Cart from '../pages/Cart';
import Search from '../pages/Search';
import ProductManagement from '../pages/ProductManagement';
import DailyDiscover from '../pages/SuggestList';
import ProductDetailPage from '../pages/ProductDetail';
import Checkout from "../pages/Checkout";
import RegisterSeller from "../pages/RegisterSeller";
import LoginPage from '../pages/Login/LoginPage';
import RegisterPage from '../pages/Register/RegisterPage';
import OrderConfirmation from "../pages/OrderConfirmation";

import {
    CART_PAGE,
    CATEGORY_PAGE,
    CHECKOUT_PAGE,
    CREATE_VOUCHER_PAGE,
    DAILY_DISCOVER_PAGE,
    EMAIL_COFIRM_FORM,
    EMAIL_SUBSCRIPTION_SUCCESSS_PAGE,
    HOME_PAGE,
    LOGIN_PAGE,
    ORDER_CONFIRMATION_PAGE, ORDER_SELLER_MANAGEMENT_PAGE, ORDER_USER_HISTORY_PAGE,
    PRODUCT_DETAIL_PAGE,
    PRODUCT_MANAGEMENT_PAGE,
    PROFILE_PAGE,
    REGISTER_SELLER_PAGE,
    REGISTER_USER_PAGE,
    RESET_PASSWORD_FORM,
    SEARCH_PAGE
} from "../constant/page";
import VoucherPage from '../pages/Voucher';
import EmailSubscriptionSuccess from '../component/subscription/email-subscription-success';
import OrderSellerManagement from "../pages/OrderSellerManagement";
import ConfirmEmailForm from '../component/Confirm/ConfirmEmailForm';
import ResetPasswordForm from '../component/Confirm/ResetPasswordForm';
import OrderUserHistory from "../pages/OrderUserHistory";

const publicRoutes = [
    { path: `${HOME_PAGE}`, component: Home, layout: HeaderOnly },
    { path: `${CATEGORY_PAGE}/*`, component: Category, layout: HeaderOnly },
    { path: `${CART_PAGE}`, component: Cart, layout: null },
    { path: `${SEARCH_PAGE}`, component: Search, layout: HeaderOnly },
    { path: `${LOGIN_PAGE}`, component: LoginPage, layout: SimpleLayout },
    { path: `${DAILY_DISCOVER_PAGE}`, component: DailyDiscover, layout: HeaderOnly },
    { path: `${REGISTER_USER_PAGE}`, component: RegisterPage, layout: SimpleLayout },
    { path: `${PRODUCT_DETAIL_PAGE}/:id`, component: ProductDetailPage, layout: null },
    { path: `${CHECKOUT_PAGE}`, component: Checkout, layout: null },
    { path: `${PROFILE_PAGE}`, component: Profile, layout: HeaderOnly },
    { path: `${ORDER_CONFIRMATION_PAGE}`, component: OrderConfirmation, layout: HeaderOnly },
    { path: `${EMAIL_SUBSCRIPTION_SUCCESSS_PAGE}`, component : EmailSubscriptionSuccess, layout : HeaderOnly },
    { path: `${EMAIL_COFIRM_FORM}`, component: ConfirmEmailForm, layout:SimpleLayout},
    { path: `${RESET_PASSWORD_FORM}`, component : ResetPasswordForm,layout:SimpleLayout}, 
    
];
const privateRoutes = [
    { path: `${REGISTER_SELLER_PAGE}`, component: RegisterSeller, layout: SimpleLayout },
    { path: `${PRODUCT_MANAGEMENT_PAGE}`, component: ProductManagement, layout: ShopManagement },
    { path: `${CREATE_VOUCHER_PAGE}`, component: VoucherPage, layout: ShopManagement },
    { path: `${ORDER_SELLER_MANAGEMENT_PAGE}*`, component: OrderSellerManagement, layout: ShopManagement },
    { path: `${ORDER_USER_HISTORY_PAGE}`, component: OrderUserHistory, layout: null}
];


export { publicRoutes, privateRoutes };
