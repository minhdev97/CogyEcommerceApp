import {applyMiddleware, compose, configureStore} from '@reduxjs/toolkit';
import categoryReducer from "../features/category/categorySlice";
import productManagementReducer from '../features/product/productManagementSlice';
import cartLineReducer from '../features/cartLine/cartLineSlice';
import categoryModifyReducer from '../features/category/categoryModifySlice';
import productReducer from "../features/product/homeProductSlice";
import titleSliceReducer from "../features/title/titleSlice";
import historySliceReducer from "../features/history/historySlice";
import voucherSliceReducer from "../features/voucher/voucherSlice";
import subCategoryReducer from "../features/subcategory/subCategorySlice";
import sellerLocationReducer from "../features/seller-location/sellerLocationSlice";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = configureStore({
    reducer: {
        category: categoryReducer,
        productManagement: productManagementReducer,
        cartLine: cartLineReducer,
        categoryModify: categoryModifyReducer,
        product: productReducer,
        title: titleSliceReducer,
        history: historySliceReducer,
        voucher: voucherSliceReducer,
        subCategory: subCategoryReducer,
        sellerLocation: sellerLocationReducer,
    },
},composeEnhancers(applyMiddleware()));
