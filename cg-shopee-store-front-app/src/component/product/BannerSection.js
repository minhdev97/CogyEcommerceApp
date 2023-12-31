import React from 'react';
import IndicatorsDemo from '../../component/product/Indicators/Indicators';

const BannerSection = () => {
    return (
        <div style={{ paddingTop: 10 }}>
            {/* Banner section */}
            <div className="app__banner">
                <div className="grid wide">
                    <div className="row sm-gutter app__banner-content container">
                        <div className="col l-8 m-12 c-12">
                            {/*    <div className="full-home-banners__main">*/}
                            {/*        <div className="full-home-banners__main-inner">*/}
                            {/*            <a href className="full-home-banners__main-item active">*/}
                            {/*                <img src="https://cf.shopee.vn/file/8da7a277ab0b311b9152070ac7e2c217_xxhdpi" alt={'banner'} />*/}
                            {/*            </a>*/}
                            {/*            <a href className="full-home-banners__main-item">*/}
                            {/*                <img src="https://cf.shopee.vn/file/cbd678911fdabb577ec97dcb7efd7141_xxhdpi" alt={'banner'} />*/}
                            {/*            </a>*/}
                            {/*            <a href className="full-home-banners__main-item">*/}
                            {/*                <img src="https://cf.shopee.vn/file/6da82e01627122bf22b8bcc014fc90af_xxhdpi" alt={'banner'} />*/}
                            {/*            </a>*/}
                            {/*            <a href className="full-home-banners__main-item">*/}
                            {/*                <img src="https://cf.shopee.vn/file/a2fbff9877089bcc52674d5a4215d9c7_xxhdpi" alt={'banner'} />*/}
                            {/*            </a>*/}
                            {/*        </div>*/}
                            {/*        <div className="full-home-banners__main-controls">*/}
                            {/*            <i className="carosel-btn-left fa-solid fa-angle-left" />*/}
                            {/*            <i className="carosel-btn-right fa-solid fa-angle-right" />*/}
                            {/*        </div>*/}
                            {/*        <div className="full-home-banners__main-indicators">*/}
                            {/*            <div className="full-home-bannders__main-dot active" />*/}
                            {/*            <div className="full-home-bannders__main-dot" />*/}
                            {/*            <div className="full-home-bannders__main-dot" />*/}
                            {/*            <div className="full-home-bannders__main-dot" />*/}
                            {/*        </div>*/}
                            {/*    </div>*/}
                            <IndicatorsDemo props={783} />
                        </div>
                        <div className="col l-4 m-12">
                            <div className="row sm-gutter-tablet">
                                <a href="#" className="col l-12 m-6 full-home-banners__right-link">
                                    <div
                                        className="full-home-banners__right-img"
                                        style={{
                                            backgroundImage:
                                                'url("https://cf.shopee.vn/file/7838079195aa34290179f39d1b496d69_xhdpi")',
                                        }}
                                    ></div>
                                </a>
                                <a href="#" className="col l-12 m-6 full-home-banners__right-link">
                                    <div
                                        className="full-home-banners__right-img"
                                        style={{
                                            backgroundImage:
                                                'url("https://cf.shopee.vn/file/735586d941db9bb7dfe1afcde9179d15_xhdpi")',
                                        }}
                                    ></div>
                                </a>
                            </div>
                        </div>
                    </div>
                    <ul className="app__banner-list">
                        <li className="banner-list__item">
                            <a href className="banner-list__link">
                                <div
                                    className="banner-list__img"
                                    style={{
                                        backgroundImage:
                                            'url("https://cf.shopee.vn/file/3820374516083447a858e6f303441170_xhdpi")',
                                    }}
                                ></div>
                                <span className="banner-list__title">Bảo vệ sức khỏe</span>
                            </a>
                        </li>
                        <li className="banner-list__item">
                            <a href className="banner-list__link">
                                <div
                                    className="banner-list__img"
                                    style={{
                                        backgroundImage:
                                            'url("https://cf.shopee.vn/file/b3535d7e56c58c4ebe9a87672d38cc5e_xhdpi")',
                                    }}
                                ></div>
                                <span className="banner-list__title">Gì Cũng Rẻ - Mua Là Freeship</span>
                            </a>
                        </li>
                        <li className="banner-list__item">
                            <a href className="banner-list__link">
                                <div
                                    className="banner-list__img"
                                    style={{
                                        backgroundImage:
                                            'url("https://cf.shopee.vn/file/46a2a2c810622f314d78455da5e5d926_xhdpi")',
                                    }}
                                ></div>
                                <span className="banner-list__title">Khung Giờ Săn Sale</span>
                            </a>
                        </li>
                        <li className="banner-list__item">
                            <a href className="banner-list__link">
                                <div
                                    className="banner-list__img"
                                    style={{
                                        backgroundImage:
                                            'url("https://cf.shopee.vn/file/c7a2e1ae720f9704f92f72c9ef1a494a_xhdpi")',
                                    }}
                                ></div>
                                <span className="banner-list__title">Miễn Phí Vận Chuyển</span>
                            </a>
                        </li>
                        <li className="banner-list__item">
                            <a href className="banner-list__link">
                                <div
                                    className="banner-list__img"
                                    style={{
                                        backgroundImage:
                                            'url("https://cf.shopee.vn/file/9da9a3acb5520d601f86a90434f455a5_xhdpi")',
                                    }}
                                ></div>
                                <span className="banner-list__title">Hoàn Xu 20% - Lên Đến 50K</span>
                            </a>
                        </li>
                        <li className="banner-list__item">
                            <a href className="banner-list__link">
                                <div
                                    className="banner-list__img"
                                    style={{
                                        backgroundImage:
                                            'url("https://cf.shopee.vn/file/765ca66457ec08802f74c529f71a99b7_xhdpi")',
                                    }}
                                ></div>
                                <span className="banner-list__title">Hàng Hiệu -50%</span>
                            </a>
                        </li>
                        <li className="banner-list__item">
                            <a href className="banner-list__link">
                                <div
                                    className="banner-list__img"
                                    style={{
                                        backgroundImage:
                                            'url("https://cf.shopee.vn/file/a08ab28962514a626195ef0415411585_xhdpi")',
                                    }}
                                ></div>
                                <span className="banner-list__title">Hàng Quốc Tế</span>
                            </a>
                        </li>
                        <li className="banner-list__item">
                            <a href className="banner-list__link">
                                <div
                                    className="banner-list__img"
                                    style={{
                                        backgroundImage:
                                            'url("https://cf.shopee.vn/file/9df57ba80ca225e67c08a8a0d8cc7b85_xhdpi")',
                                    }}
                                ></div>
                                <span className="banner-list__title">Nạp Thẻ Dịch Vụ</span>
                            </a>
                        </li>
                        <li className="banner-list__item">
                            <a href className="banner-list__link">
                                <div
                                    className="banner-list__img"
                                    style={{
                                        backgroundImage:
                                            'url("https://cf.shopee.vn/file/96385a65fa50800e096bb790fa5c1dba_xhdpi")',
                                    }}
                                ></div>
                                <span className="banner-list__title">Deal Sốc Từ 1K</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default BannerSection;
