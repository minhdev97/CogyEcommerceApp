import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link, useSearchParams} from "react-router-dom";
import {
    selectProductListByPageNumber, selectSuccessProducts, setSuccessProducts, showProductsByPageNumber
} from "../../../features/product/homeProductSlice";
import {PRODUCT_DETAIL_PAGE} from "../../../constant/page";


const DailyDiscover = () => {
    const [products, setProducts] = useState([]);
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const page = Number(searchParams.get('pageNumber'));
    const productList = useSelector(selectProductListByPageNumber);
    const success = useSelector(selectSuccessProducts);


    const getProductByPageNumber = (pageNumber) => {
        const getProductByPageNumber = async (pageNumber) => {
            !success && (await dispatch(showProductsByPageNumber(pageNumber)));
        };

        getProductByPageNumber(pageNumber).then(() => {
            if (success) {
                console.log(productList)
                setProducts(productList.content);
                dispatch(setSuccessProducts(false));
            }
        })
    }
    useEffect(() => {
        getProductByPageNumber(page - 1);
    }, [productList]);

    return (<div>
            <div style={{
                borderBottom: "3px solid blue",
                color: 'blue',
                fontSize: 22,
                padding: 20,
                backgroundColor: "#fff",
                fontFamily: "Roboto,sans-serif"
            }}>
                <strong>GỢI Ý HÔM NAY</strong>
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

export default DailyDiscover;


{
    /*<div className="home-product-item__rating">*/
}
{
    /*    <i className="home-product-item__star--gold fa-solid fa-star"/>*/
}
{
    /*    <i className="home-product-item__star--gold fa-solid fa-star"/>*/
}
{
    /*    <i className="home-product-item__star--gold fa-solid fa-star"/>*/
}
{
    /*    <i className="home-product-item__star--gold fa-solid fa-star"/>*/
}
{
    /*    <i className=" fa-solid fa-star"/>*/
}
{
    /*</div>*/
}