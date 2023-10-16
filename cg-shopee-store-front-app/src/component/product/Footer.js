import React, {useEffect, useState} from 'react';
import appstores from "../../asset/img/appstore.png";
import googleplay from "../../asset/img/googleplay.png";
import qr_code from "../../asset/img/qr_code.png";
import {useSelector} from "react-redux";
import {selectCategoryList} from "../../features/category/categorySlice";
import {Link} from "react-router-dom";
import {FACEBOOK_CODE_GYM, WEBSITE_CODE_GYM} from "../../constant/link";

const Footer = () => {
    const [categories,setCategories] = useState();
    const categoryList = useSelector(selectCategoryList);
    useEffect(()=> {
        setCategories(categoryList);
    },[categoryList])
    return (
        <div>
            <footer className="footer">
                <div className="grid wide footer__content">
                    <div className="row">
                        <div className="col l-2-4 m-4 c-6">
                            <h3 className="footer__heading">Chăm sóc khách hàng</h3>
                            <ul className="footer-list">
                                <li className="footer-item">
                                    <a href="#" className="footer-item__link">Trung tâm trợ giúp</a>
                                </li>
                                <li className="footer-item">
                                    <a href="#" className="footer-item__link">KShop mail</a>
                                </li>
                                <li className="footer-item">
                                    <a href="#" className="footer-item__link">Hướng dẫn mua hàng</a>
                                </li>
                            </ul>
                        </div>
                        <div className="col l-2-4 m-4 c-6">
                            <h3 className="footer__heading">Về ticked</h3>
                            <ul className="footer-list">
                                <li className="footer-item">
                                    <a href="#" className="footer-item__link">Giới thiệu</a>
                                </li>
                                <li className="footer-item">
                                    <a href="#" className="footer-item__link">Tuyển dụng</a>
                                </li>
                                <li className="footer-item">
                                    <a href="#" className="footer-item__link">Điều khoản</a>
                                </li>
                            </ul>
                        </div>
                        <div className="col l-2-4 m-4 c-6">
                            <h3 className="footer__heading">Danh mục</h3>
                            <ul className="footer-list">
                                {categories?.map((category) => (
                                        <li className="footer-item" key={category?.id}>
                                            <Link to={`category/${category?.name}.${category?.id}?pageNumber=1`} className="footer-item__link">{category?.name}</Link>
                                        </li>
                                    )
                                )}
                            </ul>
                        </div>
                        <div className="col l-2-4 m-4 c-6">
                            <h3 className="footer__heading">Theo dõi chúng tôi trên</h3>
                            <ul className="footer-list">
                                <li className="footer-item">
                                    <a href={FACEBOOK_CODE_GYM} className="footer-item__link">
                                        <i className="footer-item__icon fa-brands fa-facebook"/>
                                        Facebook
                                    </a>
                                </li>
                                <li className="footer-item">
                                    <a href={WEBSITE_CODE_GYM} className="footer-item__link">
                                        <i className="footer-item__icon fa-brands fa-instagram"/>
                                        Instagram
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="col l-2-4 m-8 c-12">
                            <h3 className="footer__heading">Vào cửa hàng trên ứng dụng</h3>
                            <div className="footer__download">
                                <img className="footer__download-qr" src={qr_code} alt="Download QR"/>
                                <div className="footer__download-apps">
                                    <a href className="footer__download-app-link">
                                        <img src={googleplay} alt="Google Play"
                                             className="footer__download-app-img"/>
                                    </a>
                                    <a href className="footer__download-app-link">
                                        <img src={appstores} alt="Appstore"
                                             className="footer__download-app-img"/>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer__bottom">
                    <div className="grid wide">
                        <p className="footer_text">© 2023 Copyright: COGY TEAM</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Footer;
