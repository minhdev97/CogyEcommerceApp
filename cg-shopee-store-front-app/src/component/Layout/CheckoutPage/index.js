import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import queryString from 'query-string';
import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBCardText,
    MDBCol,
    MDBContainer,
    MDBIcon,
    MDBRow,
    MDBTypography,
} from 'mdb-react-ui-kit';
import GHTK from '../../../asset/img/GHTK.png';
import {useDispatch, useSelector} from 'react-redux';
import {getCartLines, removeCartLines, selectCartLineList} from '../../../features/cartLine/cartLineSlice';
import '../../../asset/css/checkout/checkout.css';
import {Dropdown} from 'primereact/dropdown';
import {Link} from 'react-router-dom';
import {sendMail} from "../../../api/mailAPI";

import {getCartId, getUser, getUserId} from "../../../service/userService";
import {setHistory} from "../../../features/history/historySlice";
import {CHECKOUT_PAGE, LOGIN_PAGE} from "../../../constant/page";
import {getShippingFeeOfGHTKDeliveryService, saveOrder} from "../../../api/orderAPI";
import {reduceStock} from "../../../api/cartLineAPI";

import {groupCartLinesByShopNameAndSubtotal} from "../../../util/cartUtils";
import {HiBuildingStorefront} from "react-icons/hi2";
import {BsFillBuildingsFill} from "react-icons/bs";
import {RiContactsLine} from "react-icons/ri";
import {FiMapPin} from "react-icons/fi";
import {fetchUserLocations} from "../../../api/locationAPI";
import {Button} from "primereact/button";
import {ZERO} from "../../../constant/number";
import LocationDialog from "../../../component/LocationDialog";
import {saveUserLocation} from "../../../api/userAPI";
import {Tag} from "primereact/tag";

