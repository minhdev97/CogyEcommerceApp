import React, {useState} from 'react';
import classNames from "classnames";
import {Button} from "primereact/button";
import {InputText} from "primereact/inputtext";
import isEmpty from "validator/es/lib/isEmpty";

import ImageUploader from "../../component/ImageUploader";
import {MAX_LENGTH_OF_NAME_OF_STORE, MIN_LENGTH_OF_NAME_OF_STORE, ZERO} from "../../constant/number";
import {EMPTY_STRING} from "../../constant/string";
import {
    ERROR_EMPTY_IMAGE,
    ERROR_EMPTY_INPUT,
    ERROR_EMPTY_LOCATIONS, ERROR_NAME_EXIST, ERROR_NAME_OF_STORE_IS_TOO_LONG,
    ERROR_NAME_OF_STORE_IS_TOO_SHORT,
    ERROR_SELECT_DEFAULT_SELLER_LOCATION
} from "../../constant/errorMessage";
import {uploadImage} from "../../api/firebaseAPI";
import LocationPicker from "../../component/LocationPicker";
import {createSeller, isExistNameOfSeller} from "../../api/sellerAPI";
import {getUser} from "../../service/userService";
import {useNavigate} from "react-router-dom";
import {PRODUCT_MANAGEMENT_PAGE} from "../../constant/page";
import {ProgressSpinner} from "primereact/progressspinner";

const SellerForm = () => {

    const [image, setImage] = useState(EMPTY_STRING);
    const [errorImage, setErrorImage] = useState(EMPTY_STRING);
    const [name, setName] = useState(EMPTY_STRING);
    const [errorName, setErrorName] = useState(EMPTY_STRING);
    const [locations, setLocations] = useState([]);
    const [errorLocations, setErrorLocations] = useState(EMPTY_STRING);
    const [loadingSave, setLoadingSave] = useState(false);

    const navigate = useNavigate();


    const handleChangeImageFile = (file) => {
        setImage(file);
        if (file) {
            setErrorImage(EMPTY_STRING);
        } else {
            setErrorImage(ERROR_EMPTY_IMAGE);
        }
    }



    const handleChangeName = (e) => {
        const _name = e.target.value;
        setName(_name);
        if (isEmpty(_name)) {
            setErrorName(ERROR_EMPTY_INPUT);
        } else {
            setErrorName(EMPTY_STRING);
        }
    }


    const handleBlurName = async (e) => {
        const _name = e.target.value;
        if (isEmpty(_name)) {
            setErrorName(ERROR_EMPTY_INPUT);
        } else if (_name.trim().length < MIN_LENGTH_OF_NAME_OF_STORE) {
            setErrorName(ERROR_NAME_OF_STORE_IS_TOO_SHORT);
        } else if (_name.trim().length > MAX_LENGTH_OF_NAME_OF_STORE) {
            setErrorName(ERROR_NAME_OF_STORE_IS_TOO_LONG);
        } else {
            const isExist = await isExistNameOfSeller(_name);
            isExist ? setErrorName(ERROR_NAME_EXIST) : setErrorName(EMPTY_STRING);
        }
        setName(_name);
    }


    const handleSaveLocationList = (locationList) => {
        setLocations(locationList);
        if (locationList.length === ZERO) {
            setErrorLocations(ERROR_EMPTY_LOCATIONS);
        } else if (locationList.every(item => !item.defaultAddress)) {
            setErrorLocations(ERROR_SELECT_DEFAULT_SELLER_LOCATION);
        } else {
            setErrorLocations(EMPTY_STRING);
        }
    }


    const validateForm = () => {
        let result = true;
        if (image === EMPTY_STRING) {
            setErrorImage(ERROR_EMPTY_IMAGE);
            result = false;
        }
        if (isEmpty(name.trim())) {
            setErrorName(ERROR_EMPTY_INPUT);
            result = false;
        } else if (errorName) {
            result = false;
        }
        if (locations.length === ZERO) {
            setErrorLocations(ERROR_EMPTY_LOCATIONS);
            result = false;
        } else {
            if (locations.every(item => !item.defaultAddress)) {
                setErrorLocations(ERROR_SELECT_DEFAULT_SELLER_LOCATION);
                result = false;
            }
        }
        return result;
    }


    const handleCreateNewSeller = async () => {
        setLoadingSave(true);
        const isValidForm = validateForm();
        if (!isValidForm) {
            setLoadingSave(false);
            return;
        }
        const urlImage = await uploadImage(image);
        const seller = {
            image: urlImage,
            name,
            locations: locations
        };
        const newSeller = await createSeller(seller);
        const user = getUser();
        user.seller = newSeller;
        localStorage.setItem('user', JSON.stringify(user));
        navigate(PRODUCT_MANAGEMENT_PAGE);
        setLoadingSave(false);
    }

    return (
        <div>
            <div className="h5 justify-content-center d-flex">
                <span style={{color: '#2b22e3'}}>Store information settings</span>
            </div>

            <hr style={{color: '#f53e2d'}}/>

            <div className="d-flex flex-column gap-2 mt-4">
                <label className="mb-0 pb-0">
                    Store representative photo
                    <sup style={{color: "red"}}>*</sup>
                </label>
                <small className="p-error">
                    {errorImage}
                </small>
                <ImageUploader
                    onChangeImage={handleChangeImageFile}
                    image={image}
                    isMain={false}
                    isEmptyContent={true}
                />
            </div>

            <div className="d-flex flex-column gap-2 mb-3 mt-1">
                <label htmlFor="name" className="mb-0 pb-0">
                    Name Of Store<sup style={{color: "red"}}>*</sup>
                </label>
                <div className="p-inputgroup">
                            <span className="p-inputgroup-addon">
                                {`${name.trim().length}/${MIN_LENGTH_OF_NAME_OF_STORE}`}
                            </span>
                    <InputText id="name"
                               aria-describedby="username-help"
                               placeholder="Enter name of your store..."
                               className={`shadow-input ${classNames({'p-invalid' : errorName})}`}
                               value={name}
                               onChange={handleChangeName}
                               onBlur={handleBlurName}
                    />
                    <span className="p-inputgroup-addon">
                                {`${name.trim().length}/${MAX_LENGTH_OF_NAME_OF_STORE}`}
                            </span>
                </div>
                <small className="p-error">
                    {errorName}
                </small>
            </div>

            <LocationPicker locationList={locations}
                            onSaveLocationList={handleSaveLocationList}
                            isSeller={true}
            />

            <div>
                <small className="p-error">
                    {errorLocations}
                </small>
            </div>

            <div className="text-center pt-1 mb-5 pb-1 mt-5 ">
                {loadingSave
                    ? <ProgressSpinner style={{width: '50px', height: '50px'}}
                                       strokeWidth="8"
                                       fill="var(--surface-ground)"
                                       animationDuration=".5s"/>
                    : <Button className="mb-4 w-100 gradient-custom-2 text-uppercase"
                              size="small"
                              label="Register"
                              onClick={handleCreateNewSeller}
                    />
                }
            </div>

        </div>
    );
};

export default SellerForm;