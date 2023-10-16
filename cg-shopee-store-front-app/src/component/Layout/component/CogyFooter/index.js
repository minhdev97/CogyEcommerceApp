import React, {useEffect} from "react";
import { MDBContainer, MDBFooter } from "mdb-react-ui-kit";
import {WEBSITE_CODE_GYM} from "../../../../constant/link";
import {useLocation} from "react-router-dom";

const CogyFooter = () => {
    const location = useLocation();
    useEffect(() => {
        document.querySelector("html").style.fontSize = "100%";
        document.querySelector('body').style.fontSize = '1rem';
        return () => {
            document.querySelector("html").style.fontSize = "62.5%";
        }
    }, [location]);
    return (
        <MDBFooter color="white" className="font-small mt-4">
            <div className="footer-copyright text-center text-black h6">
                <MDBContainer>
                    &copy; {new Date().getFullYear()} Copyright: <a href={WEBSITE_CODE_GYM} target="_blank" rel="noopener noreferrer"> COGY TEAM </a>
                </MDBContainer>
            </div>
        </MDBFooter>
    );
}

export default CogyFooter;