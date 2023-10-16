import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {MDBCol, MDBContainer, MDBRow} from "mdb-react-ui-kit";

import {setTitle} from "../../features/title/titleSlice";
import LogoCogy from "../../component/LogoCogy";
import "../../asset/css/other/registerSeller.css";
import "../../asset/css/auther/LoginUser.css";
import "../../asset/scss/_image-uploader.scss";
import {getSellerId, getUser} from "../../service/userService";
import {useNavigate} from "react-router-dom";
import {LOGIN_PAGE, PRODUCT_MANAGEMENT_PAGE, REGISTER_SELLER_PAGE} from "../../constant/page";
import {setHistory} from "../../features/history/historySlice";
import SellerForm from "../../component/SellerForm";

const RegisterSeller = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();


    useEffect(() => {
        dispatch(setHistory(REGISTER_SELLER_PAGE));
        if (!getUser()) {
            navigate(LOGIN_PAGE);
        } else if (getSellerId()) {
            navigate(PRODUCT_MANAGEMENT_PAGE);
        }
        dispatch(setTitle("Register become a Cogy seller"));
    }, []);
    
    return (
        <MDBContainer className="mt-5 gradient-form mb-0 min-height">
            <MDBRow className="min-height">
                
                <MDBCol className="mb-0 col-md-6 col-sm-12">
                    <SellerForm  />
                </MDBCol>

                <MDBCol className="mb-5 col-md-6 col-sm-12 col-12 ">
                    <div className="d-flex flex-column justify-content-center gradient-custom-2 h-100 mb-4">
                        <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                            <div className="text-center">
                                <div className="mt-2">
                                    <LogoCogy widthInput={'295'}/>
                                </div>
                                <h4 className="mt-3 mb-2 pb-1 text-white">
                                    Become a Cogy seller to reach billions of customers worldwide.
                                </h4>
                            </div>
                        </div>
                    </div>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
};

export default RegisterSeller;