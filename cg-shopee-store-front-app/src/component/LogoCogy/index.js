import React, {useEffect, useState} from 'react';
import logo from "../../asset/img/logo COGY - 1.png";
import logoBlue from "../../asset/img/LOGO COGY.png";
import {Link} from "react-router-dom";
import {HOME_PAGE} from "../../constant/page";


const LogoCogy = ({ widthInput, isBlue }) => {

    const [width, setWidth] = useState(widthInput || 150);


    useEffect(() => {
        if (widthInput) {
            setWidth(widthInput);
        }
    }, [widthInput]);

    return (
        <Link to={HOME_PAGE}>
            <img src={isBlue ? logoBlue : logo} alt="COGY LOGO" style={{ width: `${width}px` }} />
        </Link>

    );
};

export default LogoCogy;
