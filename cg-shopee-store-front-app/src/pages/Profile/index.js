import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import '../../asset/css/profile/profile.css';
import '../../asset/css/other/registerSeller.css';
import '../../asset/css/auther/customer_toast.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Footer from "../../component/product/Footer";
import { findProfile, updateProfile } from "../../api/userAPI";
import { MDBTabs, MDBTabsItem, MDBTabsLink, MDBTabsContent, MDBTabsPane, MDBBtn } from 'mdb-react-ui-kit';
import { InputText } from 'primereact/inputtext';
import { RadioButton } from 'primereact/radiobutton';
import {ProgressSpinner} from "primereact/progressspinner";
import Swal from 'sweetalert2';
import { getFullName, getToken, getUser, getUserId } from '../../service/userService';
import ImageUploader from '../../component/ImageUploader';
import blankAvatar from '../../asset/img/blank-avatar.jpg';
import { uploadImage } from '../../api/firebaseAPI';
import Avatar from '../../component/Avatar';
import isEmpty from 'validator/es/lib/isEmpty';
import {
    ERROR_EMPTY_INPUT,
    ERROR_FULL_NAME,
    ERROR_PHONE_NUMBER,
    ERROR_INVALID_EMAIL,
    ERROR_EMPTY_LOCATIONS,
    ERROR_SELECT_DEFAULT_SELLER_LOCATION,
    ERROR_EMPTY_IMAGE,
} from '../../constant/errorMessage';
import { EMPTY_STRING, MIN_PASSWORD_LENGTH } from '../../constant/string';
import { ZERO } from '../../constant/number';
import classNames from 'classnames';
import { isInvalidVnName } from '../../validator/validator';
import isMobilePhone from 'validator/es/lib/isMobilePhone';
import LocationPicker from '../../component/LocationPicker';
import { setHistory } from '../../features/history/historySlice';
import { LOGIN_PAGE, PROFILE_PAGE } from '../../constant/page';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { Slide, ToastContainer, toast } from 'react-toastify';
import { useFormik } from 'formik';
import apiClient  from '../../api/apiClient';
import LocationList from "../../component/LocationList";



