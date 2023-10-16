import { Link } from 'react-router-dom';
import '../../../../asset/css/main/main.css';
import SearchBox from '../../../../component/product/SearchBox';
import {FACEBOOK_CODE_GYM, WEBSITE_CODE_GYM} from '../../../../constant/link';
import {
    LOGIN_PAGE,
    PRODUCT_MANAGEMENT_PAGE,
    REGISTER_SELLER_PAGE,
    REGISTER_USER_PAGE,
} from '../../../../constant/page';
import {getSellerId, getUser} from '../../../../service/userService';
import UserCardToggle from "../../../../component/UserCardToggle";

const Header = () => {
    return (
        <div className={'app'}>
            <header className="header">
                <div className="grid wide">
                    <nav className="header__navbar hide-on-mobile-tablet">
                        <ul className="header__navbar-list">
                            {getSellerId() !== null ? (
                                <li className="header__navbar-item">
                                    <Link
                                        to={PRODUCT_MANAGEMENT_PAGE}
                                        className="header__navbar-item-link header__navbar-item--separate"
                                    >
                                        Seller Channel
                                    </Link>
                                </li>
                            ) : (
                                <li className="header__navbar-item">
                                    <Link
                                        to={REGISTER_SELLER_PAGE}
                                        className="header__navbar-item-link header__navbar-item--separate"
                                    >
                                        Become a Cogy Seller
                                    </Link>
                                </li>
                            )}
                            <li className="header__navbar-item">
                                <span className="header__navbar-title--no-pointer">Connect</span>
                                <a
                                    href={FACEBOOK_CODE_GYM}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="header__navbar-icon-link"
                                >
                                    <i className="header__navbar-icon fa-brands fa-facebook" />
                                </a>
                                <a
                                    href={WEBSITE_CODE_GYM}
                                    className="header__navbar-icon-link"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <i className="header__navbar-icon fa-brands fa-instagram" />
                                </a>
                            </li>
                        </ul>
                        <ul className="header__navbar-list">
                            <li className="header__navbar-item header__navbar-item--has-notify">
                                <a href="#" className="header__navbar-item-link">
                                    <i className="header__navbar-icon far fa-bell" />
                                    Notification
                                </a>
                                {/* Header Notification  */}
                                <div className="header__notify">
                                    <header className="header__notify-header">
                                        <h3>New notification</h3>
                                    </header>
                                    <ul className="header__notify-list">
                                        <li className="header__notify-item header__notify-item--viewed">
                                            <a href className="header__notify-link">
                                                <img
                                                    src="https://www.vietskin.vn/wp-content/uploads/2020/08/image-skincare-9.jpg"
                                                    alt={''}
                                                    className="header__notify-img"
                                                />
                                                <div className="header__notify-info">
                                                    <span className="header__notify-name">
                                                        Xác thực chính hãng nguồn gốc các sản phẩm Ohui
                                                    </span>
                                                    <span className="header__notify-description">
                                                        Xác thực chính hãng nguồn gốc các sản phẩm Ohui
                                                    </span>
                                                </div>
                                            </a>
                                        </li>
                                        <li className="header__notify-item">
                                            <a href className="header__notify-link">
                                                <img
                                                    src="https://luanvanviet.com/wp-content/uploads/2020/08/hinh-anh-san-pham-la-gi-4.jpg"
                                                    alt={''}
                                                    className="header__notify-img"
                                                />
                                                <div className="header__notify-info">
                                                    <span className="header__notify-name">
                                                        Sale Sốc bộ dưỡng Ohui The First Tái tạo trẻ hóa da SALE OFF 70%
                                                    </span>
                                                    <span className="header__notify-description">
                                                        Siêu sale duy nhất 3 ngày 11 - 13/12/2022
                                                    </span>
                                                </div>
                                            </a>
                                        </li>
                                        <li className="header__notify-item">
                                            <a href className="header__notify-link">
                                                <img
                                                    src="https://d20aeo683mqd6t.cloudfront.net/vi/articles/title_images/000/040/760/medium/Hadalabo-5822.jpg?2021"
                                                    alt={''}
                                                    className="header__notify-img"
                                                />
                                                <div className="header__notify-info">
                                                    <span className="header__notify-name">
                                                        DA NHẠY CẢM THÌ CÓ DÙNG ĐƯỢC SECRET KHÔNG?
                                                    </span>
                                                    <span className="header__notify-description">
                                                        "Da mình nhạy cảm thì có dùng được Secret không?"
                                                    </span>
                                                </div>
                                            </a>
                                        </li>
                                        <li className="header__notify-item ">
                                            <a href className="header__notify-link">
                                                <img
                                                    src="https://www.thmilk.vn/wp-content/uploads/2021/03/RICE_464x297.jpg"
                                                    alt={''}
                                                    className="header__notify-img"
                                                />
                                                <div className="header__notify-info">
                                                    <span className="header__notify-name">
                                                        BỘ SƯU TẬP PHIÊN BẢN GIỚI HẠN MÙA LỆ HỘI 2021
                                                    </span>
                                                    <span className="header__notify-description">
                                                        BỘ SƯU TẬP PHIÊN BẢN GIỚI HẠN MÙA LỆ HỘI 2021
                                                    </span>
                                                </div>
                                            </a>
                                        </li>
                                    </ul>
                                    <footer className="header__notify-footer">
                                        <a href="#" className="header__notify-footer-btn">
                                            Xem tất cả
                                        </a>
                                    </footer>
                                </div>
                            </li>
                            <li className="header__navbar-item">
                                <a href="https://help.shopee.vn/vn/s" className="header__navbar-item-link">
                                    <i className="header__navbar-icon far fa-circle-question" />
                                    Support
                                </a>
                            </li>
                            {getUser() ? (
                                <li
                                    className="header__navbar-item header__navbar-item--bold"
                                >
                                     <UserCardToggle isLargeFontSize={true} />
                                    {/*<span>*/}
                                    {/*    <span style={{color: '#fff'}}>*/}
                                    {/*       <BsPersonCircle/>*/}
                                    {/*        {getName()}*/}
                                    {/*    </span>*/}
                                    {/*</span>*/}
                                    {/*{isOpen && (*/}
                                    {/*    <div>*/}
                                    {/*        <div>*/}
                                    {/*            <Link to={PROFILE_PAGE} style={{color: '#fff'}}>*/}
                                    {/*                Tài khoản Cá nhân*/}
                                    {/*            </Link>*/}
                                    {/*        </div>*/}
                                    {/*        <div>*/}
                                    {/*            <Link to={HOME_PAGE} onClick={handleLogout} style={{color: '#fff'}}>*/}
                                    {/*                Đăng xuất*/}
                                    {/*            </Link>*/}
                                    {/*        </div>*/}
                                    {/*    </div>*/}
                                    {/*)}*/}
                                </li>
                            ) : (
                                <>
                                    <li className="header__navbar-item header__navbar-item--bold header__navbar-item--separate">
                                        <Link to={REGISTER_USER_PAGE} style={{ color: '#fff' }}>
                                            Đăng ký
                                        </Link>
                                    </li>
                                    <li className="header__navbar-item header__navbar-item--bold">
                                        <Link to={LOGIN_PAGE} style={{ color: '#fff' }}>
                                            Đăng nhập
                                        </Link>
                                    </li>
                                </>
                            )}
                            <li className="header__navbar-item header__navbar-user">
                                {/* <img
                                    src="https://i.pinimg.com/736x/13/2e/a7/132ea72d2bc3b85d90409c9e8f2d0f4a.jpg"
                                    alt={''}
                                    className="header__navbar-user-img"
                                /> */}
                                {/* <span className="header__navbar-user-name">Đăng Khoa</span> */}
                                <ul className="header__navbar-user-menu">
                                    <li className="header__navbar-user-item">
                                        <a href>Tài khoản của tôi</a>
                                    </li>
                                    <li className="header__navbar-user-item">
                                        <a href>Địa chỉ của tôi</a>
                                    </li>
                                    <li className="header__navbar-user-item">
                                        <a href>Đơn mua</a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </nav>
                    <SearchBox />
                </div>
                <ul className="header__sort-bar">
                    <li className="header__sort-item">
                        <a href className="header__sort-link">
                            Liên quan
                        </a>
                    </li>
                    <li className="header__sort-item header__sort-item--active">
                        <a href className="header__sort-link">
                            Mới nhất
                        </a>
                    </li>
                    <li className="header__sort-item">
                        <a href className="header__sort-link">
                            Bán chạy
                        </a>
                    </li>
                    <li className="header__sort-item">
                        <a href className="header__sort-link">
                            Giá
                        </a>
                    </li>
                </ul>
            </header>
        </div>
    );
};

export default Header;
