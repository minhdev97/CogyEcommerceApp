import React from 'react';
import DailyDiscover from "../../component/product/DailyDiscover/DailyDiscover";
import Pagination from "../../component/product/Pagination/Pagination";

const DailyDiscoverPage = () => {
    return (
        <div style={{display: 'block', marginTop: 150}}>
            <DailyDiscover/>
            <Pagination/>
        </div>
    );
};

export default DailyDiscoverPage;
