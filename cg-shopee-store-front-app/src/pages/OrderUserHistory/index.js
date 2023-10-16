import CartHeader from "../../component/Layout/CartHeader";
import OrderUserTabview from "../../component/OrderUserTabview";

const OrderUserHistory = () => {
    return (
        <div>
            <CartHeader pageDescription="Order History"/>
            <OrderUserTabview />
        </div>
    );
};

export default OrderUserHistory;