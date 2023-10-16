import React, {useEffect, useMemo, useState} from "react";
import {Dropdown} from 'primereact/dropdown';
import {InputText} from "primereact/inputtext";
import {classNames} from "primereact/utils";
import isEmpty from "validator/es/lib/isEmpty";
import {Dialog} from "primereact/dialog";
import {Button} from "primereact/button";
import isMobilePhone from "validator/es/lib/isMobilePhone";
import { ToggleButton } from 'primereact/togglebutton';

import {fetchDistricts, fetchProvinces, fetchWards} from "../../api/locationAPI";
import {
    MAX_LENGTH_OF_ADDRESS,
    MAX_LENGTH_OF_FULL_NAME,
    MAX_LENGTH_OF_HAMLET,
    MAX_LENGTH_OF_PHONE,
    MIN_LENGTH_OF_TYPE_OF_ADDRESS,
    ZERO
} from "../../constant/number";
import {EMPTY_STRING} from "../../constant/string";
import {ERROR_EMPTY_INPUT, ERROR_FULL_NAME, ERROR_PHONE_NUMBER} from "../../constant/errorMessage";
import {isInvalidDeputyName} from "../../validator/validator";


const LocationDialog = ({onHideLocationDialog, isShown, isSeller, onSaveLocation, locationToEdit, isDefaultAddress}) => {
    const [id, setId] = useState(null);

    const [fullName, setFullName] = useState(EMPTY_STRING);
    const [errorFullName, setErrorFullName] = useState(EMPTY_STRING);

    const [phoneNumber, setPhoneNumber] = useState(EMPTY_STRING);
    const [errorPhoneNumber, setErrorPhoneNumber] = useState(EMPTY_STRING);

    const [provinces, setProvinces] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState(null);
    const [errorProvince, setErrorProvince] = useState(EMPTY_STRING);

    const [districts, setDistricts] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState(null);
    const [errorDistrict, setErrorDistrict] = useState(EMPTY_STRING);

    const [wards, setWards] = useState([]);
    const [selectedWard, setSelectedWard] = useState(null);
    const [errorWard, setErrorWard] = useState(EMPTY_STRING);

    const [hamlet, setHamlet] = useState(EMPTY_STRING);

    const [address, setAddress] = useState(EMPTY_STRING);
    const [errorAddress, setErrorAddress] = useState(EMPTY_STRING);

    const [typeAddress, setTypeAddress] = useState(EMPTY_STRING);
    const [defaultAddress, setDefaultAddress] = useState(false);
    const [index, setIndex] = useState(-1);

    const isDefaultMemo = useMemo(() => isDefaultAddress, [isDefaultAddress]);
    const locationToEditMemo = useMemo(() => locationToEdit, [locationToEdit]);


    useEffect(() => {
        const fetchData = async () => {
            setDefaultAddress(isDefaultMemo);
            if (locationToEditMemo) {
                setId(locationToEditMemo.id);
                setFullName(locationToEditMemo.deputyName);
                setPhoneNumber(locationToEditMemo.phoneNumber);
                setHamlet(locationToEditMemo.hamlet);
                setAddress(locationToEditMemo.address);
                setTypeAddress(locationToEditMemo.typeAddress);
                setIndex(locationToEditMemo.index);
            }
            const _provinces = await fetchProvinces();
            setProvinces(_provinces);
            const _selectedProvince = _provinces.find(item => item.name === locationToEditMemo?.province);
            setSelectedProvince(_selectedProvince);
            let _districts = [];
            if (_selectedProvince) _districts = await fetchDistricts(_selectedProvince?.code);
            setDistricts(_districts);
            const _selectedDistrict = _districts.find(item => item.name === locationToEditMemo?.district);
            setSelectedDistrict(_selectedDistrict);
            let _wards = [];
            if (_selectedDistrict) _wards = await fetchWards(_selectedDistrict?.code);
            setWards(_wards);
            setSelectedWard(_wards.find(item => item.name === locationToEditMemo?.ward));
        }
        fetchData().then();
    }, [isDefaultMemo, locationToEditMemo]);


    const styleFontSize = () => {
        if (isSeller) {
            return { fontSize: '1rem' };
        } else {
            return { fontSize: '1.5rem' };
        }
    };


    const location = () => ({
        id,
        deputyName: fullName,
        phoneNumber,
        province: selectedProvince.name,
        district: selectedDistrict.name,
        ward: selectedWard.name,
        hamlet,
        address,
        typeAddress,
        defaultAddress,
        index
    });


    const handleChangeProvince = (province) => {
        setSelectedProvince(province);
        setErrorProvince(EMPTY_STRING);
        setSelectedDistrict(null);
        setSelectedWard(null);
        fetchDistricts(province?.code).then(data => {
            setDistricts(data);
        });
    }


    const handleChangeDistrict = (district) => {
        setSelectedDistrict(district);
        setSelectedWard(null);
        setErrorDistrict(EMPTY_STRING);
        fetchWards(district?.code).then(data => {
            setWards(data);
        });
    }


    const handleChangeWard = (ward) => {
        setSelectedWard(ward);
        setErrorWard(EMPTY_STRING);
    }


    const handleChangeHamlet = (e) => {
        const _hamlet = e.target.value;
        setHamlet(_hamlet);
    }


    const handleChangeAddress = (e) => {
        const _address = e.target.value;
        setAddress(_address)
        changeErrorAddress(_address);
    }

    const handleBlurAddress = (e) => {
        changeErrorAddress(e.target.value);
    }

    const changeErrorAddress = (value) => {
        if (isEmpty(value.trim())) {
            setErrorAddress(ERROR_EMPTY_INPUT);
        } else {
            setErrorAddress(EMPTY_STRING);
        }
    }


    const selectedLocationTemplate = (option, props) => {
        if (option) {
            return (
                <div className="flex align-items-center">
                    <div style={styleFontSize()}>{option.name}</div>
                </div>
            );
        }
        return <span style={styleFontSize()}>{props.placeholder}</span>;
    };


    const locationOptionTemplate = (option) => {
        return (
            <div className="flex align-items-center">
                <div style={styleFontSize()}>{option.name}</div>
            </div>
        );
    };


    const handleSaveLocation = () => {
        const isInvalidFields = isInvalidField();
        if (isInvalidFields) {
            return;
        }
        onSaveLocation(location());
    }


    const isInvalidField = () => {
        const invalidFullName = errorFullName || isEmpty(fullName);
        const invalidPhone = errorPhoneNumber || !isMobilePhone(phoneNumber, 'vi-VN');
        const invalidAddress = errorAddress || isEmpty(address);
        isEmpty(fullName) && setErrorFullName(ERROR_EMPTY_INPUT);
        !isMobilePhone(phoneNumber, 'vi-VN') && setErrorPhoneNumber(ERROR_PHONE_NUMBER);
        isEmpty(address) && setErrorAddress(ERROR_EMPTY_INPUT);
        !selectedProvince && setErrorProvince(ERROR_EMPTY_INPUT);
        !selectedDistrict && setErrorDistrict(ERROR_EMPTY_INPUT);
        !selectedWard && setErrorWard(ERROR_EMPTY_INPUT);
        return !!(invalidFullName || invalidPhone || invalidAddress || !selectedProvince || !selectedDistrict || !selectedWard);
    }


    const locationDialogFooter = () => {
        return (
                <div className="mt-5">
                    <Button label="Cancel" icon="pi pi-times" size={isSeller ? "small" : "large"} outlined onClick={handleHideLocationDialog}/>
                    <Button label="Save" icon="pi pi-check"  size={isSeller ? "small" : "large"} className="gradient-custom-2" onClick={handleSaveLocation}/>
                </div>
            )
        };


    const handleHideLocationDialog = () => {
        onHideLocationDialog();
    };


    const handleChangeFullName = (e) => {
        const name = e.target.value;
        setFullName(name);
        if (isEmpty(name.trim())) {
            setErrorFullName(ERROR_EMPTY_INPUT);
        } else if (isInvalidDeputyName(name)) {
            setErrorFullName(ERROR_FULL_NAME);
        } else {
            setErrorFullName(EMPTY_STRING);
        }
    };


    const handleBlurFullName = (e) => {
        if (isEmpty(e.target.value)) {
            setErrorFullName(ERROR_EMPTY_INPUT);
        }
    };


    const handleChangePhoneNumber = (e) => {
        const phone = e.target.value;
        setPhoneNumber(phone);
        if (phone) {
            setErrorPhoneNumber(EMPTY_STRING);
        } else {
            setErrorPhoneNumber(ERROR_EMPTY_INPUT);
        }
    };


    const handleBlurPhoneNumber = (e) => {
        const phone = e.target.value;
        setPhoneNumber(phone);
        if (!phone) {
            setErrorPhoneNumber(ERROR_EMPTY_INPUT);
        } else if (!isMobilePhone(phone, 'vi-VN')) {
            setErrorPhoneNumber(ERROR_PHONE_NUMBER);
        }
    };


    const handleChangeTypeAddress = (e) => {
        const type = e.target.value;
        setTypeAddress(type);
    };

    return (
        <Dialog visible={isShown}
                breakpoints={{'576px': '90vw', '768px': '70vw'}}
                header={"Add new address"}
                modal
                className="p-fluid w-75"
                style={styleFontSize()}
                footer={locationDialogFooter}
                onHide={handleHideLocationDialog}
        >
            <div className="field">
                <label htmlFor="type">
                    <strong>Type of address</strong>
                </label>
                <div className="p-inputgroup">
                    <InputText id="type"
                               style={styleFontSize()}
                               placeholder="Example: Company, House, Store v.v"
                               value={typeAddress}
                               onChange={handleChangeTypeAddress}
                               maxLength={MIN_LENGTH_OF_TYPE_OF_ADDRESS}
                    />
                    <span className="p-inputgroup-addon" style={styleFontSize()}>
                        {`${typeAddress.length}/${MIN_LENGTH_OF_TYPE_OF_ADDRESS}`}
                    </span>
                </div>
            </div>
            <div className="field mt-3">
                <label htmlFor="fullName">
                    <strong>Full name of {isSeller ? 'sender' : 'receiver'} </strong>
                    <sup style={{color: "red"}}>*</sup>
                </label>
                <div className="p-inputgroup">
                    <InputText id="fullName"
                               placeholder={`Enter full name of ${isSeller ? 'sender' : 'receiver'}`}
                               value={fullName}
                               style={styleFontSize()}
                               onChange={handleChangeFullName}
                               onBlur={handleBlurFullName}
                               maxLength={MAX_LENGTH_OF_FULL_NAME}
                               className={`w-full md:w-14rem shadow-input ${classNames({'p-invalid' : errorFullName})}`}
                    />
                    <span className="p-inputgroup-addon" style={styleFontSize()}>
                        {`${fullName.trim().length}/${MAX_LENGTH_OF_FULL_NAME}`}
                    </span>
                </div>
                <small className="p-error" style={styleFontSize()}>{errorFullName}</small>
            </div>
            <div className="field mt-3">
                <label htmlFor="phone">
                    <strong>Mobile phone</strong> <sup style={{color: "red"}}>*</sup>
                </label>
                <div className="p-inputgroup">
                    <InputText placeholder={`Enter mobile phone numbers of ${isSeller ? 'sender' : 'receiver'}`}
                                 id="phone"
                                 style={styleFontSize()}
                                 className={`shadow-input ${classNames({'p-invalid' : errorPhoneNumber})}`}
                                 value={phoneNumber ? phoneNumber : null}
                                 maxLength={MAX_LENGTH_OF_PHONE}
                                 useGrouping={false}
                                 onChange={handleChangePhoneNumber}
                                 onBlur={handleBlurPhoneNumber}
                    />
                    <span className="p-inputgroup-addon">
                        {`${phoneNumber ? phoneNumber?.toString().length : ZERO}/${MAX_LENGTH_OF_PHONE}`}
                    </span>
                </div>
                <small className="p-error" style={styleFontSize()}>{errorPhoneNumber}</small>
            </div>
            <div className="field mt-3">
                <label htmlFor="province">
                    <strong>Province/City</strong> <sup style={{color: "red"}}>*</sup>
                </label>
                <div className="card flex justify-content-center field">
                    <Dropdown value={selectedProvince}
                              id="province"
                              style={styleFontSize()}
                              onChange={(e) => handleChangeProvince(e.value)}
                              options={provinces}
                              optionLabel="name"
                              placeholder="Select a Province/City"
                              filter
                              valueTemplate={selectedLocationTemplate}
                              itemTemplate={locationOptionTemplate}
                              className={`w-full md:w-14rem ${classNames({'p-invalid' : errorProvince})}`}
                    />
                </div>
                <small className="p-error" style={styleFontSize()}>{errorProvince}</small>
            </div>
            <div className="field mt-3">
                <label htmlFor="district">
                    <strong>District</strong> <sup style={{color: "red"}}>*</sup>
                </label>
                <div className="card flex justify-content-center">
                    <Dropdown value={selectedDistrict}
                              id="district"
                              onChange={(e) => handleChangeDistrict(e.value)}
                              options={districts}
                              optionLabel="name"
                              placeholder="Select a District"
                              filter
                              valueTemplate={selectedLocationTemplate}
                              itemTemplate={locationOptionTemplate}
                              className={`w-full md:w-14rem ${classNames({'p-invalid' : errorDistrict})}`}
                    />
                </div>
                <small className="p-error" style={styleFontSize()}>{errorDistrict}</small>
            </div>
            <div className="field mt-3">
                <label htmlFor="ward">
                    <strong>Ward</strong> <sup style={{color: "red"}}>*</sup>
                </label>
                <div className="card flex justify-content-center">
                    <Dropdown value={selectedWard}
                              id="ward"
                              onChange={(e) => handleChangeWard(e.value)}
                              options={wards}
                              optionLabel="name"
                              placeholder="Select a Ward"
                              filter
                              valueTemplate={selectedLocationTemplate}
                              itemTemplate={locationOptionTemplate}
                              className={`w-full md:w-14rem ${classNames({'p-invalid' : errorWard})}`}
                    />
                </div>
                <small className="p-error">{errorWard}</small>
            </div>
            <div className="field mt-3">
                <label htmlFor="hamlet"><strong>Hamlet</strong></label>
                <div className="p-inputgroup">
                    <InputText id="hamlet"
                               placeholder="Enter your hamlet"
                               style={styleFontSize()}
                               value={hamlet}
                               onChange={handleChangeHamlet}
                               className="shadow-input"
                               maxLength={MAX_LENGTH_OF_HAMLET}
                    />
                    <span className="p-inputgroup-addon">
                        {`${hamlet.length}/${MAX_LENGTH_OF_HAMLET}`}
                    </span>
                </div>
            </div>
            <div className="field mt-3">
                <label htmlFor="address">
                    <strong>Address detail</strong> <sup style={{color: "red"}}>*</sup>
                </label>
                <div className="p-inputgroup">
                    <InputText id="address"
                               placeholder="Enter your address detail"
                               value={address}
                               style={styleFontSize()}
                               onChange={handleChangeAddress}
                               onBlur={handleBlurAddress}
                               className={`w-full md:w-14rem shadow-input ${classNames({'p-invalid' : errorAddress})}`}
                               maxLength={MAX_LENGTH_OF_ADDRESS}
                    />
                    <span className="p-inputgroup-addon">
                        {`${address.length}/${MAX_LENGTH_OF_ADDRESS}`}
                    </span>
                </div>
                <small className="p-error" style={styleFontSize()}>{errorAddress}</small>
            </div>

            <div className="field mt-4 d-flex">
                <ToggleButton checked={defaultAddress}
                              onChange={() => setDefaultAddress(!defaultAddress)}
                              className="w-8rem "
                              style={styleFontSize()}
                              style={{width: '5em', height: '3em'}}
                />
                <div className="ms-3 align-items-center d-flex text-danger">
                    <span className="h6 mb-0" style={styleFontSize()}>
                        {isSeller
                            ? "Here is the address to pick up and return product!"
                            : "Here is the delivery address!"
                        }
                    </span>
                </div>
            </div>
        </Dialog>
    )
}

export default LocationDialog;
