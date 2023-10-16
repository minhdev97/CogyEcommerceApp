import Header from "../../../component/Layout/component/Header";
import React from 'react';

const DefaultLayout = ({children}) => {
    return (
        <div className={'app'}>
            <Header />
            <div className={'container'}>
                <div className={'content'}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default DefaultLayout;
