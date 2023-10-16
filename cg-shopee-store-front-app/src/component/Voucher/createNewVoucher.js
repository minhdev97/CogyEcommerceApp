import React, { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Calendar } from 'primereact/calendar';
import { MultiSelect } from 'primereact/multiselect';

import '../../asset/css/other/voucher.css';
import { findProductsBySellerId } from '../../api/voucherAPI';
import { getSellerId, getToken } from '../../service/userService';
import { useDispatch } from 'react-redux';
import { createVoucher } from '../../features/voucher/voucherSlice';
import isEmpty from "validator/es/lib/isEmpty";
import {ERROR_EMPTY_INPUT, ERROR_EXCEED_PERCENT, ERROR_EXCEED_VALUE} from "../../constant/errorMessage";
import {EMPTY_STRING} from "../../constant/string";
import {formatStringVNDPrice, formatVNDPrice} from "../../formater";
import classNames from "classnames";
import {newVoucher, validateAllFieldOfVoucher} from "../../service/voucherService";

function CreateNewVoucher() {
    const dispatch = useDispatch();
    const [visible, setVisible] = useState(false);

    const sellerId = getSellerId();
    const token = getToken();

    const [products, setProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);

    const [subCategories, setSubCategories] = useState([]);
    const [selectedSubCategories, setSubSelectedCategories] = useState([]);

    const [voucherDetail,setVoucherDetail] = useState(newVoucher);

    const [type, setType] = useState(null);
    const types = [
        { name: 'MONEY', value: 'MONEY' },
        { name: 'PERCENT', value: 'PERCENT' },
    ];

    const [scope, setScope] = useState(null);
    const scopes = [
        // { name: 'ALL PRODUCTS', value: 'ALL' },
        // { name: 'CATEGORIES', value: 'SUBCATEGORIES' },
        { name: 'SPECIFIC PRODUCTS', value: 'PRODUCTS' },
    ];
    const [errorType, setErrorType] = useState(EMPTY_STRING);
    const [hasErrors, setHasErrors] = useState(false);
    const minPriceOfProductsList = Math.min(...selectedProducts?.map(product => product.minPriceOfVariants))
    useEffect(() => {
        const fetchData = async () => {
            try {
                const productList = await findProductsBySellerId(sellerId);
                setProducts(productList.data);

                const subCategoryList = productList.data.map((product) => {
                    return {
                        id: product.subCategoryId,
                        name: product.subCategoryName,
                        image: product.subCategoryImage,
                    };
                });
                setSubCategories(subCategoryList);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        fetchData();

    }, [sellerId]);

    const template = (option) => {
        return (
            <div className="flex align-items-center">
                <img
                    alt={option.name}
                    src={option.image}
                    className={`mr-2 flag flag-${option.id.toLowerCase()}`}
                    style={{ width: '18px' }}
                />
                <div>{option.name}</div>
            </div>
        );
    };

    const panelProductsFooterTemplate = () => {
        const length = selectedProducts ? selectedProducts.length : 0;

        return (
            <div className="py-2 px-3">
                <b>{length}</b> products{length > 1 ? 's' : ''} selected.
            </div>
        );
    };

    const panelCategoriesFooterTemplate = () => {
        const length = selectedSubCategories ? selectedSubCategories.length : 0;

        return (
            <div className="py-2 px-3">
                <b>{length}</b> categories{length > 1 ? 's' : ''} selected.
            </div>
        );
    };


    const handleCreateVoucher = async () => {
        let _voucherDetail = {...voucherDetail};
        let productsIdList = selectedProducts.map((product) => product.id);
        const isValidVoucher = validateAllFieldOfVoucher(_voucherDetail);
        if (hasErrors || !isValidVoucher) {
            setVoucherDetail(_voucherDetail);
            return;
        }
        // if (scope === 'ALL') {
        //     productsIdList = products.map((product) => product.id);
        // } else if (scope === 'SUBCATEGORIES') {
        //     const selectedSubCategoryIds = selectedSubCategories.map((subCategory) => subCategory.id);
        //     productsIdList = products
        //         .filter((product) => selectedSubCategoryIds.includes(product.subCategoryId))
        //         .map((product) => product.id);
        // } else if (scope === 'PRODUCTS') {
        //     productsIdList = selectedProducts.map((product) => product.id);
        // }

        if (productsIdList !== null) {
            const createVoucherRequestDTO = {
               ...voucherDetail,
                productIdList: productsIdList,
            };
            try {
                await dispatch(
                    createVoucher({
                        sellerId: sellerId,
                        createVoucherRequestDTO: createVoucherRequestDTO,
                        token: token,
                    }),
                );
            } catch (error) {
                console.error('Error creating voucher:', error.message);
            }

            handleReset();
            setVisible(false);
        }
    };

    const handleReset = () => {
        setVoucherDetail(newVoucher());
        setScope(null);
        setSelectedProducts([]);
        setSubSelectedCategories([]);
    };

    const footerContent = (
        <div>
            <Button label="Reset" icon="pi pi-times" onClick={handleReset} className="p-button-text" />
            <Button label="Create" icon="pi pi-check" onClick={handleCreateVoucher} autoFocus />
        </div>
    );

    function handleBlurPriceDiscount(event,type) {
        const value_discount = event.target.value;
        const convertedAmount = formatStringVNDPrice(value_discount);
        console.log(value_discount);
        if (isEmpty(event.target.value)) {
            setVoucherDetail((prev) => ({
                ...prev,
                errorValue: ERROR_EMPTY_INPUT
            }));
            setHasErrors(true);
        } else if (type === 'PERCENT' && convertedAmount > 50) {
            setVoucherDetail((prev) => ({
                ...prev,
                errorValue: ERROR_EXCEED_PERCENT
            }));
            setHasErrors(true);
        } else if (type === 'MONEY' && convertedAmount > minPriceOfProductsList) {
            setVoucherDetail((prev) => ({
                ...prev,
                errorValue: ERROR_EXCEED_VALUE
            }));
            setHasErrors(true);
        } else {
            setVoucherDetail((prev) => ({
                ...prev,
                errorValue: EMPTY_STRING
            }));
            setHasErrors(false);
        }
    }

    function handleChangePriceDiscount(e) {
        const value_discount = e.value;
        if (value_discount) {
            setVoucherDetail((prev) => ({
                ...prev,
                errorValue: EMPTY_STRING
            }));
            setHasErrors(false);
        } else  {
            setVoucherDetail((prev) => ({
                ...prev,
                errorValue: ERROR_EMPTY_INPUT
            }));
            setHasErrors(true);
        }
    }

    function handleChangeNamePromotion(event) {
        const name = event.target.value;
        if(isEmpty(name.trim())) {
            setVoucherDetail((prev) => ({
                ...prev,
                errorNamePromotion: ERROR_EMPTY_INPUT
            }));
            setHasErrors(true);
        } else {
            setVoucherDetail((prev) => ({
                ...prev,
                errorNamePromotion: EMPTY_STRING
            }));
            setHasErrors(false);
        }
    }

    function handleBlurNamePromotion(e) {
        if(isEmpty(e.target.value)) {
            setVoucherDetail((prev) => ({
                ...prev,
                errorNamePromotion: ERROR_EMPTY_INPUT
            }));
            setHasErrors(true);
        }
    }

    function handleChangeTimeEnd(event) {
        const timeEnd = event.value;
        if (timeEnd) {
            setVoucherDetail((prev) => ({
                ...prev,
                errorTimeEnd: EMPTY_STRING
            }));
            setHasErrors(false);
        } else  {
            setVoucherDetail((prev) => ({
                ...prev,
                errorTimeEnd: ERROR_EMPTY_INPUT
            }));
            setHasErrors(true);
        }
    }

    function handleChangeMaxUsed(event) {
        const maxQuantity = event.value;
        if (maxQuantity) {
            setVoucherDetail((prev) => ({
                ...prev,
                errorMaxUsed: EMPTY_STRING
            }));
            setHasErrors(false);
        } else  {
            setVoucherDetail((prev) => ({
                ...prev,
                errorMaxUsed: ERROR_EMPTY_INPUT
            }));
            setHasErrors(true);
        }
    }

    function handleChangeRequirement(event) {
        const requirement = event.value;
        if (requirement) {
            setVoucherDetail((prev) => ({
                ...prev,
                errorRequirement: EMPTY_STRING
            }));
            setHasErrors(false);
        } else {
            setVoucherDetail((prev) => ({
                ...prev,
                errorRequirement: ERROR_EMPTY_INPUT
            }));
            setHasErrors(true);
        }
    }

    function handleChangeTimeStart(event) {
        const timeStart = event.value;
        if (timeStart) {
            setVoucherDetail((prev) => ({
                ...prev,
                errorTimeStart: EMPTY_STRING
            }));
            setHasErrors(false);
        } else  {
            setVoucherDetail((prev) => ({
                ...prev,
                errorTimeStart: ERROR_EMPTY_INPUT
            }));
            setHasErrors(true);
        }
    }

    function handleChangeType(event) {
        const type = event.value;
        if (type) {
            setVoucherDetail((prev) => ({
                ...prev,
                errorType: EMPTY_STRING
            }));
            setHasErrors(false);
        } else  {
            setVoucherDetail((prev) => ({
                ...prev,
                errorType: ERROR_EMPTY_INPUT
            }));
            setHasErrors(true);
        }
    }

    function handleChangeCode(e) {
        const code = e.target.value;
        if (code) {
            setVoucherDetail((prev) => ({
                ...prev,
                errorCode: EMPTY_STRING
            }));
            setHasErrors(false);
        } else {
            setVoucherDetail((prev) => ({
                ...prev,
                errorCode: ERROR_EMPTY_INPUT
            }));
            setHasErrors(true);
        }
    }

    return (
        <div className="card flex justify-content-center">
            <div className="voucher-promotion">
                <h2>Unlock Exclusive Deals!</h2>
                <p>Create Your Promotion Now!</p>
                <Button
                    label="Create new voucher"
                    icon="pi pi-plus"
                    onClick={() => setVisible(true)}
                    style={{ width: '250px', height: '50px' }}
                    className="pi"
                />
            </div>
            <Dialog
                header="Create Your Own Custom Vouchers"
                visible={visible}
                style={{ width: '60vw' }}
                onHide={() => setVisible(false)}
                footer={footerContent}
            >
                {/* create promotion */}
                <div className="p-grid p-nogutter" style={{ marginTop: '1.5rem' }}>
                    <div className="p-col-12" style={{ alignItems: 'center',display:'inline-flex'}}>
                        <div className="p-d-flex p-jc-center">
                            <span className="p-float-label">
                                <InputText
                                    id="namePromotion"
                                    value={voucherDetail.namePromotion}
                                    className={`info-input shadow-input ${classNames({
                                        'p-invalid': voucherDetail.errorNamePromotion,
                                    })}`}
                                    onChange={(event) => {
                                        setVoucherDetail({
                                            ...voucherDetail,
                                            namePromotion: event.target.value,
                                        });
                                        handleChangeNamePromotion(event);
                                    }}
                                    onBlur={handleBlurNamePromotion}
                                    style={{ width: '500px', height: '50px' }}
                                />
                                <label htmlFor="namePromotion" style={{ textAlign: 'justify', fontSize: '18px' }}>
                                    Create your promotion
                                </label>
                            </span>
                        </div>
                        <small className="p-error ms-3 ">{voucherDetail.errorNamePromotion}</small>
                    </div>
                </div>

                {/* select scope */}
                <div className="p-grid p-nogutter" style={{ marginTop: '1.5rem' }}>
                    <div className="p-col-4" style={{ alignItems: 'center' }}>
                        <div className="p-d-flex p-jc-center">
                            <span className="p-float-label">
                                <Dropdown
                                    inputId="scope"
                                    value={scope}
                                    onChange={(e) => setScope(e.value)}
                                    options={scopes}
                                    optionLabel="name"
                                    className="w-full md:w-14rem"
                                    style={{ width: '240px', height: '50px' }}
                                />
                                <label htmlFor="scope" style={{ textAlign: 'justify', fontSize: '18px' }}>
                                    Select application scope
                                </label>
                            </span>
                        </div>
                    </div>
                    <div className="p-col-4" style={{ alignItems: 'center', marginLeft: '1rem' }}>
                        <div className="p-d-flex p-jc-center">
                            {scope === 'SUBCATEGORIES' && (
                                <span className="p-float-label">
                                    <MultiSelect
                                        value={selectedSubCategories}
                                        onChange={(e) => setSubSelectedCategories(e.value)}
                                        options={subCategories}
                                        optionLabel="name"
                                        itemTemplate={template}
                                        filter
                                        placeholder="Select categories"
                                        panelFooterTemplate={panelCategoriesFooterTemplate}
                                        maxSelectedLabels={2}
                                        className="w-full md:w-20rem"
                                        style={{ width: '240px', height: '50px' }}
                                    />
                                    <label htmlFor="category" style={{ textAlign: 'justify', fontSize: '18px' }}>
                                        Select categories
                                    </label>
                                </span>
                            )}
                            {scope === 'PRODUCTS' && (
                                <span className="p-float-label">
                                    <MultiSelect
                                        value={selectedProducts}
                                        onChange={(e) => setSelectedProducts(e.value)}
                                        options={products}
                                        optionLabel="name"
                                        itemTemplate={template}
                                        filter
                                        placeholder="Select products"
                                        panelFooterTemplate={panelProductsFooterTemplate}
                                        maxSelectedLabels={2}
                                        className="w-full md:w-20rem"
                                        style={{ width: '240px', height: '50px' }}
                                    />
                                    <label htmlFor="product" style={{ textAlign: 'justify', fontSize: '18px' }}>
                                        Select products
                                    </label>
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* create code */}
                <div className="p-grid p-nogutter" style={{ marginTop: '1.5rem' }}>
                    <div className="p-col-4" style={{ alignItems: 'center', display: 'inline-flex' }}>
                        <div className="p-d-flex p-jc-center">
                            <span className="p-float-label">
                                <InputText
                                    id="nameVoucher"
                                    value={voucherDetail.code}
                                    className={`info-input shadow-input ${classNames({
                                        'p-invalid': voucherDetail.errorCode,
                                    })}`}
                                    onChange={(e) => {setVoucherDetail({
                                        ...voucherDetail,
                                        code: e.target.value
                                        });
                                        handleChangeCode(e);
                                    }}
                                    style={{ width: '240px', height: '50px' }}
                                />
                                <label htmlFor="nameVoucher" style={{ textAlign: 'justify', fontSize: '18px' }}>
                                    Code
                                </label>
                            </span>
                        </div>
                        {voucherDetail.errorCode ? <small className="p-error ms-4 ">{voucherDetail.errorCode}</small> : (
                            <span
                                style={{
                                    paddingLeft: '1rem',
                                    textAlign: 'center',
                                    height: '50px',
                                    color: 'blue',
                                    margin: '0px',
                                }}
                            >
                            *Please enter a voucher code using only alphanumeric characters (A-Z, 0-9), with 6
                            characters
                        </span>
                        )}

                    </div>
                </div>

                {/* select type */}
                <div className="p-grid p-nogutter" style={{ marginTop: '1.5rem' }}>
                    <div className="p-col-4" style={{ alignItems: 'center' }}>
                        <div className="p-d-flex p-jc-center">
                            <span className="p-float-label">
                                <Dropdown
                                    inputId="type"
                                    value={voucherDetail.type}
                                    onChange={(event) => {
                                        setVoucherDetail({
                                            ...voucherDetail,
                                            type: event.value,
                                        });
                                        handleChangeType(event);
                                    }}
                                    options={types}
                                    optionLabel="name"
                                    className="w-full md:w-14rem"
                                    style={{ width: '240px', height: '50px' }}
                                />
                                <label htmlFor="type" style={{ textAlign: 'justify', fontSize: '18px' }}>
                                    Select type of voucher
                                </label>
                            </span>
                        </div>
                    </div>

                    <div
                        className="p-col-4"
                        style={{ alignItems: 'center', marginLeft: '1rem', display: 'inline-flex' }}
                    >
                        <div className="p-d-flex p-jc-center">
                            {voucherDetail.type === 'MONEY' && (
                                <>
                                   <span className="p-float-label">
                                    <InputNumber
                                        inputId="valueMoney"
                                        value={voucherDetail?.value}
                                        className={`info-input shadow-input ${classNames({
                                            'p-invalid': voucherDetail.errorValue,
                                        })}`}
                                        placeholder="Enter value discount"
                                        onChange={(event) => {
                                            setVoucherDetail({
                                                ...voucherDetail,
                                                value: event.value,
                                            });
                                            handleChangePriceDiscount(event);
                                        }}
                                        // showButtons
                                        suffix="₫"
                                        min={0}
                                        style={{ width: '240px', height: '50px' }}
                                        onBlur={(event) => {
                                            handleBlurPriceDiscount(event,'MONEY');}
                                        }
                                    />
                                  </span>
                                </>
                            )}
                            {voucherDetail.type === 'PERCENT' && (
                                <>
                                  <span className="p-float-label">
                                    <InputNumber
                                        inputId="valuePercent"
                                        value={voucherDetail?.value}
                                        className={`info-input shadow-input ${classNames({
                                            'p-invalid': voucherDetail.errorValue,
                                        })}`}
                                        placeholder="Enter value discount"
                                        onChange={(event) => {
                                            setVoucherDetail({
                                                ...voucherDetail,
                                                value: event.value,
                                            });
                                            handleChangePriceDiscount(event);
                                        }}
                                        // showButtons
                                        suffix="%"
                                        min={0}
                                        style={{ width: '240px', height: '50px' }}
                                        onBlur={(event) => {
                                            handleBlurPriceDiscount(event,'PERCENT');}
                                        }
                                    />
                                  </span>
                                </>
                            )}
                        </div>
                        {voucherDetail.errorValue
                                ?
                            <small style={{width:280}} className="p-error ms-3 ">
                                {voucherDetail.errorValue}
                            </small>
                                :
                            <small style={{width:280}} className="text-primary ms-3 ">
                                { voucherDetail.type === 'MONEY'
                                ? `(maximum ${formatVNDPrice(minPriceOfProductsList)})`
                                : voucherDetail.type === 'PERCENT'
                                ? "(maximum 50%)"
                                : ''
                                }
                            </small>
                        }
                    </div>
                </div>

                {/* select maximum used */}
                <div className="p-grid p-nogutter" style={{ marginTop: '1.5rem' }}>
                    <div className="p-col-4" style={{ alignItems: 'center', display: 'inline-flex' }}>
                        <div className="p-d-flex p-jc-center">
                            <InputNumber
                                placeholder="Maximum used"
                                value={voucherDetail?.maxUsed}
                                className={`info-input shadow-input ${classNames({
                                    'p-invalid': voucherDetail.errorMaxUsed,
                                })}`}
                                onChange={(event) => {
                                    setVoucherDetail({
                                        ...voucherDetail,
                                        maxUsed: event.value,
                                    });
                                    handleChangeMaxUsed(event);
                                }}
                                showButtons
                                min={0}
                                style={{ width: '240px', height: '50px' }}
                            />

                            {voucherDetail.errorMaxUsed ? <small className="p-error ms-4 ">{voucherDetail.errorMaxUsed}</small> : (
                                <span
                                    style={{
                                        paddingLeft: '2rem',
                                        textAlign: 'center',
                                        height: '50px',
                                        color: 'blue',
                                        margin: '0px',
                                        alignItems: 'center',
                                    }}
                                >
                                    *Maximum vouchers used
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* select quantity per one */}
                <div className="p-grid p-nogutter" style={{ marginTop: '1.5rem' }}>
                    <div className="p-col-4" style={{ alignItems: 'center', display: 'inline-flex' }}>
                        <div className="p-d-flex p-jc-center">
                            <InputNumber
                                placeholder="Vouchers/Customer"
                                value={voucherDetail?.requirement}
                                className={`info-input shadow-input ${classNames({
                                    'p-invalid': voucherDetail.errorRequirement,
                                })}`}
                                onChange={(event) => {
                                    setVoucherDetail({
                                        ...voucherDetail,
                                        requirement: event.value,
                                    });
                                    handleChangeRequirement(event);
                                }}
                                showButtons
                                min={0}
                                style={{ width: '240px', height: '50px' }}
                            />
                            {voucherDetail.errorRequirement ? <small className="p-error ms-4 ">{voucherDetail.errorRequirement}</small> : (
                                <span
                                    style={{
                                        paddingLeft: '2rem',
                                        textAlign: 'center',
                                        height: '50px',
                                        color: 'blue',
                                        margin: '0px',
                                        alignItems: 'center',
                                    }}
                                >
                                    *Maximum vouchers per 1 customer
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* select time */}
                <div className="p-grid p-nogutter" style={{ marginTop: '1.5rem' }}>
                    <div className="p-col-4" style={{ alignItems: 'center', display: 'inline-flex' }}>
                        <div className="p-d-flex p-jc-center">
                            <span className="p-float-label">
                                <Calendar
                                    id="timeStart"
                                    value={voucherDetail?.timeStart}
                                    className={`info-input shadow-input ${classNames({
                                        'p-invalid': voucherDetail.errorTimeStart,
                                    })}`}
                                    onChange={(event) => {
                                        setVoucherDetail({
                                            ...voucherDetail,
                                            timeStart: event.value,
                                        });
                                        handleChangeTimeStart(event);
                                    }}
                                    showTime
                                    hourFormat="24"
                                    style={{ width: '240px', height: '50px' }}
                                />
                                <label htmlFor="timeStart" style={{ textAlign: 'justify', fontSize: '18px' }}>
                                    Time start promotion
                                </label>
                            </span>
                        </div>
                        <div className="p-d-flex p-jc-center" style={{ marginLeft: '1rem' }}>
                            <span className="p-float-label">
                                <Calendar
                                    id="timeEnd"
                                    value={voucherDetail?.timeEnd}
                                    className={`info-input shadow-input ${classNames({
                                        'p-invalid': voucherDetail.errorTimeEnd,
                                    })}`}
                                    onChange={(event) => {
                                        setVoucherDetail({
                                            ...voucherDetail,
                                            timeEnd: event.value,
                                        });
                                        handleChangeTimeEnd(event);
                                    }}
                                    showTime
                                    hourFormat="24"
                                    style={{ width: '240px', height: '50px' }}
                                />
                                <label htmlFor="timeEnd" style={{ textAlign: 'justify', fontSize: '18px' }}>
                                    Time finish promotion
                                </label>
                            </span>

                        </div>
                        {voucherDetail.errorTimeEnd
                            ? <small className="p-error ms-2 ">{voucherDetail.errorTimeEnd}</small>
                            : voucherDetail.errorTimeStart
                            ? <small className="p-error ms-2 ">{voucherDetail.errorTimeStart}</small>
                            : <div className="p-d-flex p-jc-center" style={{ marginLeft: '1rem' }}>
                            <span
                                style={{
                                    textAlign: 'center',
                                    height: '50px',
                                    color: 'blue',
                                    margin: '0px',
                                }}
                            >
                                *The minimum voucher validity period is 30 minutes from the time of creation
                            </span>
                            </div>
                        }
                    </div>
                </div>
            </Dialog>
        </div>
    );
}
export default CreateNewVoucher;
