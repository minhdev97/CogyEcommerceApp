import React, {useEffect} from 'react';

import '../../../asset/scss/shop-management.scss';
import Header from "./Header";
import Content from "./Content";
import Sidebar from "./Sidebar";
import {useLocation} from "react-router-dom";
import CogyFooter from "../../../component/Layout/component/CogyFooter";


const ShopManagementLayout = ({ breakpoint, children }) => {
    const location = useLocation();
    useEffect(() => {
        checkBreakpoint(breakpoint);
        document.querySelector("html").style.fontSize = "100%";
        return () => {
            document.querySelector("html").style.fontSize = "62.5%";
        }
    }, [breakpoint, location]);

    const handleContentClick = () => {
        if (
            isSidebarOpen() &&
            (breakpoint === 'xs' || breakpoint === 'sm' || breakpoint === 'md')
        ) {
            openSidebar('close');
        }
    };

    const checkBreakpoint = (breakpoint) => {
        switch (breakpoint) {
            case 'xs':
            case 'sm':
            case 'md':
                return openSidebar('close');

            case 'lg':
            case 'xl':
            default:
                return openSidebar('open');
        }
    };

    const openSidebar = (openOrClose) => {
        const sidebar = document.querySelector('.cr-sidebar');
        if (openOrClose === 'open') {
            sidebar.classList.add('cr-sidebar--open');
        } else {
            sidebar.classList.remove('cr-sidebar--open');
        }
    };

    const isSidebarOpen = () => {
        const sidebar = document.querySelector('.cr-sidebar');
        return sidebar.classList.contains('cr-sidebar--open');
    };

    return (
        <main className="cr-app bg-light">
            <Sidebar />
            <Content fluid onClick={handleContentClick}>
                <Header />
                {children}
                <CogyFooter />
            </Content>
        </main>
    );
};


export default ShopManagementLayout;
