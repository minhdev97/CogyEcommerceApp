import React, {useEffect, useState} from 'react';
import IndicatorsDemo from "../../component/product/Indicators/Indicators";
import '../../asset/css/main/base.css';
import "../../asset/css/main/grid.css";
import "../../asset/css/main/main.css";
import "../../asset/css/normalize.min.css";
import "../../asset/css/main/responsive.css";
import "../../asset/font/fontawesome-free-6.1.1/css/all.min.css";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import Footer from "../../component/product/Footer";
import Sidebar from "../../component/product/SideBar/Sidebar";
import {useLocation, useSearchParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {
    getCategory,
    selectCategoryDetail,
    selectSuccessCategories,
    setSuccessCategories
} from "../../features/category/categorySlice";

const Category = () => {
    const location = useLocation();
    const pathSegments = location.pathname.split(".");
    let categoryId = null;
    let subCategoryId = null;
    if (pathSegments.length >= 2) {
        categoryId = pathSegments[1]; // Lấy phần tử thứ hai là categoryId
        subCategoryId = pathSegments[2]; // Lấy phần tử thứ ba là subCategoryId
    }
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();
    const categoryDetail = useSelector(selectCategoryDetail);
    const success = useSelector(selectSuccessCategories);
    const [category,setCategory] = useState(null);
    const page = Number(searchParams.get('pageNumber'));
    const sort = searchParams.get('sort');
    const direction = searchParams.get('sortBy');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');

    const findCategory = (categoryId) => {
        const findCategory = async () => {
            !success && await dispatch(getCategory(categoryId));
        };
        findCategory().then(()=> {
            success && setCategory(categoryDetail);
        })
    }
    useEffect(() => {
        findCategory(categoryId);
        return () => {
            dispatch(setSuccessCategories(false));
        }
    },[categoryDetail]);

    const param = {
        id: categoryId,
        minPrice: minPrice,
        maxPrice: maxPrice,
        direction: direction,
        sort: sort,
        subCategoryId: subCategoryId,
        page: page,
    };
    return (
        <div style={{marginTop: 100, paddingTop: 50, marginLeft: 50, width: 1200}}>
            <div style={{paddingBottom: 20}}>
                <IndicatorsDemo props={1200}/>
            </div>
            <Sidebar param={param} />
            <Footer/>
        </div>
    );
};

export default Category;
