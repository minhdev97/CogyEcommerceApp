import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import {SelectButton} from 'primereact/selectbutton';
import {Rating} from 'primereact/rating';
import {TabView, TabPanel} from 'primereact/tabview';
import ReactHtmlParser from 'react-html-parser';
import '../../asset/css/other/detail.css';

import {findProductDetailById} from '../../api/productDetailAPI';
import ImageDisplay from './ImageDisplay';
import AddToCartAndBuyNow from './AddToCartAndBuyNow';
import RelatedProducts from './RelatedProducts';
import {findTop10ViewRelatedProducts} from '../../api/subCategoryAPI';
import {CATEGORY_PAGE} from '../../constant/page';
import BreadCrumbs from './Breadcrumb';
import {TbListDetails} from "react-icons/tb";
import {BiMessageAltDetail} from "react-icons/bi";
import {ZERO} from "../../constant/number";


function ProductDetail() {
    const {id} = useParams();
    const [product, setProduct] = useState({});
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [colorSelected, setColorSelected] = useState(null);
    const [colors, setColors] = useState([]);
    const [sizeSelected, setSizeSelected] = useState(null);
    const [sizes, setSizes] = useState([]);
    const [quantitySelected, setQuantitySelected] = useState(1);
    const [variant, setVariant] = useState({});
    const [rating, setRating] = useState(0);
    const [percentDiscounts, setPercentDiscounts] = useState([]);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await findProductDetailById(id);
                const data = response.data;
                setProduct(data);
                setPercentDiscounts(data.vouchers);
                const response2 = await findTop10ViewRelatedProducts(id);
                const data2 = response2.data;
                setRelatedProducts(data2);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        fetchProduct();

        //create rating random
        const generateRating = () => {
            const randomValue = (Math.floor(Math.random() * 10) + 1) / 2;
            return randomValue.toFixed(1);
        };
        setRating(generateRating());

        // //create percent discount list random
        // const generateRandomPercentDiscounts = (min, max, count) => {
        //     const percentDiscounts = [];
        //     for (let i = 0; i < count; i++) {
        //         const randomPercent = Math.floor(Math.random() * (max - min + 1) + min);
        //         percentDiscounts.push(`${randomPercent}%`);
        //     }
        //     return percentDiscounts;
        // };
    }, [id]);

    const {
        name,
        description,
        variants,
        view,
        numberOfPurchase,
        definitionOfColor,
        definitionOfSize,
        subCategory,
        category,
        shop,
    } = product;

    //render variant has min price
    useEffect(() => {
        if (!colorSelected && !sizeSelected && variants && variants.length > 0) {
            const minPriceVariant = variants.reduce((minVariant, currentVariant) => {
                if (currentVariant.salePrice && (!minVariant || currentVariant.salePrice < minVariant.salePrice)) {
                    return currentVariant;
                }
                return minVariant;
            }, null);

            if (minPriceVariant) {
                setVariant(minPriceVariant);
                setColorSelected(minPriceVariant.color);
                setSizeSelected(minPriceVariant.size);
            }
        }
    }, [colorSelected, sizeSelected, variants]);

    useEffect(() => {
        if (colorSelected && sizeSelected && variants && variants.length > 0) {
            const updatedVariant = variants.find(
                (variant) => variant.color === colorSelected && variant.size === sizeSelected,
            );

            if (updatedVariant) {
                setVariant(updatedVariant);
            }
        }
    }, [colorSelected, sizeSelected, variant, variants]);

    //handle color and size
    useEffect(() => {
        const uniqueColors = (variants ?? []).reduce((color, variant) => {
            const colorExists = color.find((item) => item === variant.color);
            if (!colorExists) {
                color.push(variant.color);
            }
            return color;
        }, []);

        const uniqueSizes = (variants ?? []).reduce((size, variant) => {
            const sizeExists = size.find((item) => item === variant.size);
            if (!sizeExists) {
                size.push(variant.size);
            }
            return size;
        }, []);

        const colorOptions = uniqueColors.map((color) => ({
            value: color,
            constant: false,
        }));

        const sizeOptions = uniqueSizes.map((size) => ({
            value: size,
            constant: false,
        }));

        setColors(colorOptions);
        setSizes(sizeOptions);
    }, [variants]);

    const handleColorChange = (color) => {
        if (color) {
            setColorSelected(color);

            const variantsByColor = variants.filter((variant) => variant.color === color);
            const sizesByColor = variantsByColor.map((variant) => variant.size).filter(Boolean);

            const updatedSizes = sizes.map((size) => ({
                ...size,
                constant: !sizesByColor.includes(size.value),
            }));

            setSizes(updatedSizes);

            if (!sizesByColor.includes(sizeSelected)) {
                setSizeSelected(updatedSizes.find((size) => !size.constant)?.value || null);
            }
        }
    };

    const handleSizeChange = (size) => {
        setSizeSelected(size);
    };

    const handleQuantityChange = (e) => {
        const quantity = parseInt(e.target.value);
        setQuantitySelected(quantity);
    };

    const increaseQuantity = () => {
        if (quantitySelected < variant.stock) {
            setQuantitySelected(quantitySelected + 1);
        }
    };

    const decreaseQuantity = () => {
        if (quantitySelected > 1) {
            setQuantitySelected(quantitySelected - 1);
        }
    };

    const handleDecreaseTempStock = () => {
        const _product = {...product};
        _product.variants = _product.variants?.map(variant => {
            if (variant.color === colorSelected && variant.size === sizeSelected) {
                variant.stock = variant.stock - quantitySelected;
                if (variant.stock === ZERO) {
                    setQuantitySelected(ZERO);
                }
            }
            return variant;
        })
        setProduct(_product);
    }
    // const highestDiscount = percentDiscounts.reduce((highest, currentDiscount) => {
    //     // Extract the numeric value from the discount based on its type
    //     const currentValue = currentDiscount.type === 'MONEY' ? currentDiscount.value : parseFloat(currentDiscount.value);
    //
    //     // Extract the numeric value from the highest discount (if available)
    //     const highestValue = highest ? (highest.type === 'MONEY' ? highest.value : parseFloat(highest.value)) : 0;
    //
    //     // Compare the current discount value with the highest discount value
    //     return currentValue > highestValue ? currentDiscount : highest;
    // }, null);

    return (
        <div className="app__banner variant-ground">
            <div className="grid wide" style={{paddingTop: '2rem', paddingBottom: '2rem'}}>
                <div className="row sm-gutter app__banner-content container">
                    <BreadCrumbs category={category} subCategory={subCategory} name={name}/>
                    <div className="col l-12 m-12 c-12">
                        <div className="variant-content">
                            <div className="image-size">
                                <ImageDisplay product={product}/>
                                <div className="share">
                                    <div style={{marginLeft: '2rem', marginRight: '2rem'}}>Share:</div>
                                    <img
                                        src="https://frontend.tikicdn.com/_desktop-next/static/img/pdp_revamp_v2/social-facebook.svg"
                                        alt="social-facebook"
                                        style={{paddingRight: '1rem'}}
                                    />
                                    <img
                                        src="https://frontend.tikicdn.com/_desktop-next/static/img/pdp_revamp_v2/social-messenger.svg"
                                        alt="social-messenger"
                                        style={{paddingRight: '1rem'}}
                                    />
                                    <img
                                        src="https://frontend.tikicdn.com/_desktop-next/static/img/pdp_revamp_v2/social-pinterest.svg"
                                        alt="social-pinterest"
                                        style={{paddingRight: '1rem'}}
                                    />
                                    <img
                                        src="https://frontend.tikicdn.com/_desktop-next/static/img/pdp_revamp_v2/social-twitter.svg"
                                        alt="social-twitter"
                                        style={{paddingRight: '1rem'}}
                                    />
                                    <img
                                        src="https://frontend.tikicdn.com/_desktop-next/static/img/pdp_revamp_v2/social-copy.svg"
                                        alt="social-copy"
                                        style={{paddingRight: '1rem'}}
                                    />
                                </div>
                            </div>
                            <div className="details-column">
                                <span className="product-info">{name}</span>
                                <div className="price-container">
                                    <span style={{width: 'auto', paddingRight: '1rem'}} className="div-style">
                                        {rating}
                                    </span>
                                    <div className="card flex justify-content-center" style={{width: '110px'}}>
                                        <Rating value={rating} readOnly cancel={false}/>
                                    </div>
                                    <div className="div-width">
                                        <span className="div-style">{view}</span>views
                                    </div>
                                    <div className="div-width">
                                        <span className="div-style">{numberOfPurchase}</span>purchases
                                    </div>
                                </div>
                                <div className="price-container">
                                    {variant && (
                                        <div className="sale-price">
                                            {
                                                ( percentDiscounts.length === 0 || variant.discountPrice === null )
                                                    ?
                                                    <>
                                                       <span className="detail-product-item__price-current">
                                                        {variant?.salePrice ? variant?.salePrice.toLocaleString('vi-VN') : ''}
                                                    </span>
                                                        <span style={{
                                                            fontSize: 'xx-large',
                                                            verticalAlign: 'text-top'
                                                        }}>₫</span>
                                                    </>
                                                    :
                                                    <>
                                                    <span className="detail-product-item__price-old">
                                                        {variant?.salePrice ? variant?.salePrice.toLocaleString('vi-VN') : ''}
                                                    </span>
                                                        <span className="detail-product-item__price-current">
                                                        {variant.discountPrice ? variant.discountPrice.toLocaleString('vi-VN') : ''}
                                                    </span>
                                                        <span style={{
                                                            fontSize: 'xx-large',
                                                            verticalAlign: 'text-top'
                                                        }}>₫</span>
                                                    </>
                                            }
                                        </div>
                                    )}
                                    <div style={{
                                        width: 120,
                                        backgroundColor: "blue",
                                        color: "white",
                                        marginLeft: 20
                                    }} align={'center'}>
                                        {product.vouchers && product.vouchers.length > 0 ? (
                                            <span>
                                                {product.vouchers[0]?.type === 'MONEY' ?
                                                    new Intl.NumberFormat('vi-VN', {
                                                        style: 'currency',
                                                        currency: 'VND'
                                                    }).format(product.vouchers[0]?.value) + ' GIẢM' : product.vouchers[0]?.value + '% GIẢM'}
                                            </span>
                                        ) : null}
                                    </div>
                                </div>
                                <div className="flex justify-content-center select-options">
                                    {/*<div className="option-group">*/}
                                    {/*    <span className="span-style">Voucher</span>*/}
                                    {/*    <>*/}
                                    {/*        {percentDiscounts?.map((percentDiscount) => (*/}
                                    {/*            <div className="header__cart-wrap">*/}
                                    {/*                  <span*/}
                                    {/*                      key={percentDiscount.id}*/}
                                    {/*                      className="card flex flex-wrap gap-2 percent-discount"*/}
                                    {/*                  >*/}
                                    {/*                {percentDiscount.type === 'MONEY' ?*/}
                                    {/*                    new Intl.NumberFormat('vi-VN', {*/}
                                    {/*                        style: 'currency',*/}
                                    {/*                        currency: 'VND'*/}
                                    {/*                    }).format(percentDiscount.value) : percentDiscount.value + '%'}*/}
                                    {/*                </span>*/}
                                    {/*                <div className="header__cart-list">*/}
                                    {/*                    <div>*/}
                                    {/*                        <p>Mã giảm giá của Shop :*/}
                                    {/*                            {percentDiscount.code}*/}
                                    {/*                        </p>*/}
                                    {/*                        <p>Đơn tối thiểu :*/}
                                    {/*                            {new Intl.NumberFormat('vi-VN', {*/}
                                    {/*                                style: 'currency',*/}
                                    {/*                                currency: 'VND'*/}
                                    {/*                            }).format(percentDiscount.requirement)}*/}
                                    {/*                        </p>*/}
                                    {/*                    </div>*/}
                                    {/*                </div>*/}
                                    {/*            </div>*/}
                                    {/*        ))}*/}
                                    {/*    </>*/}
                                    {/*</div>*/}
                                    <div className="option-group">
                                        <span className="span-style">Transport</span>
                                    </div>
                                    <div className="option-group">
                                        <span className="span-style">{definitionOfColor}</span>
                                        <SelectButton
                                            value={colorSelected}
                                            onChange={(e) => handleColorChange(e.value)}
                                            options={colors}
                                            optionLabel="value"
                                            optionDisabled="constant"
                                            className="props-select"
                                        />
                                    </div>
                                    <div className="option-group">
                                        <span className="span-style">{definitionOfSize}</span>
                                        <SelectButton
                                            value={sizeSelected}
                                            onChange={(e) => handleSizeChange(e.value)}
                                            options={sizes}
                                            optionLabel="value"
                                            optionDisabled="constant"
                                            className="props-select"
                                        />
                                    </div>
                                    <div className="option-group">
                                        <span className="span-style">Stock</span>

                                        <div className="quantity-input">
                                            <button onClick={decreaseQuantity} className="decrease-button">
                                                -
                                            </button>
                                            <input
                                                type="number"
                                                max={variant.stock}
                                                className="white-bg black-border"
                                                value={quantitySelected}
                                                onChange={handleQuantityChange}
                                                min={variant.stock === 0 ? 0 : 1}
                                            />
                                            <button onClick={increaseQuantity} className="increase-button">
                                                +
                                            </button>
                                        </div>
                                        <span className="span-style quantity-in-stock">
                                            {variant.stock} products available
                                        </span>
                                    </div>
                                </div>
                                <AddToCartAndBuyNow
                                    variant={variant}
                                    colorSelected={colorSelected}
                                    sizeSelected={sizeSelected}
                                    quantitySelected={quantitySelected}
                                    shop={shop}
                                    onAddToCart={handleDecreaseTempStock}
                                />
                            </div>
                        </div>
                        <div className="variant-ground"></div>
                        <div className="variant-description">
                            <div style={{display: 'flex', alignItems: 'center'}}>
                                <div style={{marginRight: '2rem',paddingLeft:10}} className="shop">
                                    Shop:
                                </div>
                                {/*<Link to={`${CATEGORY_PAGE}/${shop?.id}`} style={{textTransform: 'uppercase'}}>*/}
                                {/*    {shop?.name}*/}
                                {/*</Link>*/}
                                <div style={{textTransform: 'uppercase',color:"blue",fontSize:15}}>
                                    {shop?.name}
                                </div>
                            </div>

                        </div>
                        <div className="variant-ground" style={{height: '2rem'}}></div>
                        <div className="description-review">
                            <div className="tab-card">
                                <TabView>
                                    <TabPanel
                                        header="Information"
                                        // leftIcon={<i className="pi pi-book mr-2" style={{ fontSize: '2.5rem' }} />}
                                        leftIcon={<TbListDetails size={25} className="pr-5"/>}
                                        style={{fontSize: '2rem', marginLeft: '5rem'}}
                                    >
                                        <div style={{display: 'flex', alignItems: 'center'}}>
                                            <div className="description">Category:</div>
                                            <Link
                                                to={`${CATEGORY_PAGE}/${category?.name}.${category?.id}?pageNumber=1`}
                                                style={{textTransform: 'uppercase'}}
                                            >
                                                {category?.name}
                                            </Link>
                                            <div style={{marginLeft: '2rem', marginRight: '2rem'}}>&gt;</div>
                                            <Link
                                                to={`${CATEGORY_PAGE}/${category?.name}.${category?.id}.${subCategory?.id}?pageNumber=1`}
                                                style={{textTransform: 'uppercase'}}
                                            >
                                                {subCategory?.name}
                                            </Link>
                                        </div>
                                        <div style={{display: 'flex', alignItems: 'center'}}>
                                            <div className="description">Product:</div>
                                            <div style={{textTransform: 'uppercase', color: '#232222'}}>{name}</div>
                                        </div>
                                        <div style={{display: 'flex', alignItems: 'center'}}>
                                            <div className="description">Description:</div>
                                            <div style={{color: '#232222', textAlign: 'justify'}}>
                                                {ReactHtmlParser(description)}
                                            </div>
                                        </div>
                                    </TabPanel>
                                    <TabPanel
                                        header="Review"
                                        // rightIcon={<i className="pi pi-comment ml-2" style={{ fontSize: '2.5rem' }} />}
                                        leftIcon={<BiMessageAltDetail size={30}/>}
                                        style={{fontSize: '2rem', marginLeft: '4rem'}}
                                    >
                                        <p>Review here!!!!</p>
                                    </TabPanel>
                                </TabView>
                            </div>
                        </div>
                        <div className="variant-ground" style={{height: '2rem'}}></div>
                        <div className="variant-description">
                            <div style={{paddingRight: '1rem'}} className="shop">
                                Related products
                            </div>
                        </div>
                        <div>
                            {relatedProducts.length !== 0 && <RelatedProducts relatedProducts={relatedProducts}/>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
        ;
}

export default ProductDetail;