const Profile = () => {
    const [showPassword, setShowPassword] = useState(false);
    const hrefNavigate = useNavigate();
    const [gender, setGender] = useState('');
    const [selectedAvatar, setSelectedAvatar] = useState(null);
    const [userProfile, setUserProfile] = useState({
        gender: '',
    });

    const [fullName, setFullName] = useState(EMPTY_STRING);
    const [errorFullName, setErrorFullName] = useState(EMPTY_STRING);

    const [phoneNumber, setPhoneNumber] = useState(EMPTY_STRING);
    const [errorPhoneNumber, setErrorPhoneNumber] = useState(EMPTY_STRING);

    const [email, setEmail] = useState(EMPTY_STRING);
    const [errorEmail, setErrorEmail] = useState(EMPTY_STRING);

    const [locations, setLocations] = useState([]);
    const [errorLocations, setErrorLocations] = useState(EMPTY_STRING);

    const [hasErrors, setHasErrors] = useState(false);

    const [justifyActive, setJustifyActive] = useState('tab1');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const formikRef = useRef(null);
    // const [currentPassword, setCurrentPassword] = useState(EMPTY_STRING);
    // const [newPassword, setNewPassword] = useState(EMPTY_STRING);
    // const [confirmPassword, setConfirmPassword] = useState(EMPTY_STRING);
    const [errorPassword, setErrorMessagePassword] = useState(EMPTY_STRING);
    const [isLoading, setIsLoading] = useState(false);


    // const handleUpdatePassword = async (e) => {
    //     e.preventDefault();
    //     try {
    //         await schema.validate({
    //             currentPassword,
    //             newPassword,
    //             confirmPassword,
    //         });

    //         if (newPassword !== confirmPassword) {
    //             setErrorMessagePassword({ confirmPassword: 'Confirmed password does not match.' });
    //             return;
    //         }

    //         const userJSON = localStorage.getItem('user');
    //         const user = JSON.parse(userJSON);

    //         const data = {
    //             username: user.username,
    //             currentPassword,
    //             newPassword,
    //             confirmPassword,
    //         };

    //         const response = await apiClient.post('/change-password', data);

    //         if (response.data.success) {
    //             toast.success(response.data.message);
    //             hrefNavigate('/');
    //             formikRef.current.resetForm();
    //         } else {
    //             toast.error(response.data.message);
    //             formikRef.current.resetForm(); // Reset the form even if not successful
    //         }
    //     } catch (error) {
    //         if (error.name === 'ValidationError') {
    //             // Handle Yup validation errors and display error messages to the user
    //             const validationErrors = {};
    //             error.inner.forEach((err) => {
    //                 validationErrors[err.path] = err.message;
    //             });
    //             setErrorMessagePassword(validationErrors);
    //         } else {
    //             // Handle other errors (e.g., network errors) and display a generic error message
    //             console.log(error.message);
    //             toast.error('Có lỗi xảy ra khi thay đổi mật khẩu.');
    //         }
    //     }
    // };
   const validationSchema = yup.object().shape({
       currentPassword: yup.string().required('Current password is required'),
       newPassword: yup
           .string()
           .required('New password is required')
           .min(MIN_PASSWORD_LENGTH, `Password must be at least ${MIN_PASSWORD_LENGTH} characters`)
           .matches(
               /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])/,
               'Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character',
           ),
       confirmPassword: yup
           .string()
           .required('Confirm password is required')
           .oneOf([yup.ref('newPassword'), null], 'Passwords do not match'),
   });

    const onSubmit = async (values) => {
        try {
            const { currentPassword, newPassword, confirmPassword } = values;

             if (newPassword !== confirmPassword) {
                 setErrorMessagePassword('Confirmed password does not match.');
                 return;
             }

              if (newPassword === currentPassword || confirmPassword === currentPassword) {
                  setErrorMessagePassword(
                      'New password or confirm password must not be the same as the current password.',
                  );
                  return;
              }

            const userJSON = localStorage.getItem('user');
            const user = JSON.parse(userJSON);

            const data = {
                username: user.username,
                currentPassword: values.currentPassword,
                newPassword: values.newPassword,
                confirmPassword: values.confirmPassword,
            };

            const response = await apiClient.post('/change-password', data);

            if (response.data.success) {
                toast.success(response.data.message);
                formik.resetForm();
            } else {
                toast.error('Failed to update password');
                formik.resetForm();
            }
        } catch (error) {
            if (error.name === 'ValidationError') {
             
                setErrorMessagePassword(error.message);
                toast.error('Failed to update password');
            } else {
                console.log(error.message);
                toast.error('An error occurred while updating the password.');
            }
        }
    };

    const initialValues = {
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
    });


    const handleJustifyClick = (value) => {
        if (value === justifyActive) {
            return;
        }

        // Reset selectedAvatar when switching tabs
        setSelectedAvatar(null);
        setJustifyActive(value);
    };


    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const data = await findProfile();
                setLocations(data.locations);
                setUserProfile(data);
            } catch (e) {
                console.log('ERROR: ' + e);
            }
        };

        if (getUserId() && getToken()) {
            fetchUserProfile();
        }
    }, [getUserId(), getToken()]);

    useEffect(() => {
        dispatch(setHistory(PROFILE_PAGE));
        if (!getUser()) {
            navigate(LOGIN_PAGE);
        }
    }, []);
    const showUpdateConfirmation = () => {
        const isValidForm = validateForm();
        if (hasErrors || !isValidForm) {
            Swal.fire('Please correct your changes', '', 'error');
            return;
        }
        Swal.fire({
            title: 'Do you want to save the changes?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Save',
            denyButtonText: `Don't save`,
            customClass: {
                popup: 'custom-swal-dialog',
            },
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire('Saved!', '', 'success');
                handleUpdateProfile();
            } else if (result.isDenied) {
                Swal.fire('Changes are not saved', '', 'info');
            }
        });
    };

    const handleGenderChange = (event) => {
        setGender(event.value);
        setUserProfile({
            ...userProfile,
            gender: event.value,
        });
    };

    const handleUpdateProfile = async () => {
        setIsLoading(true);
        const updatedProfile = {
            id: userProfile?.id,
            avatar: userProfile?.avatar,
            fullName: userProfile?.fullName,
            email: userProfile?.email,
            gender: userProfile?.gender,
            phone: userProfile?.phone,
            locations: locations,
        };

        if (selectedAvatar) {
            try {
                const avatarURL = await uploadImage(selectedAvatar);
                const _user = { ...userProfile };
                _user.avatar = avatarURL;
                _user.fullName = updatedProfile.fullName;
                setUserProfile(_user);
                updatedProfile.avatar = avatarURL;
            } catch (error) {
                console.log('ERROR: ', error);
                Swal.fire('Error occurred while uploading avatar', '', 'error');
                return;
            }
        }

        try {
            const newProfile = await updateProfile(updatedProfile);
            setUserProfile(newProfile);
            const _user = getUser();
            _user.avatar = newProfile.avatar;
            _user.fullName = newProfile.fullName;
            localStorage.setItem('user', JSON.stringify(_user));
            setSelectedAvatar(null);
            setJustifyActive("tab1")
        } catch (error) {
            console.log('ERROR: ', error);
            Swal.fire('Error occurred while saving changes', '', 'error');
        }
        setIsLoading(false);
    };

    const handelChangeImg = (file) => {
        setSelectedAvatar(file);
    };

    const handleChangeFullName = (e) => {
        const name = e.target.value;
        setFullName(name);
        if (isEmpty(name.trim())) {
            setErrorFullName(ERROR_EMPTY_INPUT);
            setHasErrors(true);
        } else if (isInvalidVnName(name)) {
            setErrorFullName(ERROR_FULL_NAME);
            setHasErrors(true);
        } else {
            setErrorFullName(EMPTY_STRING);
            setHasErrors(false);
        }
    };

    const handleBlurFullName = (e) => {
        if (isEmpty(e.target.value)) {
            setErrorFullName(ERROR_EMPTY_INPUT);
            setHasErrors(true);
        }
    };

    const handleChangePhoneNumber = (e) => {
        const phone = e.target.value;
        setPhoneNumber(phone);
        if (phone) {
            setErrorPhoneNumber(EMPTY_STRING);
            setHasErrors(false);
        } else {
            setErrorPhoneNumber(ERROR_EMPTY_INPUT);
            setHasErrors(true);
        }
    };

    const handleBlurPhoneNumber = (e) => {
        const phone = e.target.value;
        setPhoneNumber(phone);
        if (!phone) {
            setErrorPhoneNumber(ERROR_EMPTY_INPUT);
            setHasErrors(true);
        } else if (!isMobilePhone(`${phone}`, 'vi-VN')) {
            setErrorPhoneNumber(ERROR_PHONE_NUMBER);
            setHasErrors(true);
        }
    };
    const isEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
    const handleChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
        if (isEmpty(email.trim())) {
            setErrorEmail(ERROR_EMPTY_INPUT);
            setHasErrors(true);
        } else if (!isEmail(email)) {
            setErrorEmail(ERROR_INVALID_EMAIL);
            setHasErrors(true);
        } else {
            setErrorEmail(EMPTY_STRING);
            setHasErrors(false);
        }
    };

    const handleBlurEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
        if (isEmpty(email)) {
            setErrorEmail(ERROR_EMPTY_INPUT);
            setHasErrors(true);
        } else if (!isEmail(email)) {
            setErrorEmail(ERROR_INVALID_EMAIL);
            setHasErrors(true);
        }
    };

    const handleSaveLocationList = (locationList) => {
        setLocations(locationList);
        if (locationList.length > ZERO && locationList.every((item) => !item.defaultAddress)) {
            setErrorLocations(ERROR_SELECT_DEFAULT_SELLER_LOCATION);
        } else {
            setErrorLocations(EMPTY_STRING);
        }
    };

    const validateForm = () => {
        let result = true;
        if (locations.length > ZERO && locations.every((item) => !item.defaultAddress)) {
            setErrorLocations(ERROR_SELECT_DEFAULT_SELLER_LOCATION);
            result = false;
        }
        return result;
    };

    return (
        <>
            <section style={{ backgroundColor: '#eee', paddingTop: '140px', minHeight: '95vh' }}>
                <div className="container py-5">
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="card mb-4">
                                <div className="card-body text-center">
                                    <Avatar src={userProfile?.avatar ?? blankAvatar} size={150} />
                                    <h5 className="my-3 fs-3">{getFullName()}</h5>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-8">
                            <MDBTabs justify className="mb-3 custom-tabs">
                                <MDBTabsItem>
                                    <MDBTabsLink
                                        className="custom-tabs-link"
                                        style={{ fontSize: '100%' }}
                                        onClick={() => handleJustifyClick('tab1')}
                                        active={justifyActive === 'tab1'}
                                    >
                                        Your Profile
                                    </MDBTabsLink>
                                </MDBTabsItem>
                                <MDBTabsItem>
                                    <MDBTabsLink
                                        className="custom-tabs-link"
                                        style={{ fontSize: '100%' }}
                                        onClick={() => handleJustifyClick('tab2')}
                                        active={justifyActive === 'tab2'}
                                    >
                                        Edit Profile
                                    </MDBTabsLink>
                                </MDBTabsItem>
                                <MDBTabsItem>
                                    <MDBTabsLink
                                        className="custom-tabs-link"
                                        style={{ fontSize: '100%' }}
                                        onClick={() => handleJustifyClick('tab3')}
                                        active={justifyActive === 'tab3'}
                                    >
                                        Change Password
                                    </MDBTabsLink>
                                </MDBTabsItem>
                            </MDBTabs>

                            <MDBTabsContent>
                                <MDBTabsPane show={justifyActive === 'tab1'}>
                                    <div className="card mb-4">
                                        <div className="card-body ">
                                            <div className="row">
                                                <div className="col-sm-3">
                                                    <p className="mb-0">Full Name:</p>
                                                </div>
                                                <div className="col-sm-9">
                                                    <p className="text-muted mb-0">{userProfile?.fullName}</p>
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="row">
                                                <div className="col-sm-3">
                                                    <p className="mb-0">Email:</p>
                                                </div>
                                                <div className="col-sm-9">
                                                    <p className="text-muted mb-0">{userProfile?.email}</p>
                                                </div>
                                            </div>
                                            <hr />

                                            <div className="row">
                                                <div className="col-sm-3">
                                                    <p className="mb-0">Gender:</p>
                                                </div>
                                                <div className="col-sm-9">
                                                    <p className="text-muted mb-0">{userProfile?.gender}</p>
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="row">
                                                <div className="col-sm-3">
                                                    <p className="mb-0">Mobile:</p>
                                                </div>
                                                <div className="col-sm-9">
                                                    <p className="text-muted mb-0">{userProfile?.phone}</p>
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="row">
                                                <div className="col-sm-3">
                                                    <p className="mb-0">Address:</p>
                                                </div>
                                                <div className="col-sm-9">

                                                    <LocationList isSeller={false}
                                                                  isReadOnly={true}
                                                                  locationList={userProfile?.locations}
                                                    />

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </MDBTabsPane>
                                {/*Edit Profile*/}
                                <MDBTabsPane show={justifyActive === 'tab2'}>
                                    <div className="card mb-4">
                                        <div className="card-body ">
                                            <div className="row">
                                                <div className="col-sm-3">
                                                    <p className="mb-0">Avatar:</p>
                                                </div>
                                                <div className="col-sm-9">
                                                    <ImageUploader
                                                        onChangeImage={handelChangeImg}
                                                        image={userProfile?.avatar}
                                                        selectedImageFile={selectedAvatar}
                                                        isMain={false}
                                                        isEmptyContent={true}
                                                    />
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="row">
                                                <div className="col-sm-3">
                                                    <p className="mb-0">Full Name:</p>
                                                </div>
                                                <div className="col-sm-9">
                                                    <InputText
                                                        value={userProfile?.fullName || ''}
                                                        type="text"
                                                        // className="info-input"
                                                        className={`info-input shadow-input ${classNames({
                                                            'p-invalid': errorFullName,
                                                        })}`}
                                                        style={{ fontSize: '100%' }}
                                                        onChange={(event) => {
                                                            setUserProfile({
                                                                ...userProfile,
                                                                fullName: event.target.value,
                                                            });
                                                            handleChangeFullName(event);
                                                        }}
                                                        onBlur={handleBlurFullName}
                                                    />
                                                    <br />
                                                    <small className="p-error ms-3 ">{errorFullName}</small>
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="row">
                                                <div className="col-sm-3">
                                                    <p className="mb-0">Email:</p>
                                                </div>
                                                <div className="col-sm-9">
                                                    <InputText
                                                        value={userProfile?.email || ''}
                                                        type="email"
                                                        className="info-input"
                                                        style={{ fontSize: '100%' }}
                                                        onChange={(event) => {
                                                            setUserProfile({
                                                                ...userProfile,
                                                                email: event.target.value,
                                                            });
                                                            handleChangeEmail(event);
                                                        }}
                                                        onBlur={handleBlurEmail}
                                                    />
                                                    <br />
                                                    <small className="p-error ms-3">{errorEmail}</small>
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="row">
                                                <div className="col-sm-3">
                                                    <p className="mb-0">Gender:</p>
                                                </div>
                                                <div className="col-sm-9" style={{ display: 'flex' }}>
                                                    <div className="flex align-items-center gender-radio">
                                                        <RadioButton
                                                            inputId="gender1"
                                                            name="gender"
                                                            value="Male"
                                                            onChange={handleGenderChange}
                                                            checked={userProfile?.gender === 'Male'}
                                                        />
                                                        <label htmlFor="gender1" className="ml-2">
                                                            Male
                                                        </label>
                                                    </div>
                                                    <div className="flex align-items-center gender-radio">
                                                        <RadioButton
                                                            inputId="gender2"
                                                            name="gender"
                                                            value="Female"
                                                            onChange={handleGenderChange}
                                                            checked={userProfile?.gender === 'Female'}
                                                        />
                                                        <label htmlFor="gender2" className="ml-2">
                                                            Female
                                                        </label>
                                                    </div>
                                                    <div className="flex align-items-center gender-radio">
                                                        <RadioButton
                                                            inputId="gender3"
                                                            name="gender"
                                                            value="Other"
                                                            onChange={handleGenderChange}
                                                            checked={userProfile?.gender === 'Other'}
                                                        />
                                                        <label htmlFor="gender3" className="ml-2">
                                                            Other
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="row">
                                                <div className="col-sm-3">
                                                    <p className="mb-0">Mobile:</p>
                                                </div>
                                                <div className="col-sm-9">
                                                    <InputText
                                                        value={userProfile?.phone || ''}
                                                        type="text"
                                                        className="info-input"
                                                        style={{ fontSize: '100%' }}
                                                        onChange={(event) => {
                                                            setUserProfile({
                                                                ...userProfile,
                                                                phone: event.target.value,
                                                            });
                                                            handleChangePhoneNumber(event);
                                                        }}
                                                        onBlur={handleBlurPhoneNumber}
                                                    />
                                                    <br />
                                                    <small className="p-error">{errorPhoneNumber}</small>
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="row">
                                                <div className="col-sm-3">
                                                    <p className="mb-0">Address:</p>
                                                </div>
                                                <div className="col-sm-9">
                                                    <div className="col-sm-9">
                                                        <LocationPicker
                                                            locationList={userProfile?.locations}
                                                            onSaveLocationList={handleSaveLocationList}
                                                            isSeller={false}
                                                        />
                                                        <div>
                                                            <small className="p-error">
                                                                {errorLocations}
                                                            </small>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="d-flex justify-content-end mt-4">
                                                {isLoading
                                                    ? <ProgressSpinner style={{width: '80px', height: '80px'}}
                                                                       strokeWidth="8"
                                                                       fill="var(--surface-ground)"
                                                                       animationDuration=".5s"
                                                    />
                                                    : <Button className="fs-4 update-button"
                                                              variant="primary"
                                                              onClick={showUpdateConfirmation}
                                                    >
                                                            Update profile
                                                    </Button>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </MDBTabsPane>

                                <MDBTabsPane show={justifyActive === 'tab3'}>
                                    <ToastContainer
                                        position="top-right"
                                        autoClose={1000}
                                        hideProgressBar
                                        newestOnTop={false}
                                        closeOnClick
                                        rtl={false}
                                        pauseOnFocusLoss
                                        draggable
                                        pauseOnHover
                                        transition={Slide}
                                        className="custom-toast-container" 
                                        toastClassName="custom-toast"
                                    />
                                    <form onSubmit={formik.handleSubmit}>
                                        <div className="card mb-4">
                                            <div className="card-body ">
                                                <div className="row">
                                                    <div className="col-sm-3">
                                                        <p className="mb-0">Current password:</p>
                                                    </div>
                                                    <div className="col-sm-9">
                                                        <InputText
                                                            type={showPassword ? 'text' : 'password'}
                                                            value={formik.values.currentPassword}
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                            name="currentPassword"
                                                            className="info-input"
                                                        />
                                                        {formik.touched.currentPassword &&
                                                            formik.errors.currentPassword && (
                                                                <div className="error">
                                                                    {formik.errors.currentPassword}
                                                                </div>
                                                            )}
                                                    </div>
                                                </div>
                                                <hr />
                                                <div className="row">
                                                    <div className="col-sm-3">
                                                        <p className="mb-0">New password:</p>
                                                    </div>
                                                    <div className="col-sm-9">
                                                        <InputText
                                                            type={showPassword ? 'text' : 'password'}
                                                            value={formik.values.newPassword}
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                            name="newPassword"
                                                            className="info-input"
                                                        />
                                                        {formik.touched.newPassword && formik.errors.newPassword && (
                                                            <div className="error">{formik.errors.newPassword}</div>
                                                        )}
                                                    </div>
                                                </div>
                                                <hr />
                                                <div className="row">
                                                    <div className="col-sm-3">
                                                        <p className="mb-0">Confirmed password:</p>
                                                    </div>
                                                    <div className="col-sm-9">
                                                        <InputText
                                                            type={showPassword ? 'text' : 'password'}
                                                            value={formik.values.confirmPassword}
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                            name="confirmPassword"
                                                            className="info-input"
                                                        />
                                                        {formik.touched.confirmPassword &&
                                                            formik.errors.confirmPassword && (
                                                                <div className="error">
                                                                    {formik.errors.confirmPassword}
                                                                </div>
                                                            )}
                                                    </div>
                                                </div>
                                                <hr />
                                                <div className="form-group">
                                                    <label htmlFor="showPassword">
                                                        <input
                                                            type="checkbox"
                                                            id="showPassword"
                                                            name="showPassword"
                                                            checked={showPassword}
                                                            onChange={(e) => setShowPassword(e.target.checked)}
                                                        />
                                                        Show Password
                                                    </label>
                                                    <hr />
                                                </div>
                                                <div className="d-flex justify-content-end mt-4">
                                                    <MDBBtn
                                                        className="fs-4 update-button"
                                                        variant="primary"
                                                        type="submit"
                                                    >
                                                        Update password
                                                    </MDBBtn>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </MDBTabsPane>
                            </MDBTabsContent>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default Profile;
