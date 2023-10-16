import React, { useEffect, useState } from 'react';
import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBCol,
    MDBContainer,
    MDBRow,
} from 'mdb-react-ui-kit';

//theme
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import Swal from 'sweetalert2';
import swalWithBootstrapButtons from 'sweetalert2';
import 'primereact/resources/primereact.min.css';
import '../../../asset/css/cart/cart.css';
import { Button } from 'primereact/button';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Modal from 'react-bootstrap/Modal';
import { Checkbox } from "primereact/checkbox";
import '../../../asset/css/cart/cart.css';
//core
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeCartLine, selectCartLineList } from '../../../features/cartLine/cartLineSlice';
import {getListStockOfVariantByCartLineIds, updateCartLine} from '../../../api/cartLineAPI';
import {setHistory} from "../../../features/history/historySlice";
import {CART_PAGE, CHECKOUT_PAGE, LOGIN_PAGE} from "../../../constant/page";
import {getNameStore, getUser} from "../../../service/userService";
import { groupCartLinesByShopName } from "../../../util/cartUtils";
import {HiBuildingStorefront} from "react-icons/hi2";
import {EMPTY_STRING} from "../../../constant/string";
import {ProgressSpinner} from "primereact/progressspinner";

export default function CartItem() {
    const [cartLines, setCartLines] = useState([]);
    const [selectAllChecked, setSelectAllChecked] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const [isEmptyCart, setIsEmptyCart] = useState(false);
    const [selectedCartLines, setSelectedCartLines] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [groupedCartLines, setGroupedCartLines] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const cartLineList = useSelector(selectCartLineList);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        setCartLines(cartLineList);
    }, [cartLineList]);

    useEffect(() => {
        setGroupedCartLines(groupCartLinesByShopName(cartLineList));
    }, [cartLineList]);

    useEffect(() => {
        dispatch(setHistory(CART_PAGE));
        if (!getUser()) {
            navigate(LOGIN_PAGE);
        }
    }, []);
    const removeCurrentCartLine = (cartLineId) => {
        Swal.fire({
            title: '<span style="font-size: 100%;">Are you sure?</span>',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(removeCartLine(cartLineId));
                if (cartLines.length === 1) {
                    setIsEmptyCart(true);
                }
                Swal.fire('Deleted!', 'Your cart-line has been deleted.', 'success');
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                swalWithBootstrapButtons.fire('Cancelled', 'You made a great decision', 'error');
            }
        });
    };

    const handleDecreaseQuantity = (shopName, index) => {
        const _groupedCartLines = { ...groupedCartLines };
        const _cartLines = [..._groupedCartLines[shopName]];
        const _cartLine = { ..._cartLines[index] };
        if (_cartLine.quantity <= 1) {
            removeCurrentCartLine(_cartLine.id);
        } else {
            _cartLine.errorNotEnoughStock = EMPTY_STRING;
            _cartLine.quantity = _cartLine.quantity - 1;
            _cartLines[index] = _cartLine;

            _groupedCartLines[shopName] = _cartLines;

            setGroupedCartLines(_groupedCartLines);
            updateCartLine(_cartLine);
        }
    };
    const handleIncreaseQuantity = (shopName, index) => {
        const _groupedCartLines = { ...groupedCartLines };
        const _cartLines = [..._groupedCartLines[shopName]];
        const _cartLine = { ..._cartLines[index] };

        if (_cartLine.quantity >= _cartLine.stock) {
            let message = '';
            if (_cartLine.stock <= 0) {
                message = 'This product is currently out of stock.';
            } else {
                message = `Only ${_cartLine.stock} left in stock.`;
            }
            Swal.fire({
                icon: 'error',
                title: 'Out of Stock',
                html: message,
                confirmButtonText: 'OK',
            });
        } else {
            _cartLine.errorNotEnoughStock = EMPTY_STRING;
            _cartLine.quantity = _cartLine.quantity + 1;
            _cartLines[index] = _cartLine;

            _groupedCartLines[shopName] = _cartLines;

            setGroupedCartLines(_groupedCartLines);

            updateCartLine(_cartLine);
        }
    };

    // useEffect(() => {
    //     let sum = 0;
    //     cartLines.forEach((cartLine) => {
    //         sum += cartLine.salePrice * cartLine.quantity;
    //     });
    //     setTotalPrice(sum.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }));
    // }, [cartLines]);

    const calculateTotalPrice = (groupedCartLines) => {
        let sum = 0;
        Object.entries(groupedCartLines).forEach(([shopName, cartLines]) => {
            cartLines.forEach((cartLine) => {
                sum += cartLine.salePrice * cartLine.quantity;
            });
        });
        return sum.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    };

    useEffect(() => {
        setTotalPrice(calculateTotalPrice(groupedCartLines));
    }, [groupedCartLines]);

    const handleSelectAll = () => {

        const updatedGroupedCartLines = Object.entries(groupedCartLines).map(([shopName, cartLines]) => {
            const updatedCartLines = cartLines.map((cartLine) => ({
                ...cartLine,
                selected: !selectAllChecked,
            }));
            return [shopName, updatedCartLines];
        });

        setGroupedCartLines(Object.fromEntries(updatedGroupedCartLines));

        const updatedSelectedCartLines = updatedGroupedCartLines.flatMap(([_, cartLines]) => cartLines).filter((cartLine) => cartLine.selected);
        setSelectedCartLines(updatedSelectedCartLines);
    };

    const handleBuyNow = async () => {
        setIsLoading(true);
        if (selectedCartLines.length === 0) {
            setIsLoading(false);
            setShowModal(true);
        } else {
            const cartLineIds = [];
            const queryString = selectedCartLines.map((cartLine) => {
                cartLineIds.push(cartLine.id)
                return `cartLineIds=${cartLine.id}`;
            }).join('&');
            const stocks = await getListStockOfVariantByCartLineIds(cartLineIds);
            let isNotEnoughStock = false;
            const updatedGroupedCartLines = Object.entries(groupedCartLines).map(([shopName, cartLines]) => {
                const _cartLines = [...cartLines];
                const updatedCartLines = _cartLines.map((cartLine) => {
                    const _cartLine = {...cartLine};
                    const stock = stocks.find(stock => stock.cartLineId === _cartLine.id);
                    if (stock && stock?.stockOfVariant < _cartLine.quantity) {
                        _cartLine.stock = stock.stockOfVariant;
                        _cartLine.errorNotEnoughStock = `* This product is not enough stock, it has only ${stock.stockOfVariant} stocks`;
                        isNotEnoughStock = true;
                    }
                    return _cartLine;
                });
                return [shopName, updatedCartLines];
            });

            if (isNotEnoughStock) {
                setGroupedCartLines(Object.fromEntries(updatedGroupedCartLines));
                setIsLoading(false);
                return;
            }
            navigate(`/checkout?${queryString}`);
        }
    };
    const handleCheckboxChange = (cartLineId) => {
        const updatedGroupedCartLines = Object.entries(groupedCartLines).map(([shopName, cartLines]) => {
            const updatedCartLines = cartLines.map((cartLine) => {
                if (cartLine.id === cartLineId) {
                    return {
                        ...cartLine,
                        selected: !cartLine.selected,
                    };
                }
                return cartLine;
            });
            return [shopName, updatedCartLines];
        });

        setGroupedCartLines(Object.fromEntries(updatedGroupedCartLines));

        const updatedSelectedCartLines = updatedGroupedCartLines.flatMap(([_, cartLines]) => cartLines).filter((cartLine) => cartLine.selected);
        setSelectedCartLines(updatedSelectedCartLines);

        const allSelected = updatedSelectedCartLines.length === getTotalCartLinesCount(); // Implement getTotalCartLinesCount() to count all cartLines
        setSelectAllChecked(allSelected);
    };

    const getTotalCartLinesCount = () => {
        return Object.values(groupedCartLines).reduce(
            (total, cartLines) => total + cartLines.length,
            0
        );
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <section
            className="vh-100"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.01)', fontSize: '100%', paddingTop: '140px' }}
        >
            {isEmptyCart ? (
                <div
                    className="text-center"
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '68vh',
                    }}
                >
                    <img
                        src="https://i.ibb.co/Y3S4nzF/272-2727925-continue-shopping-empty-cart-png-transparent-png-removebg-preview.png"
                        alt=""
                    />
                    <p className="h3">You have no items in your shopping cart.</p>
                    <MDBBtn
                        size="lg"
                        style={{
                            backgroundColor: 'blue',
                            width: '150px',
                            height: '40px',
                            fontSize: '14px',
                            borderRadius: '10px',
                            marginTop: '20px',
                        }}
                        onClick={() => navigate('/')}
                    >
                        Shop Now
                    </MDBBtn>
                </div>
            ) : (
                <>
                    <MDBContainer style={{marginTop:"50px"}}>
                        <MDBRow className="align-items-center">
                            <MDBCol>
                                <p>
                                    <span className="h2"> </span>
                                </p>
                                <MDBCard className="mb-5">
                                    <MDBCardBody className="p-2">
                                        <MDBRow className="align-items-center">
                                            <MDBCol md="2" className="d-flex justify-content-center">
                                                <div className="float-start">
                                                    <Checkbox
                                                        type="checkbox"
                                                        checked={selectAllChecked}
                                                        onChange={handleSelectAll}
                                                    />
                                                    <span className="fs-3"> Select All</span>
                                                </div>
                                            </MDBCol>
                                            <MDBCol md="2" className="d-flex justify-content-center mb-0">
                                                <div>
                                                    <p className="fs-3 mb-0">Product</p>
                                                </div>
                                            </MDBCol>
                                            <MDBCol md="2" className="d-flex justify-content-center">
                                                <div>
                                                    <p className="fs-3 mb-0">Quantity</p>
                                                </div>
                                            </MDBCol>
                                            <MDBCol md="2" className="d-flex justify-content-center">
                                                <div>
                                                    <p className="fs-3 mb-0">Unit price</p>
                                                </div>
                                            </MDBCol>
                                            <MDBCol md="2" className="d-flex justify-content-center">
                                                <div>
                                                    <p className="fs-3 mb-0">Amount</p>
                                                </div>
                                            </MDBCol>
                                            <MDBCol md="2" className="d-flex justify-content-center">
                                                <div>
                                                    <p className="fs-3 mb-0">Action</p>
                                                </div>
                                            </MDBCol>
                                        </MDBRow>
                                    </MDBCardBody>
                                </MDBCard>
                                {/*xử lý nghiệp vụ phân cartLine theo shop*/}
                                {Object.entries(groupedCartLines).map(([shopName, cartLines]) => (
                                <div>
                                    <h4>
                                        <HiBuildingStorefront size={20}/>
                                        <span className="ms-2">Shop: {shopName}</span>
                                    </h4>
                                {cartLines?.map((cartLine, index) => (
                                    <>
                                        <MDBCard className="mb-4" key={cartLine.id}>
                                            <MDBCardBody className="p-4">
                                                <MDBRow className="align-items-center">
                                                    <MDBCol md="2" style={{ display: 'flex' }}>
                                                        <div className="d-flex align-items-center">
                                                            <Checkbox
                                                                id={`selectProduct${cartLine.id}`}
                                                                type="checkbox"
                                                                checked={cartLine.selected}
                                                                onChange={() => handleCheckboxChange(cartLine.id)}
                                                            />
                                                        </div>

                                                        <label htmlFor={`selectProduct${cartLine.id}`}
                                                               onClick={() => handleCheckboxChange(cartLine.id)}
                                                        >
                                                            <MDBCardImage
                                                                fluid
                                                                src={`${cartLine.image}`}
                                                                alt="Generic placeholder image"
                                                                width="120px"
                                                                style={{ marginLeft: 10 }}
                                                            />
                                                        </label>
                                                    </MDBCol>
                                                    <MDBCol md="2" className="justify-content-center">
                                                        <div>
                                                            <p className="lead fw-normal mb-0 fs-3">{`${cartLine.productName}`}</p>
                                                        </div>
                                                        <div>
                                                            <p className="lead fw-normal mb-0">{`${cartLine.color}`}</p>
                                                        </div>
                                                        <div>
                                                            <p className="lead fw-normal mb-0">{`${cartLine.size}`}</p>
                                                        </div>
                                                    </MDBCol>
                                                    <MDBCol>
                                                        <div className="d-flex flex-column">
                                                            <div className="quantity-input d-flex justify-content-center" >
                                                                <button
                                                                    className="decrease-button"
                                                                    onClick={() => handleDecreaseQuantity(shopName, index)}
                                                                >
                                                                    -
                                                                </button>
                                                                <input
                                                                    type="number"
                                                                    className="quantity-value"
                                                                    value={cartLine.quantity}
                                                                    min={0}
                                                                />
                                                                <button
                                                                    className="increase-button"
                                                                    onClick={() => handleIncreaseQuantity(shopName, index)}
                                                                >
                                                                    +
                                                                </button>
                                                            </div>
                                                            <div>
                                                                <small className="p-error col-12">
                                                                    {cartLine.errorNotEnoughStock}
                                                                </small>
                                                            </div>
                                                        </div>
                                                    </MDBCol>
                                                    <MDBCol md="2" className="d-flex justify-content-center">
                                                        <div>
                                                            <p className="lead fw-normal mb-0 fs-3">
                                                                {cartLine.salePrice.toLocaleString('vi-VN', {
                                                                    style: 'currency',
                                                                    currency: 'VND',
                                                                })}
                                                            </p>
                                                        </div>
                                                    </MDBCol>
                                                    <MDBCol md="2" className="d-flex justify-content-center">
                                                        <div>
                                                            <p className="lead fw-normal mb-0 fs-3">
                                                                {(
                                                                    cartLine.salePrice * cartLine.quantity
                                                                ).toLocaleString('vi-VN', {
                                                                    style: 'currency',
                                                                    currency: 'VND',
                                                                })}
                                                            </p>
                                                        </div>
                                                    </MDBCol>
                                                    <MDBCol md="2" className="d-flex justify-content-center">
                                                        <div>
                                                            <div className="card flex justify-content-center">
                                                                <div className="flex flex-wrap gap-4">
                                                                    <Button
                                                                        severity="help"
                                                                        outlined
                                                                        label="Delete"
                                                                        className="p-button-success"
                                                                        style={{ fontSize: '14px' }}
                                                                        onClick={() => {
                                                                            removeCurrentCartLine(cartLine.id);
                                                                        }}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </MDBCol>
                                                </MDBRow>
                                            </MDBCardBody>
                                        </MDBCard>
                                    </>
                                ))}
                                </div>
                                ))}
                                <MDBCard className="mb-5">
                                    <MDBCardBody className="p-4">
                                        <div className="float-end">
                                            <p className="mb-0 me-5 d-flex align-items-center">
                                                <span className="text-muted me-2 fs-2">Total:</span>
                                                <span className="lead fw-normal fs-3">{`${totalPrice}`}</span>
                                            </p>
                                        </div>
                                    </MDBCardBody>
                                </MDBCard>
                                <div className="d-flex justify-content-end">
                                    {isLoading
                                    ? <ProgressSpinner style={{width: '50px', height: '50px'}}
                                                       strokeWidth="8"
                                                       fill="var(--surface-ground)"
                                                       animationDuration=".5s"/>
                                    :  <MDBBtn
                                            size="lg"
                                            style={{
                                                backgroundColor: 'blue',
                                                width: '150',
                                                height: '40px',
                                                fontSize: '14px',
                                                borderRadius: '10px',
                                            }}
                                            onClick={handleBuyNow}
                                        >
                                            Purchase
                                        </MDBBtn>
                                    }

                                </div>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                    <Modal show={showModal} onHide={handleCloseModal} centered>
                        <Modal.Header closeButton>
                            <Modal.Title>Thông báo</Modal.Title>
                        </Modal.Header>
                        <Modal.Body className="text-center">Chưa có sản phẩm nào được chọn</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseModal} style={{ fontSize: '100%' }}>
                                Đóng
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </>
            )}
        </section>
    );
}
