import React from 'react';
import {useSelector} from "react-redux";

import {
    MDBCol,
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand
} from 'mdb-react-ui-kit';
import LogoCogy from "../../../../component/LogoCogy";
import {selectTitle} from "../../../../features/title/titleSlice";

const SimpleHeader = () => {

    const title = useSelector(selectTitle);

    return (
        <MDBNavbar className="cogy-bg">
            <MDBContainer>
                <MDBNavbarBrand className="w-25 d-flex justify-content-start">
                    <MDBCol start>
                        <LogoCogy width={150}/>
                    </MDBCol>
                    <MDBCol className="text-white" center>
                        {title}
                    </MDBCol>
                </MDBNavbarBrand>
            </MDBContainer>
        </MDBNavbar>
    );
};

export default SimpleHeader;