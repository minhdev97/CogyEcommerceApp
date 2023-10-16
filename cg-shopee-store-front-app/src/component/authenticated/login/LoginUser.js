import React, { useEffect, useState, useRef } from 'react';
import { MDBBtn, MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import '../../../asset/css/auther/LoginUser.css';
import '../../../asset/css/auther/customer_toast.css';
import { setTitle } from '../../../features/title/titleSlice';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { login } from '../../authrization/auth';
import * as Yup from 'yup';
import LogoCogy from '../../../component/LogoCogy';
import { EMAIL_COFIRM_FORM, REGISTER_USER_PAGE } from '../../../constant/page';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';
import { selectHistory } from '../../../features/history/historySlice';
import { Slide, ToastContainer, toast } from 'react-toastify';


const LoginUser = () => {
    const formikRef = useRef(null);
    const dispatch = useDispatch();
    // const navigate = useNavigate();
    // const history = useHistory();
    const historyOrHomePage = useSelector(selectHistory);
    const [isLogin, setIsLogin] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        dispatch(setTitle('Sign In'));
    }, [dispatch]);

    const togglePasswordVilisibity = () => {
        setShowPassword(!showPassword);
    };

    const initialValues = {
        username: '',
        password: '',
    };

    const usernameRegex = /^[a-zA-Z0-9]*$/;
    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .required('Username is required')
            .test('username', 'Invalid username', function (value) {
                if (!usernameRegex.test(value)) {
                    return this.createError({
                        path: 'username',
                        message: 'Invalid username',
                    });
                }
                return true;
            }),

        password: Yup.string()
            .required('Password is required')
            .test('password', 'Invalid password', function (value) {
                const requirements = [];

                if (!/[a-z]/.test(value)) {
                    requirements.push('at least one lowercase letter');
                }
                if (!/[A-Z]/.test(value)) {
                    requirements.push('at least one uppercase letter');
                }
                if (!/\d/.test(value)) {
                    requirements.push('at least one digit');
                }
                if (!/[!@#$%^&*()]/.test(value)) {
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
    });

    const handleLogin = async (values) => {
        try {
            await login(values.username, values.password);
            setIsLogin(true);
            setTimeout(() => {
                // navigate(historyOrHomePage);
                window.location.replace(historyOrHomePage);
            },100);
            formikRef.current.resetForm();
        } catch (error) {
            console.error('Register error', error.message);
            setIsLogin(false);
            toast.error('Đăng nhập không thành công!' ,{ closeOnClick: true });
        }
    };

    return (
        <MDBContainer className="mt-5 gradient-form mb-0">
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
                className="custom-toast-container" // Áp dụng lớp CSS tùy chỉnh
                toastClassName="custom-toast"
            />
            {/* {isLogin && (
                <div>
                    <p>Thông báo:</p>
                    <p>Đăng nhập thành công!</p>
                </div>
            )} */}
            <MDBRow>
                <MDBCol className="mb-0 col-md-6 col-sm-12 col-12">
                    <div className="d-flex flex-column">
                        <div className="text-center">
                            <div className="mt-2">
                                <LogoCogy isBlue={true} widthInput={'310'} />
                            </div>
                            <h4 className="mt-1 mb-2 pb-1 " style={{ color: '#282882' }}>
                                We are The Cogy Team
                            </h4>
                        </div>

                        <p>Please login to your account</p>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={handleLogin}
                            innerRef={formikRef}
                        >
                            <Form className="login-form">
                                <div>
                                    <span>
                                        Username <sup style={{ color: 'red' }}>*</sup>
                                    </span>
                                </div>
                                <Field
                                    wrapperClass="mb-3"
                                    label="User name"
                                    id="username"
                                    name="username"
                                    type="text"
                                    className="form-control cogy-login-input"
                                />
                                <ErrorMessage name="username" component="div" className="error-message" />
                                <div>
                                    <span>
                                        Password <sup style={{ color: 'red' }}>*</sup>
                                    </span>
                                </div>

                                <div className="input-wrapper">
                                    <Field
                                        wrapperClass="mb-3"
                                        label="Password"
                                        id="password"
                                        name="password"
                                        type={showPassword ? 'text' : 'password'}
                                        className="form-control cogy-login-input"
                                    />
                                    <FontAwesomeIcon
                                        icon={showPassword ? faEye : faEyeSlash}
                                        onClick={togglePasswordVilisibity}
                                        className="password-toggle"
                                    />
                                </div>
                                <ErrorMessage name="password" component="div" className="error-message" />

                                <div className="text-center pt-1 mb-5 pb-1">
                                    <MDBBtn className="mb-4 w-100 gradient-custom-2" type="submit">
                                        Sign in
                                    </MDBBtn>
                                    <Link className="text-muted" to={EMAIL_COFIRM_FORM}>
                                        Forgot password?
                                    </Link>
                                </div>

                                <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
                                    <p className="mb-0">Don't have an account?</p>
                                    <Link to={REGISTER_USER_PAGE}>
                                        <MDBBtn outline className="mx-2" color="danger">
                                            Register
                                        </MDBBtn>
                                    </Link>
                                </div>
                            </Form>
                        </Formik>
                    </div>
                </MDBCol>

                <MDBCol className="mb-5 col-md-6 col-sm-12 col-12">
                    <div className="d-flex flex-column  justify-content-center gradient-custom-2 h-100 mb-4">
                        <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                            <h4 className="mb-4">We are more than just a company</h4>
                            <p className="small mb-0">
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
};

export default LoginUser;

// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import '~/asset/css/auther/LoginUser.css';
// import { setTitle } from '~/features/title/titleSlice';
// import { login } from '~/component/authrization/auth';

// const LoginUser = () => {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const [showPassword, setShowPassword] = useState(false);
//     const [errorMessage, setErrorMessage] = useState('');

//     React.useEffect(() => {
//         dispatch(setTitle('Sign In'));
//     }, [dispatch]);

//     const validationSchema = Yup.object().shape({
//         username: Yup.string().required('Vui lòng nhập username'),
//         password: Yup.string().required('Vui lòng nhập mật khẩu'),
//     });

//     const formik = useFormik({
//         initialValues: {
//             username: '',
//             password: '',
//         },
//         validationSchema,
//         onSubmit: async (values) => {
//             try {
//                 const user = await login(values.username, values.password);
//                 localStorage.setItem('user', JSON.stringify(user));
//                 navigate('/');
//             } catch (error) {
//                 setErrorMessage(error.message);
//             }
//         },
//     });

//     // const handleTogglePassword = () => {
//     //     setShowPassword(!showPassword);
//     // };

//     return (
//         <MDBContainer className="mt-5 gradient-form">
//             <MDBRow>
//                 <MDBCol className="mb-5 col-md-6 col-sm-12 col-12">
//                     <div className="d-flex flex-column">
//                         <div className="text-center">
//                             <img
//                                 src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
//                                 style={{ width: '185px' }}
//                                 alt="logo"
//                             />
//                             <h4 className="mt-1 mb-5 pb-1">We are The Lotus Team</h4>
//                         </div>

//                         <form onSubmit={formik.handleSubmit}>
//                             <p>Please login to your account</p>

//                             <MDBInput
//                                 wrapperClass="mb-4"
//                                 label="Email address"
//                                 id="username"
//                                 name="username"
//                                 type="text"
//                                 value={formik.values.username}
//                                 onChange={formik.handleChange}
//                                 onBlur={formik.handleBlur}
//                             />
//                             {formik.touched.username && formik.errors.username && (
//                                 <div className="text-danger">{formik.errors.username}</div>
//                             )}

//                             <MDBInput
//                                 wrapperClass="mb-4"
//                                 label="Password"
//                                 id="password"
//                                 name="password"
//                                 type={showPassword ? 'text' : 'password'}
//                                 value={formik.values.password}
//                                 onChange={formik.handleChange}
//                                 onBlur={formik.handleBlur}
//                             />
//                             {formik.touched.password && formik.errors.password && (
//                                 <div className="text-danger">{formik.errors.password}</div>
//                             )}

//                             <div className="text-center pt-1 mb-5 pb-1">
//                                 <MDBBtn className="mb-4 w-100 gradient-custom-2" type="submit">
//                                     Sign in
//                                 </MDBBtn>
//                                 <a className="text-muted" href="#!">
//                                     Forgot password?
//                                 </a>
//                             </div>
//                         </form>

//                         <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
//                             <p className="mb-0">Don't have an account?</p>
//                             <MDBBtn outline className="mx-2" color="danger">
//                                 Danger
//                             </MDBBtn>
//                         </div>
//                     </div>
//                 </MDBCol>

//                 <MDBCol className="mb-5 col-md-6 col-sm-12 col-12">
//                     <div className="d-flex flex-column  justify-content-center gradient-custom-2 h-100 mb-4">
//                         <div className="text-white px-3 py-4 p-md-5 mx-md-4">
//                             <h4 className="mb-4">We are more than just a company</h4>
//                             <p className="small mb-0">
//                                 Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
//                                 incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
//                                 exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
//                             </p>
//                         </div>
//                     </div>
//                 </MDBCol>
//             </MDBRow>
//         </MDBContainer>
//     );
// };

// export default LoginUser;