export default function Checkout() {
    const cartId = getCartId();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const parsedQuery = queryString.parse(location.search);
    const cartLineIds = parsedQuery.cartLineIds;
    const cartLineList = useSelector(selectCartLineList); //problem here
    const cartLineSelected = cartLineList?.filter((cartLine) =>
        cartLineIds.includes(cartLine.id)
    );

    const [selectedLocation, setSelectedLocation] = useState(null);
    const [locations, setLocations] = useState([]);
    const [shownLocationDialog, setShownLocationDialog] = useState(false);
    const [defaultAddress, setDefaultAddress] = useState(false);
    const [subTotalMap, setSubTotalMap] = useState({});
    // const [subTotalWeight, setSubTotalWeight] = useState({});
    // const [shippingFeeObject, setShippingFeeObject] = useState({});
    const [totalPrice, setTotalPrice] = useState(ZERO);
    const [showModal, setShowModal] = useState(false);
    const groupedCartLines = groupCartLinesByShopNameAndSubtotal(cartLineSelected);

    useEffect(() => {
        dispatch(setHistory(CHECKOUT_PAGE));
        if (!getUser()) {
            navigate(LOGIN_PAGE);
        }
        dispatch(getCartLines(cartId));

        const subTotalMap = {};
        // const subTotalWeight = {};
        if (cartLineSelected) {
            cartLineSelected.forEach((cartLine) => {
                const shopName = cartLine.shopName;
                if (subTotalMap[shopName]) {
                    subTotalMap[shopName] += cartLine.salePrice * cartLine.quantity;
                    // subTotalWeight[shopName] += cartLine.weight;
                } else {
                    subTotalMap[shopName] = cartLine.salePrice * cartLine.quantity;
                    // subTotalWeight[shopName] = cartLine.weight;
                }
            });
        }
        fetchUserLocations().then(locations => {
            setLocations(locations);
            const _selectedLocation = locations.find(location => location.defaultAddress);
            setSelectedLocation(_selectedLocation);
            // if (_selectedLocation) {
            //     const listRequest = [];
            //     for (const shopName in subTotalWeight) {
            //         listRequest.push({shopName, totalWeight: subTotalWeight[shopName], userLocationId: _selectedLocation.id})
            //     }
            //     const shippingFeeObject = {}
            //     getShippingFeeOfGHTKDeliveryService(listRequest).then(listShippingFee => {
            //         console.log(listShippingFee)
            //         listShippingFee?.map(item => {
            //             const shopName = item.shopName;
            //             shippingFeeObject[shopName] = item.fee;
            //         });
            //     })
            //     setShippingFeeObject(shippingFeeObject);
            // }
        });
        // setSubTotalWeight(subTotalWeight);
        setSubTotalMap(subTotalMap);
    }, [dispatch, cartId]);


    const handleOrder = async () => {
        if (selectedLocation) {
            try {
                sendMail();
                const cartLineIdsArray = cartLineSelected.map((cartLine) => cartLine.id);
                await reduceStock(cartLineIdsArray)
                await dispatch(removeCartLines(cartLineIdsArray));

                const order = {
                    buyerID: getUserId(),
                    status: 'REQUESTING',
                    deliveryService: "GHTK",
                    orderDetailRequestDtoList: cartLineSelected.map((cartLine) => ({
                        quantity: cartLine.quantity,
                        price: cartLine.salePrice,
                        variantID: cartLine.variantID,
                        sellerID: cartLine.sellerID
                    })),
                };

                await saveOrder(order);
                navigate('/order-confirmation');
            } catch (error) {
                console.log("ERROR: " + error);
            }
        } else {
            setShowModal(true);
        }
    };


    const itemLocation = (location) => {
        return (
            <div className="col-12">
                <div className="flex flex-column xl:flex-row xl:align-items-start gap-4 ">
                    <div
                        className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3 mb-2">
                            <div className="d-flex align-items-center gap-2 mb-0 justify-content-between">
                                <div>
                                    <BsFillBuildingsFill size={25}/>
                                    <span className="font-semibold ms-3" style={{fontSize: '1.5rem'}}>{location?.typeAddress}</span>
                                </div>
                            </div>
                            <div className="flex align-items-center gap-3 mt-3 mb-2">
                                <RiContactsLine size={25}/>
                                <strong
                                    className="ms-3 mb-0" style={{fontSize: '1.5rem'}}>{`${location?.deputyName} | ${location?.phoneNumber}`}</strong>
                            </div>

                            <div className="flex align-items-center gap-3 mt-3 mb-3">
                                <span className="flex align-items-center gap-2">
                                    <FiMapPin size={25}/>
                                    <span className="font-semibold ms-3" style={{fontSize: '1.5rem'}}>
                                        {`${location?.address}, ${location?.hamlet}, ${location?.ward}, ${location?.district}, ${location?.province}`}
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const handleOpenLocationDialog = () => {
        if (locations.length === ZERO) {
            setDefaultAddress(true);
        } else {
            setDefaultAddress(false);
        }
        setShownLocationDialog(true);
    }

    const handleHideLocationDialog = () => {
        setShownLocationDialog(false);
    }

    const handleSaveLocation = async (userLocation) => {
        const newLocation = await saveUserLocation(userLocation);
        setLocations([newLocation, ...locations]);
        setShownLocationDialog(false);
    }


    useEffect(() => {
        const total = cartLineSelected.reduce((total, cartLine) => {
            return total + cartLine.salePrice * cartLine.quantity;
        }, 0);
        setTotalPrice(total);
    }, [cartLineSelected]);

    return (
        <section
            className="h-100 h-custom"
            style={{backgroundColor: '#eee', paddingTop: '140px'}}
        >
            <MDBContainer className="py-5 h-100">
                <MDBRow className="justify-content-center align-items-center h-100">
                    <MDBCol size="12">
                        <MDBCard
                            className="card-registration card-registration-2"
                            style={{borderRadius: '15px'}}
                        >
                            <MDBCardBody className="p-0">
                                <MDBRow className="g-0">
                                    <MDBCol lg="8">
                                        <div className="p-5">
                                            <div className="d-flex justify-content-between align-items-center mb-5">
                                                <MDBTypography
                                                    tag="h3"
                                                    className="fw-bold mb-0 text-black"
                                                >
                                                    Your delivery address:
                                                </MDBTypography>
                                                <Button label="Add address"
                                                        icon="pi pi-map-marker"
                                                        size="large"
                                                        className="gradient-custom-2 "
                                                        onClick={handleOpenLocationDialog}
                                                />

                                            </div>
                                            <div className="card flex justify-content-center mt-4 mb-5">
                                                <span className="p-float-label">
                                                <Dropdown inputId="dd-location"
                                                          value={selectedLocation}
                                                          onChange={(e) => setSelectedLocation(e.value)}
                                                          options={locations}
                                                          itemTemplate={itemLocation}
                                                          valueTemplate={() => itemLocation(selectedLocation)}
                                                          optionLabel="deputyName"
                                                          style={{fontSize: '1.5rem'}}
                                                          className="w-full md:w-14rem w-100 mt-1"
                                                />
                                                <label htmlFor="dd-location" style={{fontSize: '1.5rem'}}>Select an address</label>
                                                </span>
                                            </div>
                                            {Object.entries(groupedCartLines).map(([shopName, { cartLines, subTotal }]) => (
                                                <div>
                                                    <h3>
                                                        <HiBuildingStorefront size={20}/>
                                                        <span className="ms-2">Shop: {shopName}</span>
                                                    </h3>
                                                    <hr className="my-4"/>
                                                    {cartLines?.map((cartLine) => (
                                                        <MDBRow
                                                            className="mb-4 d-flex justify-content-between align-items-center"
                                                            key={cartLine.id}
                                                        >
                                                            <MDBCol md="2" lg="2" xl="2">
                                                                <MDBCardImage
                                                                    src={`${cartLine.image}`}
                                                                    fluid
                                                                    className="rounded-3"
                                                                    alt={`${cartLine.productName}`}
                                                                />
                                                            </MDBCol>
                                                            <MDBCol md="3" lg="3" xl="3">
                                                                <MDBTypography
                                                                    tag="h3"
                                                                    className="text-muted fs-3"
                                                                >
                                                                    {cartLine.productName}
                                                                </MDBTypography>
                                                                <MDBTypography
                                                                    tag="h3"
                                                                    className="text-black mb-0 fs-5"
                                                                >
                                                                    {cartLine.color}
                                                                </MDBTypography>
                                                                <MDBTypography
                                                                    tag="h3"
                                                                    className="text-black mb-0 fs-5"
                                                                >
                                                                    {cartLine.size}
                                                                </MDBTypography>
                                                            </MDBCol>
                                                            <MDBCol
                                                                md="3"
                                                                lg="3"
                                                                xl="3"
                                                                className="d-flex align-items-center"
                                                            >
                                                                {cartLine.quantity}
                                                            </MDBCol>
                                                            <MDBCol md="2" className="d-flex justify-content-center">
                                                                <div>
                                                                    <p className="lead fw-normal mb-0 fs-3">
                                                                        {cartLine.salePrice?.toLocaleString('vi-VN', {
                                                                            style: 'currency',
                                                                            currency: 'VND',
                                                                        })}
                                                                    </p>
                                                                </div>
                                                            </MDBCol>
                                                            <MDBCol md="2" className="d-flex justify-content-center">
                                                                <div>
                                                                    <p className="lead fw-normal mb-0 fs-3">
                                                                        {(cartLine.salePrice * cartLine.quantity)?.toLocaleString(
                                                                            'vi-VN',
                                                                            {style: 'currency', currency: 'VND'}
                                                                        )}
                                                                    </p>
                                                                </div>
                                                            </MDBCol>
                                                        </MDBRow>
                                                    ))}
                                                    <hr className="my-4"/>

                                                    <MDBTypography tag="h6" className="mb-0 fs-3 pe-1" style={{ textAlign: 'right' }}>
                                                        {/* Display SubTotal for this shop */}
                                                        <div>
                                                            <div className="mb-1">
                                                                <span>Shipping fee: </span>
                                                                {/*<span>*/}
                                                                {/*    {shippingFeeObject[shopName]?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}*/}
                                                                {/*</span>*/}
                                                                <Tag value={"FREESHIP"} severity="success" style={{fontSize: '100%'}}/>
                                                            </div>

                                                            <br />
                                                            <span>Sub Total: </span>
                                                            <span>
                                                            {subTotal?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                                            </span>
                                                        </div>
                                                        <br/><br/>
                                                    </MDBTypography>
                                                </div>))}



                                            <div className="pt-5">
                                                <MDBTypography tag="h6" className="mb-0 fs-3">
                                                    <MDBCardText
                                                        tag={Link}
                                                        to="/cart"
                                                        className="text-body"
                                                    >
                                                        <MDBIcon
                                                            className="fs-3"
                                                            fas
                                                            icon="long-arrow-alt-left me-2"
                                                        />{' '}
                                                        Back to Cart
                                                    </MDBCardText>
                                                </MDBTypography>
                                            </div>
                                        </div>
                                    </MDBCol>
                                    <MDBCol lg="4" className="bg-grey">

                                        <div className="p-5">
                                            {/*<MDBTypography tag="h3" className="fw-bold mb-5 mt-2 pt-1">*/}
                                            {/*    Summary*/}
                                            {/*</MDBTypography>*/}

                                            {/*<hr className="my-4" />*/}
                                            {/*<div className="card flex justify-content-center fs-3 mb-4">*/}
                                            {/*    <Dropdown*/}
                                            {/*        className="carrier-dropdown"*/}
                                            {/*        value={selectedCarrier}*/}
                                            {/*        onChange={(e) => setSelectedCarrier(e.value)}*/}
                                            {/*        options={carriers}*/}
                                            {/*        optionLabel="name"*/}
                                            {/*        placeholder="Select Your Carrier"*/}
                                            {/*        valueTemplate={selectedCarrierTemplate}*/}
                                            {/*        itemTemplate={carrierOptionTemplate}*/}
                                            {/*    />*/}
                                            {/*</div>*/}

                                            {/*<MDBTypography*/}
                                            {/*    tag="h5"*/}
                                            {/*    className="text-uppercase mb-3"*/}
                                            {/*>*/}
                                            {/*    VOUCHER*/}
                                            {/*</MDBTypography>*/}

                                            {/*<div className="mb-5">*/}
                                            {/*    <MDBInput className="fs-2" label="Enter your code" />*/}
                                            {/*</div>*/}

                                            {/*<hr className="my-4" />*/}
                                            <MDBTypography tag="h3" className="fw-bold mb-5 mt-2 pt-1">
                                                Delivery Service: GHTK Company
                                            </MDBTypography>

                                            <div className="d-flex justify-content-center">
                                                <img src={GHTK} alt={""} className="mt-5 mb-5"/>
                                            </div>

                                            <div className="d-flex justify-content-between mb-5 fs-3">

                                                <MDBTypography tag="h2" className="text-uppercase">
                                                    Total Price
                                                </MDBTypography>
                                                <MDBTypography tag="h2">
                                                    {totalPrice?.toLocaleString('vi-VN', {
                                                        style: 'currency',
                                                        currency: 'VND',
                                                    })}
                                                </MDBTypography>
                                            </div>

                                            <MDBBtn

                                                block
                                                size="lg"
                                                className="fs-3"
                                                style={{
                                                    backgroundColor: 'blue',
                                                    width: '150',
                                                    height: '40px',
                                                    fontSize: '14px',
                                                    borderRadius: '10px',
                                                }}
                                                onClick={handleOrder}
                                            >
                                                Place your order
                                            </MDBBtn>
                                        </div>
                                    </MDBCol>
                                </MDBRow>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>

            {showModal && (
                <div className="modal" style={{display: 'block'}}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Notification</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    aria-label="Close"
                                    onClick={() => setShowModal(false)}
                                ></button>
                            </div>
                            <div className="modal-body text-center">

                                <p style={{ margin: '0 auto' }}>Please choose an address.</p>

                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setShowModal(false)}
                                    style={{fontSize: '100%'}}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <LocationDialog onHideLocationDialog={handleHideLocationDialog}
                            isShown={shownLocationDialog}
                            isSeller={false}
                            onSaveLocation={handleSaveLocation}
                            isDefaultAddress={defaultAddress}
            />
        </section>
    );
}
