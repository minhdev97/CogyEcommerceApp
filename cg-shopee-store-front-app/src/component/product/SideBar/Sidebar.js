import React, {useEffect, useState} from 'react';
import {Link, useLocation, useNavigate} from "react-router-dom";
import {Button} from "primereact/button";
import {InputNumber} from "primereact/inputnumber";
import "../../../asset/css/main/sidebar.css";
import {MDBCol, MDBContainer, MDBRow} from "mdb-react-ui-kit";
import axios from "axios";
import {PUBLIC_PRODUCT_API} from "../../../constant/api";
import {useDispatch, useSelector} from "react-redux";
import {selectCategoryDetail} from "../../../features/category/categorySlice";
import queryString from "query-string";
import {ZERO} from "../../../constant/number";
import {
    getSellerLocationsList,
    selectSellerLocationsList,
    selectSuccessSellerLocations
} from "../../../features/seller-location/sellerLocationSlice";

const Sidebar = (props) => {
    const param = props.param;
    const [products, setProducts] = useState([]);
    const [isChecked, setIsChecked] = useState([]);
    const [isCheckedProvince, setIsCheckedProvince] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [hasNext, setHasNext] = useState(false);
    const [hasPrevious, setHasPrevious] = useState(false);
    const currentPage = param.page;
    const categoryDetail = useSelector(selectCategoryDetail);
    const navigate = useNavigate();
    const encodedSubCategoryIds = isChecked.join(',');
    const encodedProvinceName = isCheckedProvince.join(',');
    const location = useLocation();
    const [rangePrice, setRangePrice] = useState({});
    const mappedProvinces = [];
    const dispatch = useDispatch();
    const sellerLocationsList = useSelector(selectSellerLocationsList);
    const successSellerLocation = useSelector(selectSuccessSellerLocations);
    const [provinces,setProvinces] = useState(null);

    function convertCurrencyStringToNumber(currencyString) {
        // Remove non-numeric characters from the string
        const numericString = currencyString.replace(/[^\d]/g, '');
        // Convert the numeric string to a number
        return parseInt(numericString, 10);
    }
    const handleSetPrice = (event) => {
        const { name, value } = event.target;
        const convertedDouble = convertCurrencyStringToNumber(value);
        setRangePrice((prevState) => {
            if (value === '') {
                const { [name]: removedValue, ...updatedRangePrice } = prevState;
                return updatedRangePrice;
            } else {
                return {
                    ...prevState,
                    [name]: convertedDouble,
                };
            }
        });
    }
    const handlePriceRangeSearch = (rangePrice) => {
        const currentSearchParams = queryString.parse(location.search);
        if (rangePrice.minPrice && rangePrice.maxPrice) {
            currentSearchParams.minPrice = rangePrice.minPrice;
            currentSearchParams.maxPrice = rangePrice.maxPrice;
            navigate(`${location.pathname}?${queryString.stringify(currentSearchParams)}`);
        } else if (rangePrice.minPrice) {
            currentSearchParams.minPrice = rangePrice.minPrice;
            delete currentSearchParams.maxPrice;
            navigate(`${location.pathname}?${queryString.stringify(currentSearchParams)}`);
        } else if (rangePrice.maxPrice) {
            currentSearchParams.maxPrice = rangePrice.maxPrice;
            delete currentSearchParams.minPrice;
            navigate(`${location.pathname}?${queryString.stringify(currentSearchParams)}`);
        } if ( !rangePrice.minPrice && !rangePrice.maxPrice) {
            delete currentSearchParams.maxPrice;
            delete currentSearchParams.minPrice;
            navigate(`${location.pathname}?${queryString.stringify(currentSearchParams)}`);
        }
    }
    const navigateWithSort = (sortValue) => {
        const currentSearchParams = queryString.parse(location.search);

        // Xóa tham số direction trước khi thêm tham số mới
        delete currentSearchParams.sortBy;

        if (param.sort === null || param.sort !== sortValue) {
            currentSearchParams.sort = sortValue;
            navigate(`${location.pathname}?${queryString.stringify(currentSearchParams)}`);
        }
    }
    const navigateWithSortAndDirection = (sortValue, direction) => {
        const currentSearchParams = queryString.parse(location.search);
        if (
            (param.sort === null && param.direction === null) ||
            (param.sort !== sortValue && param.direction !== direction)
        ) {
            currentSearchParams.sort = sortValue;
            currentSearchParams.sortBy = direction;
            navigate(`${location.pathname}?${queryString.stringify(currentSearchParams)}`);
        } else if (param.sort === sortValue && param.direction !== direction) {
            currentSearchParams.sortBy = direction;
            navigate(`${location.pathname}?${queryString.stringify(currentSearchParams)}`);
        }
    };

    const fetchProductById = async () => {
        let result = null;
        try {
            const response = await axios.get(`${PUBLIC_PRODUCT_API}/category/${param.id}/`, {
                params: {
                    page: currentPage - 1,
                    size: param.size || '',
                    sort: param.sort || "minPriceOfVariants",
                    direction: param.direction || "desc",
                    subCategory: encodedSubCategoryIds,
                    minPrice: param.minPrice,
                    maxPrice: param.maxPrice,
                    province: encodedProvinceName,
                }
            });
            result = response.data;
            setProducts(result.products.content);
            setTotalPages(result.products.totalPages);
            setHasNext(result.products.hasNext);
            setHasPrevious(result.products.hasPrevious);
            setSubCategories(result.subCategoryList);
        } catch (e) {
            console.log("Find API product error: " + e);
        }
        console.log("fetchProductById");
        return result;
    }
    const fetchProductBySubCategoryId = async () => {
        let result = null;
        try {
            const response = await axios.get(`${PUBLIC_PRODUCT_API}/subcategory/${param.subCategoryId}/`, {
                params: {
                    page: currentPage - 1,
                    size: param.size || '',
                    sort: param.sort || "minPriceOfVariants",
                    direction: param.direction || "desc",
                    category: param.id,
                    subCategory: encodedSubCategoryIds,
                    province: encodedProvinceName,
                    minPrice: param.minPrice,
                    maxPrice: param.maxPrice,
                }
            });
            result = response.data;
            setProducts(result.products.content);
            setTotalPages(result.products.totalPages);
            setHasNext(result.products.hasNext);
            setHasPrevious(result.products.hasPrevious);
            setSubCategories(result.subCategoryList);
        } catch (e) {
            console.log("Find API product error: " + e);
        }
        console.log("fetchProductById");
        return result;
    }
    const fetchProductBySearch = async () => {
        let result = null;
        try {
            const response = await axios.get(`${PUBLIC_PRODUCT_API}/search/`, {
                params: {
                    search: param.search,
                    page: currentPage - 1,
                    size: param.size || '',
                    sort: param.sort || "minPriceOfVariants",
                    direction: param.direction || "desc",
                    minPrice: param.minPrice,
                    maxPrice: param.maxPrice,
                    province: encodedProvinceName,
                }
            });
            result = response.data.searchData;
            setProducts(result.content);
            setTotalPages(result.totalPages);
            setHasNext(result.hasNext);
            setHasPrevious(result.hasPrevious);
            setSubCategories(response.data.subCategoryList);
        } catch (e) {
            console.log("Find API product error: " + e);
        }
        console.log('fetchProductBySearch');
        return result;
    }

    const handleItemClick = () => {
        window.scrollTo({ top: 390, behavior: 'smooth' });
    };


    useEffect(() => {
        if (param.search) {
            fetchProductBySearch();
        } else if (param.subCategoryId) {
            fetchProductBySubCategoryId();
        } else {
            fetchProductById();
        }
    }, [param.minPrice,param.maxPrice,param.subCategoryId, param.page, param.search, param.id, param.size, param.sort, param.direction, encodedSubCategoryIds, encodedProvinceName, isChecked, isCheckedProvince]);

    const findSellerLocations = () => {
        const findSellerLocations = async () => {
            !successSellerLocation && await dispatch(getSellerLocationsList());
        };
        findSellerLocations().then(() => {
            successSellerLocation && setProvinces(sellerLocationsList);
        })
    }

    useEffect(() => {
        findSellerLocations();
    },[sellerLocationsList])
    const pageNumberWithParams = (pageNumber) => {
        const currentSearchParams = queryString.parse(location.search);
        currentSearchParams.pageNumber = pageNumber;
        return `${location.pathname}?${queryString.stringify(currentSearchParams)}`;
    }
    const renderPaginationIcon = (pageNumber, iconClass, disabled) => (
        <li className="pagination-item">
            <Link
                to={param.search
                    ? `/search?keyword=${param.search}&pageNumber=${pageNumber}`
                    : pageNumberWithParams(pageNumber)}
                className={`pagination-item__link ${disabled ? '' : 'disabled'}`}
                onClick={handleItemClick}
            >
                <i className={`pagination-item__icon fa-solid ${iconClass}`}/>
            </Link>
        </li>
    );
    const renderPaginationItem = (pageNumber) => (
        <li
            className={`pagination-item ${currentPage === pageNumber ? 'pagination-item--active' : ''}`}
        >
            <Link
                to={param.search ? `/search?keyword=${param.search}&pageNumber=${pageNumber}` : pageNumberWithParams(pageNumber)}
                className="pagination-item__link" onClick={handleItemClick}>
                {pageNumber}
            </Link>
        </li>
    );

    const renderDots = () => (
        <li className="pagination-item">
            <Link to={`/daily_discover?pageNumber=2`} className="pagination-item__link disabled">
                ...
            </Link>
        </li>
    );

    const renderPaginationItems = () => {
        const paginationItems = [];
        if (totalPages < 7) {
            for (let i = 1; i <= totalPages; i++) {
                paginationItems.push(renderPaginationItem(i));
            }
        } else if (currentPage <= 5) {
            for (let i = 1; i <= Math.min(totalPages, 6); i++) {
                paginationItems.push(renderPaginationItem(i));
            }
            paginationItems.push(renderDots());
            paginationItems.push(renderPaginationItem(totalPages));
        } else if (currentPage > 5 && currentPage < totalPages - 4) {
            paginationItems.push(renderPaginationItem(1));
            paginationItems.push(renderDots());
            paginationItems.push(renderPaginationItem(currentPage - 1));
            paginationItems.push(renderPaginationItem(currentPage));
            paginationItems.push(renderPaginationItem(currentPage + 1));
            paginationItems.push(renderPaginationItem(currentPage + 2));
            paginationItems.push(renderDots());
            paginationItems.push(renderPaginationItem(totalPages));
        } else if (currentPage >= totalPages - 4 && currentPage <= totalPages) {
            paginationItems.push(renderPaginationItem(1));
            paginationItems.push(renderDots());
            paginationItems.push(renderPaginationItem(totalPages - 5));
            paginationItems.push(renderPaginationItem(totalPages - 4));
            paginationItems.push(renderPaginationItem(totalPages - 3));
            paginationItems.push(renderPaginationItem(totalPages - 2));
            paginationItems.push(renderPaginationItem(totalPages - 1));
            paginationItems.push(renderPaginationItem(totalPages));
        }

        return paginationItems;
    };
    const handleCheckedProvince = (name) => {
        setIsCheckedProvince(prev => {
            const isCheckedYet = isCheckedProvince.includes(name);
            if (isCheckedYet) {
                return isCheckedProvince.filter(item => item !== name);
            } else {
                return [...prev,name];
            }
        });
    }
    const handleChecked = (id) => {
        setIsChecked(prev => {
            const isCheckedYet = isChecked.includes(id);
            if (isCheckedYet) {
                return isChecked.filter(item => item !== id);
            } else {
                return [...prev, id];
            }
        });
    }

    return (
        <div>
            <MDBContainer fluid>
                <MDBRow>
                    <MDBCol md={'2'}>
                        <div>
                            <div className="filter-header">
                                <div className="filter-icon">
                                    <i className="fa-solid fa-filter" style={{color: "#a6b0c5"}}></i>
                                </div>
                                <h3 className="filter-text">BỘ LỌC TÌM KIẾM</h3>
                            </div>
                            <aside>
                                <nav>
                                    <div>
                                        <h3 className="category__heading">Theo Danh mục</h3>
                                        <ul className="category-list">
                                            <li><strong>{categoryDetail?.name}</strong></li>
                                            {subCategories.map((subCategory) => (
                                                <li className="category-item category-item--active"
                                                    key={subCategory.id}>
                                                    <label htmlFor={`checkbox-${subCategory.id}`}
                                                           className={'checkbox-container'}>
                                                        <input id={`checkbox-${subCategory.id}`} type={'checkbox'}
                                                               name={'subcategory'}
                                                               onChange={() => handleChecked(subCategory.id)}
                                                               checked={isChecked.includes(subCategory.id)}/>
                                                        <span className="category-item__link">{subCategory.name}</span>
                                                    </label>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div>
                                        <h3 className="category__heading">Nơi bán</h3>
                                        <ul className="category-list">
                                            {provinces?.map((province) => {
                                                const isProvinceMapped = mappedProvinces.includes(province.province);
                                                if (!isProvinceMapped) {
                                                    mappedProvinces.push(province.province);
                                                    return (
                                                        <li className="category-item category-item--active" key={province.id}>
                                                            <label htmlFor={`checkbox-${province.id}`}
                                                                   className={'checkbox-container'}>
                                                                <input id={`checkbox-${province.id}`} type={'checkbox'}
                                                                       name={'province'}
                                                                       onChange={() => handleCheckedProvince(province.province)}
                                                                       checked={isCheckedProvince.includes(province.province)}/>
                                                                <span className="category-item__link">{province.province}</span>
                                                            </label>
                                                        </li>
                                                    );
                                                }
                                                return null;
                                            })}
                                        </ul>
                                    </div>
                                    <div>
                                        <h3 className="category__heading">Khoảng giá</h3>
                                        <ul className="category-list">
                                            <div>
                                                <li className="category-item category-item--active">
                                                    <div style={{display: 'block'}}>
                                                        <InputNumber
                                                            min={ZERO}
                                                            mode="currency"
                                                            currency="VND"
                                                            locale="vi-VN"
                                                            placeholder='TỪ'
                                                            className={"input-number-width w-100"}
                                                            name={'minPrice'}
                                                            onBlur={handleSetPrice}
                                                        />
                                                        <hr/>
                                                        <InputNumber
                                                            min={ZERO}
                                                            mode="currency"
                                                            currency="VND"
                                                            locale="vi-VN"
                                                            placeholder='ĐẾN'
                                                            className={"input-number-width w-100"}
                                                            name={'maxPrice'}
                                                            onBlur={handleSetPrice}
                                                        />
                                                    </div>
                                                </li>
                                                <li className="category-item">
                                                    <Button label="ÁP DỤNG" severity="primary" text raised
                                                            size={"large"}
                                                            className={'w-100'}
                                                            onClick={() => handlePriceRangeSearch(rangePrice)}/>
                                                </li>
                                            </div>
                                        </ul>
                                    </div>
                                </nav>
                            </aside>
                        </div>
                    </MDBCol>
                    <MDBCol md={'10'}>
                        {/* Product */}
                        <div>
                            {/* Filter bar */}
                            <div className="home-filter hide-on-mobile-tablet">
                                <span className="home-filter__label">Sắp xếp theo</span>
                                <button
                                    className={`home-filter__btn btn ${param.sort === 'view' ? 'btn--primary' : ''}`}
                                    onClick={() => navigateWithSort('view')}>Phổ biến
                                </button>
                                <button
                                    className={`home-filter__btn btn ${param.sort === 'creationTime' ? 'btn--primary' : ''}`}
                                    onClick={() => navigateWithSort('creationTime')}>Mới
                                    nhất
                                </button>
                                <button
                                    className={`home-filter__btn btn ${param.sort === 'numberOfPurchase' ? 'btn--primary' : ''}`}
                                    onClick={() => navigateWithSort('numberOfPurchase')}>Bán chạy
                                </button>
                                <div className="select-input">
                                    <span className="select-input__label">Giá</span>
                                    <i className="select-input__icon fa-solid fa-angle-down"/>
                                    {/* List options */}
                                    <ul className="select-input__list">
                                        <li className="select-input__item">
                                            <a onClick={() => navigateWithSortAndDirection('minPriceOfVariants', 'asc')}
                                               href className="select-input__link">
                                                Giá: Thấp đến Cao
                                            </a>
                                        </li>
                                        <li className="select-input__item">
                                            <a onClick={() => navigateWithSortAndDirection('minPriceOfVariants', 'desc')}
                                               href className="select-input__link">
                                                Giá: Cao đến Thấp
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="home-filter__page">
            <span className="home-filter__page-num">
              <span className="home-filter__page-current">{currentPage}</span>/<span
                className="home-filter__page-total">{totalPages}</span>
            </span>
                                    <div className="home-filter__page-control">
                                        <Link
                                            to={param.search ? `/search?keyword=${param.search}&pageNumber=${currentPage - 1}` : `/category/${categoryDetail?.name}.${categoryDetail?.id}?pageNumber=${currentPage - 1}`}
                                            className={`home-filter__page-btn  ${hasPrevious ? '' : 'home-filter__page-btn-disabled'}`}
                                            onClick={handleItemClick}>
                                            <i className={`home-filter__page-icon fa-solid fa-angle-left`}/>
                                        </Link>
                                        <Link
                                            to={param.search ? `/search?keyword=${param.search}&pageNumber=${currentPage + 1}` : `/category/${categoryDetail?.name}.${categoryDetail?.id}?pageNumber=${currentPage + 1}`}
                                            className={`home-filter__page-btn  ${hasNext ? '' : 'home-filter__page-btn-disabled'}`}
                                            onClick={handleItemClick}>
                                            <i className={`home-filter__page-icon fa-solid fa-angle-right`}/>
                                        </Link>
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
                                    {products?.length === 0
                                        ?
                                        param.search === undefined
                                            ?
                                            <div style={{fontSize: 25, paddingTop: 50, marginTop: 50}} align={'center'}>
                                                <i className="fa-solid fa-magnifying-glass fa-2xl"></i>
                                                <p>Can't find any suitable items in this section</p>
                                                <p>Please try again later</p>
                                            </div>
                                            :
                                            <div style={{fontSize: 25, paddingTop: 50, marginTop: 50}} align={'center'}>
                                                <i className="fa-solid fa-magnifying-glass fa-2xl"></i>
                                                <p>Can't find any suitable items like "{param.search}"</p>
                                                <p>Please try using other general keyword</p>
                                            </div>
                                        :
                                        products?.map((product) => (
                                            <div className="col l-2-4 m-4 c-6" key={product.id}>
                                                <Link to={`/product/${product.id}`}>
                                                    <div className="home-product-item">
                                                        <div className="home-product-item__img"
                                                             style={{backgroundImage: `url(${product.image})`}}>
                                                        </div>
                                                        <h4 className="home-product-item__name">
                                                            {product.name}</h4>
                                                        <div className="home-product-item__price">
                                                            {
                                                                ( product.vouchers === null )
                                                                    ?
                                                                    <>
                                                                    <span className="home-product-item__price-current">
                                                                        {new Intl.NumberFormat('vi-VN', {
                                                                            style: 'currency', currency: 'VND'
                                                                                }).format(product.minPriceOfVariants)}
                                                                    </span>
                                                                    </>
                                                                    :
                                                                    <>
                                                                        <span className="home-product-item__price-old">
                                                                            {new Intl.NumberFormat('vi-VN', {
                                                                                style: 'currency', currency: 'VND'
                                                                                    }).format(product.minPriceOfVariants)}
                                                                        </span>
                                                                        <span
                                                                        className="home-product-item__price-current">
                                                    {new Intl.NumberFormat('vi-VN', {
                                                        style: 'currency', currency: 'VND'
                                                    }).format(product.discountPrice)}
                                                </span>
                                                                </>
                                                            }
                                                        </div>
                                                        <div className="home-product-item__action">
                                        <span className="home-product-item__like home-product-item__like--liked">
                                        <i className="home-product-item__like-icon-empty fa-regular fa-eye"/>
                                        <i className="home-product-item__like-icon-fill fa-solid fa-eye"/>
                                        </span>
                                                            <span
                                                                className="home-product-item__view">{product.view}</span>
                                                            {/*<div className="home-product-item__rating">*/}
                                                            {/*    <i className="home-product-item__star--gold fa-solid fa-star"/>*/}
                                                            {/*    <i className="home-product-item__star--gold fa-solid fa-star"/>*/}
                                                            {/*    <i className="home-product-item__star--gold fa-solid fa-star"/>*/}
                                                            {/*    <i className="home-product-item__star--gold fa-solid fa-star"/>*/}
                                                            {/*    <i className=" fa-solid fa-star"/>*/}
                                                            {/*</div>*/}
                                                            <span
                                                                className="home-product-item__sold">{product.numberOfPurchase} đã bán</span>
                                                        </div>
                                                        <div className="home-product-item__origin">
                                                            <span
                                                                className="home-product-item__brand">{product.province}</span>
                                                        </div>
                                                        {product.view > 5000
                                                            ?
                                                            <div className="home-product-item__favourite">
                                                                <i className="fa-solid fa-check"/>
                                                                <span>Yêu thích</span>
                                                            </div>
                                                            :
                                                            <></>
                                                        }
                                                        {product.vouchers === null
                                                            ?
                                                            <></>
                                                            :
                                                            <div className="home-product-item__sale-off">
                                                            <span className="home-product-item__sale-off-percent">{product.vouchers?.value}
                                                                {product.vouchers?.type === 'PERCENT' ? '%' : '₫'}</span>
                                                                <br/>
                                                            <span className="home-product-item__sale-off-label">GIẢM</span>
                                                            </div>
                                                        }
                                                    </div>
                                                </Link>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                            {/* Pagination */}
                            <ul className="pagination home-product__pagination">
                                {renderPaginationIcon(currentPage - 1, 'fa-angle-left', hasPrevious)}
                                <>{renderPaginationItems()}</>
                                {renderPaginationIcon(currentPage + 1, 'fa-angle-right', hasNext)}
                            </ul>
                        </div>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </div>
    );
};

export default Sidebar;
