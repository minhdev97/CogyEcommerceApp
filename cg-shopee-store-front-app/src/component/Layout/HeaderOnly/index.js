import Header from "../../../component/Layout/component/Header";
import React from 'react';
import "../../../asset/css/main/main.css";

const HeaderOnlyLayout = ({children}) => {
    return (
        <div>
            <Header/>
            <div className={'container'}>
                <div className={'content'}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default HeaderOnlyLayout;
