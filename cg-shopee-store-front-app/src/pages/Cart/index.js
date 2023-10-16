import React from 'react';
import '../../asset/css/normalize.min.css';
import '../../asset/css/main/responsive.css';
import '../../asset/font/fontawesome-free-6.1.1/css/all.min.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import CartItem from '../../component/Layout/CartItem';
import CartHeader from '../../component/Layout/CartHeader';

const Cart = () => {
    return (
        <div>
            <CartHeader pageDescription="Cart"/>
            <CartItem />
        </div>
    );
};

export default Cart;
