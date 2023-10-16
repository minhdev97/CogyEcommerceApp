import React, {useEffect} from 'react';
import {useLocation} from "react-router-dom";
import SimpleHeader from "../../../component/Layout/component/SimpleHeader";
import CogyFooter from "../../../component/Layout/component/CogyFooter";

const SimpleLayout = ({children}) => {
    const location = useLocation();
    useEffect(() => {
        document.querySelector("html").style.fontSize = "100%";
        return () => {
            document.querySelector("html").style.fontSize = "62.5%";
        }
    }, [location]);


    return (
        <>
            <SimpleHeader />
            <div className=" d-flex justify-content-center gradient-form">
                <div className="col-lg-8 col-md-10 col-sm-12">{children}</div>
            </div>

            <CogyFooter />
        </>
    );
};

export default SimpleLayout;