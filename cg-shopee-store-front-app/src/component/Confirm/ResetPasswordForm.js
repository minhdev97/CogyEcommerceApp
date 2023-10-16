import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setTitle } from '../../features/title/titleSlice';
import Footer from '../product/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import {RESET_PASSWORD_API} from "../../constant/api";

const validationSchema = Yup.object().shape({
    newPassword: Yup.string()
        .required('Mật khẩu là bắt buộc')
        .test('password', 'Mật khẩu không hợp lệ', function (value) {
            const regexLowercase = /[a-z]/;
            const regexUppercase = /[A-Z]/;
            const regexDigit = /\d/;
            const regexSpecial = /[!@#$%^&*()]/;

            let requirements = [];

            if (!regexLowercase.test(value)) {
                requirements.push('ít nhất một chữ thường');
            }
            if (!regexUppercase.test(value)) {
                requirements.push('ít nhất một chữ hoa');
            }
            if (!regexDigit.test(value)) {
                requirements.push('ít nhất một chữ số');
            }
            if (!regexSpecial.test(value)) {
                requirements.push('ít nhất một ký tự đặc biệt');
            }

            if (requirements.length > 0) {
                return this.createError({
                    path: 'password',
                    message: `Mật khẩu phải chứa ${requirements.join(', ')}`,
                });
            }

            return true;
        }),
});

function ResetPasswordForm({ onSubmit }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setTitle('Đặt lại mật khẩu'));
    }, [dispatch]);

    const handleGoBack = () => {
        navigate(-1);
    };

    const handleSubmitPassword = async (values, { setSubmitting }) => {
        try {
            await axios.post(RESET_PASSWORD_API, {
                newPassword: values.newPassword,
            });
            onSubmit(values.newPassword);
            navigate('/login');
        } catch (error) {
            alert('Có lỗi xảy ra. Vui lòng thử lại sau.');
        }
        setSubmitting(false);
    };

    return (
        <div>
            <div className="form-container">
                <button onClick={handleGoBack} className="btn btn-primary">
                    <FontAwesomeIcon icon={faArrowLeft} />
                </button>
                <Formik
                    initialValues={{ newPassword: '' }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmitPassword}
                >
                    {({ isSubmitting }) => (
                        <Form className="form">
                            <div className="text-center">
                                <p>Xác nhận đổi mật khẩu</p>
                            </div>
                            <div className="mb-3">
                                <Field
                                    type="password"
                                    name="newPassword"
                                    placeholder="Mật khẩu mới"
                                    className="form-control custom-input"
                                />
                                <ErrorMessage name="newPassword" component="div" className="text-danger" />
                            </div>
                            <div className="text-center mt-3">
                                <button type="submit" className="btn btn-primary custom-btn" disabled={isSubmitting}>
                                    Xác nhận thay đổi
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
            <Footer />
        </div>
    );
}

export default ResetPasswordForm;
