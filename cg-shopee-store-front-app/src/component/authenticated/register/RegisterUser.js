import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { MDBBtn, MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../../authrization/auth';
import { ToastContainer, toast } from 'react-toastify';
import { LOGIN_PAGE } from '../../../constant/page';
import LogoCogy from '../../../component/LogoCogy';
import { useDispatch } from 'react-redux';
import { setTitle } from '../../../features/title/titleSlice';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import '../../../asset/css/auther/LoginUser.css';
import 'react-toastify/dist/ReactToastify.css';

export const validationSchema = Yup.object().shape({
    fullName: Yup.string()
        .test('full-name-validation', 'Invalid full name', function (value) {
            const regex = /^[a-zA-ZÀ-ỹ\s]+$/;
            if (!regex.test(value)) {
                return this.createError({
                    message: 'Invalid full name',
                    path: 'fullName',
                });
            }
            return true;
        })
        .required('Full Name is required'),

    username: Yup.string()
        .required('Username is required')
        .min(8, 'Username must be at least 8 characters')
        .test('username', 'Invalid username', async function (value) {
            const regex = /^[a-zA-Z0-9]*$/;
            if (!regex.test(value)) {
                toast.error('Invalid username');
                return false;
            }
            return true;
        }),

    email: Yup.string()
        .required('Email is required')
        .test('email-validation', 'Invalid Email', function (value) {
            const regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
            if (!regex.test(value)) {
                return this.createError({
                    message: 'Invalid Email',
                    path: 'email',
                });
            }
            return true;
        }),

    password: Yup.string()
        .required('Password is required')
        .test('password', 'Invalid password', function (value) {
            const regexLowercase = /[a-z]/;
            const regexUppercase = /[A-Z]/;
            const regexDigit = /\d/;
            const regexSpecial = /[!@#$%^&*()]/;

            let requirements = [];

            if (!regexLowercase.test(value)) {
                requirements.push('at least one lowercase letter');
            }
            if (!regexUppercase.test(value)) {
                requirements.push('at least one uppercase letter');
            }
            if (!regexDigit.test(value)) {
                requirements.push('at least one digit');
            }
            if (!regexSpecial.test(value)) {
                requirements.push('at least one special character');
            }

            if (requirements.length > 0) {
                return this.createError({
                    path: 'password',
                    message: `Password must contain ${requirements.join(', ')}`,
                });
            }

            return true;
        })
        .required('Password is required'),
    phone: Yup.string()
        .matches(/^(84|0[3|5|7|8|9])+([0-9]{8})\b/, 'Invalid phone number')
        .required('Phone number is required'),
    confirm_password: Yup.string()
        .label('confirm password')
        .required()
        .oneOf([Yup.ref('password'), null], 'Passwords must match'),
});

function RegisterUser() {
    // const formikRef = useRef(null);
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const hrefNavigate = useNavigate();
    const [isRegister, setIsRegister] = useState(false);

    const initialValuesDto = {
        fullName: '',
        username: '',
        email: '',
        password: '',
        confirm_password: '',
        phone: '',
        keep_signed_in: false,
    };

    useEffect(() => {
        dispatch(setTitle('Register'));
    }, [dispatch]);

    const togglePasswordVilisibity = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
        try {
            const { fullName, username, email, password, phone } = values;
            await register(fullName, username, email, password, phone);
            setIsRegister(true);
            setTimeout(() => {
                hrefNavigate('/login');
            }, 1000);
            // formikRef.current.resetForm();
        } catch (error) {
            console.error('Register error', error.message);
            setFieldError('general', error.message);
            setIsRegister(false);
            toast.error('Đăng ký không thành công!');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <MDBContainer className="my-5 gradient-form">
            <ToastContainer />
            {/* {isRegister && (
                <div>
                    <p>Thông báo:</p>
                    <p>Đăng ký thành công!</p>
                </div>
            )} */}
            <MDBRow>
                <MDBCol col="6" className="mb-0">
                    <div className="d-flex flex-column ms-5">
                        <div className="text-center">
                            <div className="mt-2">
                                <LogoCogy isBlue={true} widthInput={'310'} />
                            </div>
                            <h4 className="mt-1 pb-1">We are The Cogy team</h4>
                        </div>

                        <p>Please Register to your account</p>

                        <Formik
                            initialValues={initialValuesDto}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            {(formikProps) => (
                                <Form>
                                    <div className="mb-2">
                                        <label htmlFor="fullName" className="form-label">
                                            Full Name
                                        </label>
                                        <Field type="text" id="fullName" name="fullName" className="form-control" />
                                        <ErrorMessage name="fullName" component="div" className="error-message" />
                                    </div>

                                    <div className="mb-2">
                                        <label htmlFor="username" className="form-label">
                                            Username
                                        </label>
                                        <Field type="text" id="username" name="username" className="form-control" />
                                        <ErrorMessage name="username" component="div" className="error-message" />
                                    </div>

                                    <div className="mb-2">
                                        <label htmlFor="email" className="form-label">
                                            Email
                                        </label>
                                        <Field type="email" id="email" name="email" className="form-control" />
                                        <ErrorMessage name="email" component="div" className="error-message" />
                                    </div>

                                    <div className="mb-2">
                                        <label htmlFor="password" className="form-label">
                                            Password
                                        </label>
                                        <div className="input-wrapper">
                                            <Field
                                                label="Password"
                                                id="password"
                                                name="password"
                                                type={showPassword ? 'text' : 'password'}
                                                className="form-control "
                                            />
                                            <FontAwesomeIcon
                                                icon={showPassword ? faEye : faEyeSlash}
                                                onClick={togglePasswordVilisibity}
                                                className="password-toggle"
                                            />
                                        </div>
                                        <ErrorMessage name="password" component="div" className="error-message" />
                                    </div>

                                    <div className="mb-2">
                                        <label htmlFor="confirm_password" className="form-label">
                                            Confirm Password
                                        </label>
                                        <div className="input-wrapper">
                                            <Field
                                                type="password"
                                                label="comfirm_password"
                                                id="confirm_password"
                                                name="confirm_password"
                                                className="form-control "
                                            />
                                        </div>
                                        <ErrorMessage
                                            name="confirm_password"
                                            component="div"
                                            className="error-message"
                                        />
                                    </div>

                                    <div className="mb-2">
                                        <label htmlFor="phone" className="">
                                            Phone
                                        </label>
                                        <Field type="text" id="phone" name="phone" className="form-control" />
                                        <ErrorMessage name="phone" component="div" className="error-message" />
                                    </div>

                                    <div className="text-center pt-1 mb-3 pb-1">
                                        <MDBBtn
                                            className="mb-4 w-100 gradient-custom-2"
                                            type="submit"
                                            disabled={formikProps.isSubmitting}
                                        >
                                            {formikProps.isSubmitting ? 'Submitting...' : 'Sign Up'}
                                        </MDBBtn>
                                    </div>
                                </Form>
                            )}
                        </Formik>

                        <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
                            <p className="mb-0">Don't have an account?</p>
                            <Link to={LOGIN_PAGE}>
                                <MDBBtn outline className="mx-2" color="danger">
                                    Login page
                                </MDBBtn>
                            </Link>
                        </div>
                    </div>
                </MDBCol>

                <MDBCol col="6" className="mb-5">
                    <div className="d-flex flex-column  justify-content-center gradient-custom-2 h-100 mb-4">
                        <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                            <h4 class="mb-4">We are more than just a company</h4>
                            <p class="small mb-0">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            </p>
                        </div>
                    </div>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}

export default RegisterUser;
