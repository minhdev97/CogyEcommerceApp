import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setTitle } from '../../features/title/titleSlice';
import Footer from '../product/Footer';
import '../../asset/css/confirm/style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import * as Yup from 'yup';
import axios from 'axios';
import {CONFIRM_EMAIL_API} from "../../constant/api";


export const validation = Yup.object().shape({
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
});
const ConfirmEmailForm = ({ onSubmit }) => {
    const formikRef = useRef(null);
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const dispatch = useDispatch();

    const initialValues = {
        email: '',
    };

    useEffect(() => {
        dispatch(setTitle('Confirm Email'));
    }, [dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();

        axios
            .post(CONFIRM_EMAIL_API, { email })
            .then((response) => {
                if (response.status === 200) {
                    onSubmit(email);
                    alert('Confirmation email is successfully');
                    formikRef.current.resetForm();
                } else if (response.status === 400) {
                    alert('Email not found');
                } else {
                    alert('An error occurred while validating the email');
                }
                setEmail('');
            })
            .catch((error) => {
                console.error('Error validating email:', error);
                alert('An error occurred while validating the email');
            });
    };
    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <>
            <div className="form-container">
                <button onClick={handleGoBack} className="btn btn-primary   ">
                    <FontAwesomeIcon icon={faArrowLeft} />
                </button>
                <form onSubmit={handleSubmit} className="form" initialValues={initialValues} validation={validation}>
                    <div className="text-center">
                        <p>Xác nhận đổi mật khẩu</p>
                    </div>
                    <div className="mb-3">
                        <input
                            placeholder="Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control custom-input"
                            id="email"
                        />
                    </div>
                    <div className="text-center mt-3">
                        <button type="submit" className="btn btn-primary custom-btn">
                            Xác nhận
                        </button>
                    </div>
                </form>
            </div>
            <Footer />
        </>
    );
};

export default ConfirmEmailForm;
