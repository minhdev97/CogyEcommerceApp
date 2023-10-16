import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    select20SuggestProducts,
    selectSuccessProducts, setSuccessProducts, show20SuggestProducts,
} from "../../features/product/homeProductSlice";
import {Link} from "react-router-dom";
import {PRODUCT_DETAIL_PAGE} from "../../constant/page";

const Top20SuggestProduct = () => {
    const [products, setProducts] = useState([]);
    const dispatch = useDispatch();
    const top20SuggestProduct = useSelector(select20SuggestProducts);
    const success = useSelector(selectSuccessProducts);
    const get20SuggestProducts = () => {
        const getProductByPageNumber = async () => {
            !success && (await dispatch(show20SuggestProducts()));
        };

        getProductByPageNumber().then(() => {
            if (success) {
                setProducts(top20SuggestProduct);
                dispatch(setSuccessProducts(false));
            }
        })
    }
    useEffect(() => {
        get20SuggestProducts();
    },[top20SuggestProduct]);
    return (
        <div>
            <div style={{
                borderBottom: "3px solid blue",
                color: 'blue',
                fontSize: 22,
                padding: 20,
                backgroundColor: "#fff",
                fontFamily: "Roboto,sans-serif"
            }}>
                <strong>TOP 20 SUGGESTION</strong>
            </div>
            <div className="home-product" style={{backgroundColor: "#fff"}}>
                <div className="row sm-gutter" style={{paddingLeft: 40}}>
                    {products?.map((product) => (<div className="col l-2 m-4 c-6" key={product.id}>
                        <Link to={`${PRODUCT_DETAIL_PAGE}/${product.id}`}>
                            <div className="home-product-item">
                                <div className="home-product-item__img"
                                     style={{backgroundImage: `url(${product.image})`}}>
                                </div>
                                <h4 className="home-product-item__name">
                                    {product.name}
                                </h4>
                                <div className="home-product-item__price">
                                    {product.vouchers === null ?
                                        <>
                                                <span
                                                    className="home-product-item__price-current">
                                                    {new Intl.NumberFormat('vi-VN', {
                                                        style: 'currency', currency: 'VND'
                                                    }).format(product.minPriceOfVariants)}
                                                </span>
                                        </>
                                        :
                                        <>
                                                <span
                                                    className="home-product-item__price-old">
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
                                        {/*<i className="home-product-item__like-icon-empty fa-regular fa-eye"/>*/}
                                            <i className="home-product-item__like-icon-fill fa-solid fa-eye"/>
                                            <span className="home-product-item__view ms-1">{product.view}</span>
                                        </span>
                                    <span
                                        className="home-product-item__sold">{product.numberOfPurchase} đã bán</span>
                                </div>
                                <div className="home-product-item__origin">
                                    <span className="home-product-item__brand">{product.province}</span>
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
                    </div>))}
                </div>
            </div>
        </div>);
};

export default Top20SuggestProduct;
