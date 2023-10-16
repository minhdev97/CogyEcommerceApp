import React from 'react';
const Container = () => {
    return (
        <div>
            <div className="app__container">
                <div className="grid wide">
                    <div className="row sm-gutter app_content">
                        {/* CategoryList left bar */}
                        <div className="col l-2 m-0 c-0">
                            <nav className="category">
                                <h3 className="category__heading">Danh mục</h3>
                                <ul className="category-list">
                                    <li className="category-item category-item--active">
                                        <a href="src/component/product#" className="category-item__link">Best Seller</a>
                                    </li>
                                    <li className="category-item">
                                        <a href="src/component/product#" className="category-item__link">Laptop Gaming</a>
                                    </li>
                                    <li className="category-item">
                                        <a href="src/component/product#" className="category-item__link">Laptop Văn Phòng</a>
                                    </li>
                                    <li className="category-item">
                                        <a href="src/component/product#" className="category-item__link">Laptop Đồ Họa</a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                        {/* Product */}
                        <div className="col l-10 m-12 c-12">
                            {/* Filter bar */}
                            <div className="home-filter hide-on-mobile-tablet">
                                <span className="home-filter__label">Sắp xếp theo</span>
                                <button className="home-filter__btn btn">Phổ biến</button>
                                <button className="home-filter__btn btn btn--primary">Mới nhất</button>
                                <button className="home-filter__btn btn">Bán chạy</button>
                                <div className="select-input">
                                    <span className="select-input__label">Giá</span>
                                    <i className="select-input__icon fa-solid fa-angle-down" />
                                    {/* List options */}
                                    <ul className="select-input__list">
                                        <li className="select-input__item">
                                            <a href className="select-input__link">
                                                Giá: Thấp đến Cao
                                            </a>
                                        </li>
                                        <li className="select-input__item">
                                            <a href className="select-input__link">
                                                Giá: Cao đến Thấp
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="home-filter__page">
            <span className="home-filter__page-num">
              <span className="home-filter__page-current">1</span>/<span className="home-filter__page-total">14</span>
            </span>
                                    <div className="home-filter__page-control">
                                        <a href className="home-filter__page-btn home-filter__page-btn-disabled">
                                            <i className="home-filter__page-icon fa-solid fa-angle-left" />
                                        </a>
                                        <a href className="home-filter__page-btn">
                                            <i className="home-filter__page-icon fa-solid fa-angle-right" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                            {/* Mobile CategoryList */}
                            <nav className="mobile-category">
                                <ul className="mobile-category__list">
                                    <li className="mobile-category__item">
                                        <a href className="mobile-category__link">Dụng cụ &amp; thiết bị tiện ích</a>
                                    </li>
                                    <li className="mobile-category__item">
                                        <a href className="mobile-category__link">Dụng cụ &amp; thiết bị tiện ích</a>
                                    </li>
                                    <li className="mobile-category__item">
                                        <a href className="mobile-category__link">Dụng cụ &amp; thiết bị tiện ích</a>
                                    </li>
                                    <li className="mobile-category__item">
                                        <a href className="mobile-category__link">Dụng cụ &amp; thiết bị tiện ích</a>
                                    </li>
                                    <li className="mobile-category__item">
                                        <a href className="mobile-category__link">Dụng cụ &amp; thiết bị tiện ích</a>
                                    </li>
                                    <li className="mobile-category__item">
                                        <a href className="mobile-category__link">Dụng cụ &amp; thiết bị tiện ích</a>
                                    </li>
                                    <li className="mobile-category__item">
                                        <a href className="mobile-category__link">Dụng cụ &amp; thiết bị tiện ích</a>
                                    </li>
                                    <li className="mobile-category__item">
                                        <a href className="mobile-category__link">Dụng cụ &amp; thiết bị tiện ích</a>
                                    </li>
                                    <li className="mobile-category__item">
                                        <a href className="mobile-category__link">Dụng cụ &amp; thiết bị tiện ích</a>
                                    </li>
                                    <li className="mobile-category__item">
                                        <a href className="mobile-category__link">Dụng cụ &amp; thiết bị tiện ích</a>
                                    </li>
                                    <li className="mobile-category__item">
                                        <a href className="mobile-category__link">Dụng cụ &amp; thiết bị tiện ích</a>
                                    </li>
                                    <li className="mobile-category__item">
                                        <a href className="mobile-category__link">Dụng cụ &amp; thiết bị tiện ích</a>
                                    </li>
                                    <li className="mobile-category__item">
                                        <a href className="mobile-category__link">Dụng cụ &amp; thiết bị tiện ích</a>
                                    </li>
                                    <li className="mobile-category__item">
                                        <a href className="mobile-category__link">Dụng cụ &amp; thiết bị tiện ích</a>
                                    </li>
                                    <li className="mobile-category__item">
                                        <a href className="mobile-category__link">Dụng cụ &amp; thiết bị tiện ích</a>
                                    </li>
                                    <li className="mobile-category__item">
                                        <a href className="mobile-category__link">Dụng cụ &amp; thiết bị tiện ích</a>
                                    </li>
                                    <li className="mobile-category__item">
                                        <a href className="mobile-category__link">Dụng cụ &amp; thiết bị tiện ích</a>
                                    </li>
                                    <li className="mobile-category__item">
                                        <a href className="mobile-category__link">Dụng cụ &amp; thiết bị tiện ích</a>
                                    </li>
                                </ul>
                            </nav>
                            {/* Product list */}
                            <div className="home-product">
                                <div className="row sm-gutter">
                                    {/* Product item */}
                                    <div className="col l-2-4 m-4 c-6">
                                        <div className="home-product-item">
                                            <div className="home-product-item__img" style={{backgroundImage: 'url(https://product.hstatic.net/1000233206/product/acer-predator-helios-300-ph315-52-78hh_b0c44256d1be443bada03b5b2b20252f_master.png)'}}>
                                            </div>
                                            <h4 className="home-product-item__name">
                                                Laptop Acer Gaming Predator Helios 300 PH315-54-78W5...
                                            </h4>
                                            <div className="home-product-item__price">
                                                <span className="home-product-item__price-old">26.000.000đ</span>
                                                <span className="home-product-item__price-current">24.999.000đ</span>
                                            </div>
                                            <div className="home-product-item__action">
                  <span className="home-product-item__like home-product-item__like--liked">
                    <i className="home-product-item__like-icon-empty fa-regular fa-heart" />
                    <i className="home-product-item__like-icon-fill fa-solid fa-heart" />
                  </span>
                                                <div className="home-product-item__rating">
                                                    <i className="home-product-item__star--gold fa-solid fa-star" />
                                                    <i className="home-product-item__star--gold fa-solid fa-star" />
                                                    <i className="home-product-item__star--gold fa-solid fa-star" />
                                                    <i className="home-product-item__star--gold fa-solid fa-star" />
                                                    <i className=" fa-solid fa-star" />
                                                </div>
                                                <span className="home-product-item__sold">88 đã bán</span>
                                            </div>
                                            <div className="home-product-item__origin">
                                                <span className="home-product-item__brand">HanoiComputer</span>
                                                <span className="home-product-item__origin-name">Acer</span>
                                            </div>
                                            <div className="home-product-item__favourite">
                                                <i className="fa-solid fa-check" />
                                                <span>Yêu thích</span>
                                            </div>
                                            <div className="home-product-item__sale-off">
                                                <span className="home-product-item__sale-off-percent">10%</span>
                                                <span className="home-product-item__sale-off-label">GIẢM</span>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Product item */}
                                    <div className="col l-2-4 m-4 c-6">
                                        <div className="home-product-item">
                                            <div className="home-product-item__img" style={{backgroundImage: 'url(https://product.hstatic.net/1000233206/product/acer-predator-helios-300-ph315-52-78hh_b0c44256d1be443bada03b5b2b20252f_master.png)'}}>
                                            </div>
                                            <h4 className="home-product-item__name">
                                                Laptop Acer Gaming Predator Helios 300 PH315-54-78W5...
                                            </h4>
                                            <div className="home-product-item__price">
                                                <span className="home-product-item__price-old">26.000.000đ</span>
                                                <span className="home-product-item__price-current">24.999.000đ</span>
                                            </div>
                                            <div className="home-product-item__action">
                  <span className="home-product-item__like home-product-item__like--liked">
                    <i className="home-product-item__like-icon-empty fa-regular fa-heart" />
                    <i className="home-product-item__like-icon-fill fa-solid fa-heart" />
                  </span>
                                                <div className="home-product-item__rating">
                                                    <i className="home-product-item__star--gold fa-solid fa-star" />
                                                    <i className="home-product-item__star--gold fa-solid fa-star" />
                                                    <i className="home-product-item__star--gold fa-solid fa-star" />
                                                    <i className="home-product-item__star--gold fa-solid fa-star" />
                                                    <i className=" fa-solid fa-star" />
                                                </div>
                                                <span className="home-product-item__sold">88 đã bán</span>
                                            </div>
                                            <div className="home-product-item__origin">
                                                <span className="home-product-item__brand">HanoiComputer</span>
                                                <span className="home-product-item__origin-name">Acer</span>
                                            </div>
                                            <div className="home-product-item__favourite">
                                                <i className="fa-solid fa-check" />
                                                <span>Yêu thích</span>
                                            </div>
                                            <div className="home-product-item__sale-off">
                                                <span className="home-product-item__sale-off-percent">10%</span>
                                                <span className="home-product-item__sale-off-label">GIẢM</span>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Product item */}
                                    <div className="col l-2-4 m-4 c-6">
                                        <div className="home-product-item">
                                            <div className="home-product-item__img" style={{backgroundImage: 'url(https://product.hstatic.net/1000233206/product/acer-predator-helios-300-ph315-52-78hh_b0c44256d1be443bada03b5b2b20252f_master.png)'}}>
                                            </div>
                                            <h4 className="home-product-item__name">
                                                Laptop Acer Gaming Predator Helios 300 PH315-54-78W5...
                                            </h4>
                                            <div className="home-product-item__price">
                                                <span className="home-product-item__price-old">26.000.000đ</span>
                                                <span className="home-product-item__price-current">24.999.000đ</span>
                                            </div>
                                            <div className="home-product-item__action">
                  <span className="home-product-item__like home-product-item__like--liked">
                    <i className="home-product-item__like-icon-empty fa-regular fa-heart" />
                    <i className="home-product-item__like-icon-fill fa-solid fa-heart" />
                  </span>
                                                <div className="home-product-item__rating">
                                                    <i className="home-product-item__star--gold fa-solid fa-star" />
                                                    <i className="home-product-item__star--gold fa-solid fa-star" />
                                                    <i className="home-product-item__star--gold fa-solid fa-star" />
                                                    <i className="home-product-item__star--gold fa-solid fa-star" />
                                                    <i className=" fa-solid fa-star" />
                                                </div>
                                                <span className="home-product-item__sold">88 đã bán</span>
                                            </div>
                                            <div className="home-product-item__origin">
                                                <span className="home-product-item__brand">HanoiComputer</span>
                                                <span className="home-product-item__origin-name">Acer</span>
                                            </div>
                                            <div className="home-product-item__favourite">
                                                <i className="fa-solid fa-check" />
                                                <span>Yêu thích</span>
                                            </div>
                                            <div className="home-product-item__sale-off">
                                                <span className="home-product-item__sale-off-percent">10%</span>
                                                <span className="home-product-item__sale-off-label">GIẢM</span>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Product item */}
                                    <div className="col l-2-4 m-4 c-6">
                                        <div className="home-product-item">
                                            <div className="home-product-item__img" style={{backgroundImage: 'url(https://product.hstatic.net/1000233206/product/acer-predator-helios-300-ph315-52-78hh_b0c44256d1be443bada03b5b2b20252f_master.png)'}}>
                                            </div>
                                            <h4 className="home-product-item__name">
                                                Laptop Acer Gaming Predator Helios 300 PH315-54-78W5...
                                            </h4>
                                            <div className="home-product-item__price">
                                                <span className="home-product-item__price-old">26.000.000đ</span>
                                                <span className="home-product-item__price-current">24.999.000đ</span>
                                            </div>
                                            <div className="home-product-item__action">
                  <span className="home-product-item__like home-product-item__like--liked">
                    <i className="home-product-item__like-icon-empty fa-regular fa-heart" />
                    <i className="home-product-item__like-icon-fill fa-solid fa-heart" />
                  </span>
                                                <div className="home-product-item__rating">
                                                    <i className="home-product-item__star--gold fa-solid fa-star" />
                                                    <i className="home-product-item__star--gold fa-solid fa-star" />
                                                    <i className="home-product-item__star--gold fa-solid fa-star" />
                                                    <i className="home-product-item__star--gold fa-solid fa-star" />
                                                    <i className=" fa-solid fa-star" />
                                                </div>
                                                <span className="home-product-item__sold">88 đã bán</span>
                                            </div>
                                            <div className="home-product-item__origin">
                                                <span className="home-product-item__brand">HanoiComputer</span>
                                                <span className="home-product-item__origin-name">Acer</span>
                                            </div>
                                            <div className="home-product-item__favourite">
                                                <i className="fa-solid fa-check" />
                                                <span>Yêu thích</span>
                                            </div>
                                            <div className="home-product-item__sale-off">
                                                <span className="home-product-item__sale-off-percent">10%</span>
                                                <span className="home-product-item__sale-off-label">GIẢM</span>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Product item */}
                                    <div className="col l-2-4 m-4 c-6">
                                        <div className="home-product-item">
                                            <div className="home-product-item__img" style={{backgroundImage: 'url(https://product.hstatic.net/1000233206/product/acer-predator-helios-300-ph315-52-78hh_b0c44256d1be443bada03b5b2b20252f_master.png)'}}>
                                            </div>
                                            <h4 className="home-product-item__name">
                                                Laptop Acer Gaming Predator Helios 300 PH315-54-78W5...
                                            </h4>
                                            <div className="home-product-item__price">
                                                <span className="home-product-item__price-old">26.000.000đ</span>
                                                <span className="home-product-item__price-current">24.999.000đ</span>
                                            </div>
                                            <div className="home-product-item__action">
                  <span className="home-product-item__like home-product-item__like--liked">
                    <i className="home-product-item__like-icon-empty fa-regular fa-heart" />
                    <i className="home-product-item__like-icon-fill fa-solid fa-heart" />
                  </span>
                                                <div className="home-product-item__rating">
                                                    <i className="home-product-item__star--gold fa-solid fa-star" />
                                                    <i className="home-product-item__star--gold fa-solid fa-star" />
                                                    <i className="home-product-item__star--gold fa-solid fa-star" />
                                                    <i className="home-product-item__star--gold fa-solid fa-star" />
                                                    <i className=" fa-solid fa-star" />
                                                </div>
                                                <span className="home-product-item__sold">88 đã bán</span>
                                            </div>
                                            <div className="home-product-item__origin">
                                                <span className="home-product-item__brand">HanoiComputer</span>
                                                <span className="home-product-item__origin-name">Acer</span>
                                            </div>
                                            <div className="home-product-item__favourite">
                                                <i className="fa-solid fa-check" />
                                                <span>Yêu thích</span>
                                            </div>
                                            <div className="home-product-item__sale-off">
                                                <span className="home-product-item__sale-off-percent">10%</span>
                                                <span className="home-product-item__sale-off-label">GIẢM</span>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Product item */}
                                    <div className="col l-2-4 m-4 c-6">
                                        <div className="home-product-item">
                                            <div className="home-product-item__img" style={{backgroundImage: 'url(https://product.hstatic.net/1000233206/product/acer-predator-helios-300-ph315-52-78hh_b0c44256d1be443bada03b5b2b20252f_master.png)'}}>
                                            </div>
                                            <h4 className="home-product-item__name">
                                                Laptop Acer Gaming Predator Helios 300 PH315-54-78W5...
                                            </h4>
                                            <div className="home-product-item__price">
                                                <span className="home-product-item__price-old">26.000.000đ</span>
                                                <span className="home-product-item__price-current">24.999.000đ</span>
                                            </div>
                                            <div className="home-product-item__action">
                  <span className="home-product-item__like home-product-item__like--liked">
                    <i className="home-product-item__like-icon-empty fa-regular fa-heart" />
                    <i className="home-product-item__like-icon-fill fa-solid fa-heart" />
                  </span>
                                                <div className="home-product-item__rating">
                                                    <i className="home-product-item__star--gold fa-solid fa-star" />
                                                    <i className="home-product-item__star--gold fa-solid fa-star" />
                                                    <i className="home-product-item__star--gold fa-solid fa-star" />
                                                    <i className="home-product-item__star--gold fa-solid fa-star" />
                                                    <i className=" fa-solid fa-star" />
                                                </div>
                                                <span className="home-product-item__sold">88 đã bán</span>
                                            </div>
                                            <div className="home-product-item__origin">
                                                <span className="home-product-item__brand">HanoiComputer</span>
                                                <span className="home-product-item__origin-name">Acer</span>
                                            </div>
                                            <div className="home-product-item__favourite">
                                                <i className="fa-solid fa-check" />
                                                <span>Yêu thích</span>
                                            </div>
                                            <div className="home-product-item__sale-off">
                                                <span className="home-product-item__sale-off-percent">10%</span>
                                                <span className="home-product-item__sale-off-label">GIẢM</span>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Product item */}
                                    <div className="col l-2-4 m-4 c-6">
                                        <div className="home-product-item">
                                            <div className="home-product-item__img" style={{backgroundImage: 'url(https://product.hstatic.net/1000233206/product/acer-predator-helios-300-ph315-52-78hh_b0c44256d1be443bada03b5b2b20252f_master.png)'}}>
                                            </div>
                                            <h4 className="home-product-item__name">
                                                Laptop Acer Gaming Predator Helios 300 PH315-54-78W5...
                                            </h4>
                                            <div className="home-product-item__price">
                                                <span className="home-product-item__price-old">26.000.000đ</span>
                                                <span className="home-product-item__price-current">24.999.000đ</span>
                                            </div>
                                            <div className="home-product-item__action">
                  <span className="home-product-item__like home-product-item__like--liked">
                    <i className="home-product-item__like-icon-empty fa-regular fa-heart" />
                    <i className="home-product-item__like-icon-fill fa-solid fa-heart" />
                  </span>
                                                <div className="home-product-item__rating">
                                                    <i className="home-product-item__star--gold fa-solid fa-star" />
                                                    <i className="home-product-item__star--gold fa-solid fa-star" />
                                                    <i className="home-product-item__star--gold fa-solid fa-star" />
                                                    <i className="home-product-item__star--gold fa-solid fa-star" />
                                                    <i className=" fa-solid fa-star" />
                                                </div>
                                                <span className="home-product-item__sold">88 đã bán</span>
                                            </div>
                                            <div className="home-product-item__origin">
                                                <span className="home-product-item__brand">HanoiComputer</span>
                                                <span className="home-product-item__origin-name">Acer</span>
                                            </div>
                                            <div className="home-product-item__favourite">
                                                <i className="fa-solid fa-check" />
                                                <span>Yêu thích</span>
                                            </div>
                                            <div className="home-product-item__sale-off">
                                                <span className="home-product-item__sale-off-percent">10%</span>
                                                <span className="home-product-item__sale-off-label">GIẢM</span>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Product item */}
                                    <div className="col l-2-4 m-4 c-6">
                                        <div className="home-product-item">
                                            <div className="home-product-item__img" style={{backgroundImage: 'url(https://product.hstatic.net/1000233206/product/acer-predator-helios-300-ph315-52-78hh_b0c44256d1be443bada03b5b2b20252f_master.png)'}}>
                                            </div>
                                            <h4 className="home-product-item__name">
                                                Laptop Acer Gaming Predator Helios 300 PH315-54-78W5...
                                            </h4>
                                            <div className="home-product-item__price">
                                                <span className="home-product-item__price-old">26.000.000đ</span>
                                                <span className="home-product-item__price-current">24.999.000đ</span>
                                            </div>
                                            <div className="home-product-item__action">
                  <span className="home-product-item__like home-product-item__like--liked">
                    <i className="home-product-item__like-icon-empty fa-regular fa-heart" />
                    <i className="home-product-item__like-icon-fill fa-solid fa-heart" />
                  </span>
                                                <div className="home-product-item__rating">
                                                    <i className="home-product-item__star--gold fa-solid fa-star" />
                                                    <i className="home-product-item__star--gold fa-solid fa-star" />
                                                    <i className="home-product-item__star--gold fa-solid fa-star" />
                                                    <i className="home-product-item__star--gold fa-solid fa-star" />
                                                    <i className=" fa-solid fa-star" />
                                                </div>
                                                <span className="home-product-item__sold">88 đã bán</span>
                                            </div>
                                            <div className="home-product-item__origin">
                                                <span className="home-product-item__brand">HanoiComputer</span>
                                                <span className="home-product-item__origin-name">Acer</span>
                                            </div>
                                            <div className="home-product-item__favourite">
                                                <i className="fa-solid fa-check" />
                                                <span>Yêu thích</span>
                                            </div>
                                            <div className="home-product-item__sale-off">
                                                <span className="home-product-item__sale-off-percent">10%</span>
                                                <span className="home-product-item__sale-off-label">GIẢM</span>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Product item */}
                                    <div className="col l-2-4 m-4 c-6">
                                        <div className="home-product-item">
                                            <div className="home-product-item__img" style={{backgroundImage: 'url(https://product.hstatic.net/1000233206/product/acer-predator-helios-300-ph315-52-78hh_b0c44256d1be443bada03b5b2b20252f_master.png)'}}>
                                            </div>
                                            <h4 className="home-product-item__name">
                                                Laptop Acer Gaming Predator Helios 300 PH315-54-78W5...
                                            </h4>
                                            <div className="home-product-item__price">
                                                <span className="home-product-item__price-old">26.000.000đ</span>
                                                <span className="home-product-item__price-current">24.999.000đ</span>
                                            </div>
                                            <div className="home-product-item__action">
                  <span className="home-product-item__like home-product-item__like--liked">
                    <i className="home-product-item__like-icon-empty fa-regular fa-heart" />
                    <i className="home-product-item__like-icon-fill fa-solid fa-heart" />
                  </span>
                                                <div className="home-product-item__rating">
                                                    <i className="home-product-item__star--gold fa-solid fa-star" />
                                                    <i className="home-product-item__star--gold fa-solid fa-star" />
                                                    <i className="home-product-item__star--gold fa-solid fa-star" />
                                                    <i className="home-product-item__star--gold fa-solid fa-star" />
                                                    <i className=" fa-solid fa-star" />
                                                </div>
                                                <span className="home-product-item__sold">88 đã bán</span>
                                            </div>
                                            <div className="home-product-item__origin">
                                                <span className="home-product-item__brand">HanoiComputer</span>
                                                <span className="home-product-item__origin-name">Acer</span>
                                            </div>
                                            <div className="home-product-item__favourite">
                                                <i className="fa-solid fa-check" />
                                                <span>Yêu thích</span>
                                            </div>
                                            <div className="home-product-item__sale-off">
                                                <span className="home-product-item__sale-off-percent">10%</span>
                                                <span className="home-product-item__sale-off-label">GIẢM</span>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Product item */}
                                    <div className="col l-2-4 m-4 c-6">
                                        <div className="home-product-item">
                                            <div className="home-product-item__img" style={{backgroundImage: 'url(https://product.hstatic.net/1000233206/product/acer-predator-helios-300-ph315-52-78hh_b0c44256d1be443bada03b5b2b20252f_master.png)'}}>
                                            </div>
                                            <h4 className="home-product-item__name">
                                                Laptop Acer Gaming Predator Helios 300 PH315-54-78W5...
                                            </h4>
                                            <div className="home-product-item__price">
                                                <span className="home-product-item__price-old">26.000.000đ</span>
                                                <span className="home-product-item__price-current">24.999.000đ</span>
                                            </div>
                                            <div className="home-product-item__action">
                  <span className="home-product-item__like home-product-item__like--liked">
                    <i className="home-product-item__like-icon-empty fa-regular fa-heart" />
                    <i className="home-product-item__like-icon-fill fa-solid fa-heart" />
                  </span>
                                                <div className="home-product-item__rating">
                                                    <i className="home-product-item__star--gold fa-solid fa-star" />
                                                    <i className="home-product-item__star--gold fa-solid fa-star" />
                                                    <i className="home-product-item__star--gold fa-solid fa-star" />
                                                    <i className="home-product-item__star--gold fa-solid fa-star" />
                                                    <i className=" fa-solid fa-star" />
                                                </div>
                                                <span className="home-product-item__sold">88 đã bán</span>
                                            </div>
                                            <div className="home-product-item__origin">
                                                <span className="home-product-item__brand">HanoiComputer</span>
                                                <span className="home-product-item__origin-name">Acer</span>
                                            </div>
                                            <div className="home-product-item__favourite">
                                                <i className="fa-solid fa-check" />
                                                <span>Yêu thích</span>
                                            </div>
                                            <div className="home-product-item__sale-off">
                                                <span className="home-product-item__sale-off-percent">10%</span>
                                                <span className="home-product-item__sale-off-label">GIẢM</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Pagination */}
                            <ul className="pagination home-product__pagination">
                                <li className="pagination-item">
                                    <a href="src/component/product#" className="pagination-item__link">
                                        <i className="pagination-item__icon fa-solid fa-angle-left" />
                                    </a>
                                </li>
                                <li className="pagination-item pagination-item--active">
                                    <a href="src/component/product#" className="pagination-item__link">1</a>
                                </li>
                                <li className="pagination-item">
                                    <a href="src/component/product#" className="pagination-item__link">2</a>
                                </li>
                                <li className="pagination-item">
                                    <a href="src/component/product#" className="pagination-item__link">3</a>
                                </li>
                                <li className="pagination-item">
                                    <a href="src/component/product#" className="pagination-item__link">4</a>
                                </li>
                                <li className="pagination-item">
                                    <a href="src/component/product#" className="pagination-item__link">5</a>
                                </li>
                                <li className="pagination-item">
                                    <a href="src/component/product#" className="pagination-item__link">...</a>
                                </li>
                                <li className="pagination-item">
                                    <a href="src/component/product#" className="pagination-item__link">14</a>
                                </li>
                                <li className="pagination-item">
                                    <a href="src/component/product#" className="pagination-item__link">
                                        <i className="pagination-item__icon fa-solid fa-angle-right" />
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Container;
