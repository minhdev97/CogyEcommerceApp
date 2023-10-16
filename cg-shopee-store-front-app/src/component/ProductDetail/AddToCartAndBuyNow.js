import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import '../../asset/css/other/detail.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { CART_PAGE, LOGIN_PAGE } from '../../constant/page';
import { addToCart } from '../../features/cartLine/cartLineSlice';
import { getCartId, getSellerId, getUser } from '../../service/userService';

function AddToCartAndBuyNow({ variant, colorSelected, sizeSelected, quantitySelected, shop, onAddToCart }) {
    const dispatch = useDispatch();
    const toast = useRef(null);
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const user = getUser();
    const sellerId = getSellerId();
    const cartId = getCartId();

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage('');
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [message]);

    //handle message
    const getMessage = () => {
        if (user === null) {
            setMessage('*Please login or register to buy this product!');
            setTimeout(() => {
                navigate(LOGIN_PAGE);
            }, 2000);
        } else if (sellerId !== null && shop.id && shop.id === sellerId) {
            setMessage('*This product belongs to your shop!');
        } else if (!colorSelected || !sizeSelected) {
            setMessage('*Please select a variation!');
        } else if (colorSelected && sizeSelected && variant && quantitySelected > variant.stock) {
            setMessage('*Please choose the amount again!');
        }
    };

    //handle button add to cart and buy now
    const handleAddToCart = () => {
        getMessage();
        if (user !== null && shop.id && shop.id !== sellerId) {
            const cartLine = {
                variantId: variant.id,
                quantity: quantitySelected,
                cartId: cartId,
            };
            if (
                colorSelected &&
                sizeSelected &&
                variant &&
                variant.stock !== 0 &&
                quantitySelected <= variant.stock &&
                quantitySelected > 0
            ) {
                try {
                    dispatch(addToCart(cartLine));
                } catch (error) {
                    console.error('Error add to cart:', error);
                }
                const show = () => {
                    toast.current.show({ severity: 'info', summary: 'Add ro cart', detail: 'Success!' });
                };
                show();
                onAddToCart();
            }
        }
    };

    const handleBuyNow = async () => {
        getMessage();
        if (user !== null && shop.id && shop.id !== sellerId) {
            const cartLine = {
                variantId: variant.id,
                quantity: quantitySelected,
                cartId: cartId,
            };
            if (
                colorSelected &&
                sizeSelected &&
                variant &&
                variant.stock !== 0 &&
                quantitySelected <= variant.stock &&
                quantitySelected > 0
            ) {
                try {
                    dispatch(addToCart(cartLine));
                } catch (error) {
                    console.error('Error add to cart:', error);
                }
                navigate(CART_PAGE);
            }
        }
    };

    return (
        <>
            <div>
                {shop?.id !== sellerId && (
                    <div>
                        <div className="button-container">
                            <div className="button-card flex justify-content-center">
                                <Toast ref={toast} />
                                <Button
                                    type="button"
                                    onClick={handleAddToCart}
                                    label="Add to cart"
                                    className="custom-button"
                                />
                            </div>
                            <div className="button-card flex justify-content-center">
                                <Button onClick={handleBuyNow} label="Buy now" className="custom-button" />
                            </div>
                        </div>
                        <div className={`message ${message ? 'show' : ''}`}>{message && <h3>{message}</h3>}</div>
                    </div>
                )}
            </div>
        </>
    );
}

export default AddToCartAndBuyNow;
