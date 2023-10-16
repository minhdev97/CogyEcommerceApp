import React from 'react';
import Sidebar from "../../component/product/SideBar/Sidebar";
import {useSearchParams} from "react-router-dom";
import Footer from "../../component/product/Footer";
const Search = () => {
    const [searchParams,setSearchParams] = useSearchParams();
    const page = Number(searchParams.get('pageNumber'));
    const search = searchParams.get('keyword');
    const sort = searchParams.get('sort');
    const direction = searchParams.get('sortBy');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const param = {
        search: search,
        minPrice: minPrice,
        maxPrice: maxPrice,
        direction: direction,
        sort: sort,
        page: page,
    };
    return (
        <div style={{marginTop: 100, paddingTop: 50, marginLeft: 50, width: 1200}}>
            <Sidebar param={param} />
            <Footer/>
        </div>
    );
};

export default Search;