import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';
import { CART_PAGE } from '../../../../constant/page';
import {
    getCartLines,
    selectCartLineList
} from '../../../../features/cartLine/cartLineSlice';
import { getCartId } from '../../../../service/userService';

function CartLayout() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cartId = getCartId();
    const cartLineList = useSelector(selectCartLineList);
    const [firstRender, setFirstRender] = useState(true);
    const [cartLines, setCartLines] = useState([]);

    const goToCart = () => {
        navigate(CART_PAGE);
    };


    useEffect(() => {
        if (cartId === null) {
            setCartLines([]);
        } else if (cartId !== null && firstRender === true) {
            dispatch(getCartLines(cartId));
            setCartLines(cartLineList);
            setFirstRender(false);
        } else if (cartId !== null && firstRender === false) {
            setCartLines(cartLineList);
        }
    }, [cartLineList]);

    return (
        <div className="header__cart">
            <div className="header__cart-wrap">
                <i className="header__cart-icon fa-solid fa-cart-shopping"
                   onClick={goToCart}
                />
                {cartLines.length > 0 && (<span className="header__cart-notice">{cartLines.length}</span>)}
                <div className="header__cart-list">
                    {cartLines.length === 0 ? (
                        <div style={{ textAlign: 'center' }}>
                            <img
                                src="https://i.ibb.co/Y3S4nzF/272-2727925-continue-shopping-empty-cart-png-transparent-png-removebg-preview.png"
                                alt=""
                                style={{ width: '300px', height: '200px' }}
                            />
                            <span style={{ display: 'block', marginTop: '16px', fontSize: '1.5rem' }}>No products</span>
                        </div>
                    ) : (
                        <div>
                            <h4
                                style={{
                                    textAlign: 'left',
                                    margin: '16px 0 8px 12px',
                                    fontSize: '1.4rem',
                                    color: '#332dee',
                                    fontWeight: 400,
                                }}
                            >
                                Products
                            </h4>
                            <ul className="header__cart-list-item">
                                {cartLines.map((cartLine, index) => (
                                    <li className="header__cart-item" key={index}>
                                        <img src={cartLine.image} alt="cart-item" className="header__cart-img" />
                                        <div className="header__cart-item-info">
                                            <div className="header__cart-item-head">
                                                <h5 className="header__cart-item-name">{cartLine.productName}</h5>
                                                <div className="divheader__cart-item-price-wrap">
                                                    <span className="header__cart-item-price">
                                                        {cartLine.salePrice.toLocaleString('vi-VN')}₫
                                                    </span>
                                                    <span className="header__cart-item-multiply">x</span>
                                                    <span className="header__cart-item-qnt">{cartLine.quantity}</span>
                                                    <span className="header__cart-item-multiply">=</span>
                                                    <span className="header__cart-item-price">
                                                        {(cartLine.salePrice * cartLine.quantity).toLocaleString(
                                                            'vi-VN',
                                                        )}
                                                        ₫
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {cartId !== null && (
                        <Button
                            onClick={goToCart}
                            style={{
                                color: '#332dee',
                                backgroundColor: 'white',
                                fontSize: '1.5rem',
                                fontWeight: 500,
                            }}
                            className="header__cart-view-cart btn-header btn--primary"
                        >
                            Your cart
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CartLayout;
