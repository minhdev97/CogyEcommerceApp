import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import LogoCogy from "../../../component/LogoCogy";
import CartLayout from "../../../component/Layout/component/CartLayout";
import {HOME_PAGE} from "../../../constant/page";
import {useDispatch, useSelector} from "react-redux";
import {
    get5RandomSubCategories,
    selectSubCategoryList,
    selectSuccessSubCategories, setSuccessSubCategories
} from "../../../features/subcategory/subCategorySlice";

const SearchBox = () => {
    const [searchInput,setSearchInput] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const success = useSelector(selectSuccessSubCategories);
    const subCategories = useSelector(selectSubCategoryList);
    const [randomSubCategoriesList,setRandomSubCategoriesList] = useState([]);
    const handleChange = (event) => {
        setSearchInput(event.target.value);
    }

    const fetchRandomSubCategories = () => {
        const fetchRandomSubCategories = async () => {
            !success && (await dispatch(get5RandomSubCategories()));
        }
        fetchRandomSubCategories().then(() => {
            success && setRandomSubCategoriesList(subCategories);
        })
    }
    useEffect(()=> {
        fetchRandomSubCategories();
    },[subCategories]);

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSubmit();
        }
    };
    const handleSubmit = () => {
        navigate(`/search?keyword=${searchInput}&pageNumber=1`);
        // setSearchInput('');
    }
    const handleButtonClick = () =>{
        handleSubmit();
    }
    return (
        <div>
            {/*Search*/}
            <div className="header-with-search">
                <label htmlFor="mobile-search-checkbox" className="header__mobile-search">
                    <i className="header__mobile-search-icon fa-solid fa-magnifying-glass"/>
                </label>
                <div className="header__logo hide-on-tablet">
                    <Link to={HOME_PAGE} className="header__logo-link">
                        <LogoCogy/>
                    </Link>
                </div>
                <input type="checkbox" hidden id="mobile-search-checkbox" className="mobile-search-checkbox"/>
                <div className="header__search">
                    <div className="header__search-input-wrap">
                        {/* Header search input */}
                        <input
                            type="text"
                            className="header__search-input"
                            placeholder="Type to search product"
                            value={searchInput}
                            onChange={handleChange}
                            onKeyPress={handleKeyPress}
                        />
                        {/* History search box */}
                        <div className="header__search-history">
                            <h3 className="header__search-history-heading">Lịch sử tìm kiếm</h3>
                            <ul className="header__search-history-list">
                                <li className="header__search-history-item">
                                    <a href="#">
                                        BẬT MÍ 5.5 - SĂN TRƯỚC MÃ 5.5
                                        <img
                                            src="https://cf.shopee.vn/file/491389dce9eabc3510a3e8a21cc40ef7"
                                            alt="Sale"
                                        />
                                    </a>
                                </li>
                                <li className="header__search-history-item">
                                    <a href="#">Kem trị mụn</a>
                                </li>
                                <li className="header__search-history-item">
                                    <a href="#">Iphone 13 Pro Max</a>
                                </li>
                                <li className="header__search-history-item">
                                    <a href="#">Máy tính xách tay</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    {/*<div className="header__search-select">*/}
                    {/*            <span className="header__search-select-label">*/}
                    {/*                Trong shop*/}
                    {/*                <i className="header__search-select-icon fa-solid fa-angle-down"/>*/}
                    {/*            </span>*/}
                    {/*    /!* Search option box *!/*/}
                    {/*    <ul className="header__search-option">*/}
                    {/*        <li className="header__search-option-item header__search-option-item--active">*/}
                    {/*            <span>By Shop</span>*/}
                    {/*            <i className="fa-solid fa-check"/>*/}
                    {/*        </li>*/}
                    {/*        <li className="header__search-option-item">*/}
                    {/*            <span>By Product</span>*/}
                    {/*            <i className="fa-solid fa-check"/>*/}
                    {/*        </li>*/}
                    {/*    </ul>*/}
                    {/*</div>*/}
                    <button type={"submit"} onClick={handleButtonClick} className="header__search-btn">
                        <i className="header__search-btn-icon fa-solid fa-magnifying-glass"/>
                    </button>
                    {/* Header search suggest */}
                    <ul className="header__search-suggest-list hide-on-mobile-tablet">
                        {randomSubCategoriesList?.map((subCategory) => (
                            <li className="header__search-suggest-list-item" key={subCategory.id}>
                                <Link to={`/search?keyword=${subCategory.name}&pageNumber=1`} className="header__search-suggest-link">
                                    {subCategory.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                {/* Cart layout */}
                <CartLayout/>
                <label htmlFor={"nav-mobile-input"} className={"nav_bars-btn"}>
                    <i className="fa-solid fa-bars-staggered fa-2xl"></i>
                </label>
                <input type={"checkbox"}  className={"nav_input"} name={""} id={"nav-mobile-input"}/>
                <label htmlFor={"nav-mobile-input"} className={"nav_overlay"}>
                </label>
                <nav className={"nav_mobile"}>
                    <label htmlFor={"nav-mobile-input"} className={"nav_mobile-close"}>
                        <i className="fa-solid fa-xmark fa-2xl"></i>
                    </label>
                    <ul className={"nav_mobile-list"}>
                        <li className={"nav_mobile-link"}>Home</li>
                        <li className={"nav_mobile-link"}>About</li>
                        <li className={"nav_mobile-link"}>New</li>
                        <li className={"nav_mobile-link"}>Contact</li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default SearchBox;
