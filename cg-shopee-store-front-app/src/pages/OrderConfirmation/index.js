import React from 'react';
import {MDBBtn} from "mdb-react-ui-kit";
import {useNavigate} from "react-router-dom";

const OrderConfirmation = () => {
    const navigate = useNavigate();
    return (
        <>
            <div
                className="text-center"
                style={{
                    marginTop: "140px",
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '75vh',
                }}
            >
                <img
                    src="https://i.ibb.co/CztF1xt/Capture-removebg-preview.png"
                    alt=""
                />
                <br/>
                <p className="h3">Cám ơn bạn đã sử dụng dịch vụ của chúng tôi</p>
                <MDBBtn
                    size="lg"
                    style={{
                        backgroundColor: 'blue',
                        width: '250px',
                        height: '40px',
                        fontSize: '14px',
                        borderRadius: '10px',
                        marginTop: '20px',
                    }}
                    onClick={() => navigate('/')}
                >
                    Tiếp tục mua sắm
                </MDBBtn>
            </div>
        </>
    );
};

export default OrderConfirmation;