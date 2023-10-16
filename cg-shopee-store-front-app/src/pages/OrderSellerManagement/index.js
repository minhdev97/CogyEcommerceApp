import {useEffect, useState} from 'react';
import { TabView, TabPanel } from 'primereact/tabview';
import {useLocation, useNavigate} from "react-router-dom";
import {ORDER_SELLER_MANAGEMENT_PAGE} from "../../constant/page";
import OrderListManagement from "../../component/OrderListManagement";
import {ZERO} from "../../constant/number";
import {findOrdersBySellerId} from "../../api/orderAPI";


const statusOrders = ["all", "requesting", "pending", "delivering", "complete", "canceled"];

export default function OrderSellerManagement() {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const status = params.get('status');
    const navigate = useNavigate();
    const [activeIndex, setActiveIndex] = useState(ZERO);
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setActiveIndex(statusOrders.indexOf(status));
        setIsLoading(true);
        const fetchOrders = async () => {
            let orderList = [];
            orderList = await findOrdersBySellerId(status);
            setOrders(orderList);
            setIsLoading(false)
        }
        fetchOrders().then();
    }, [status]);

    const handleChangeTabPanel = (e) => {
        navigate(`${ORDER_SELLER_MANAGEMENT_PAGE}?status=${statusOrders[e.index]}`)
    }

    const handleUpdateOrderStatus = (orderUpdated) => {
        const _orders = [...orders];
        _orders.map(order => {
            if (order.id === orderUpdated?.id) {
                order.status = orderUpdated.status;
                order.deliveryTrackingCode = orderUpdated.deliveryTrackingCode;
            }
            return order;
        });
        setOrders(_orders);
    };
    return (
        <div className="d-flex justify-content-center">
            <div className="card col-xl-10 col-sm-12">
                <TabView activeIndex={activeIndex} onTabChange={handleChangeTabPanel}>
                    <TabPanel header="All" className="col" headerClassName="d-flex justify-content-center">
                        <OrderListManagement orderList={orders}
                                             isLoading={isLoading}
                                             onPostOrderSuccess={handleUpdateOrderStatus}
                        />
                    </TabPanel>
                    <TabPanel header="Requesting" className="col" headerClassName="d-flex justify-content-center">
                        <OrderListManagement orderList={orders}
                                             isLoading={isLoading}
                                             onPostOrderSuccess={handleUpdateOrderStatus}
                        />
                    </TabPanel>
                    <TabPanel header="Awaiting pick up" className="col" headerClassName="d-flex justify-content-center">
                        <OrderListManagement orderList={orders} isLoading={isLoading} />
                    </TabPanel>
                    <TabPanel header="Delivering" className="col" headerClassName="d-flex justify-content-center">
                        <OrderListManagement orderList={orders} isLoading={isLoading} />
                    </TabPanel>
                    <TabPanel header="Complete" className="col" headerClassName="d-flex justify-content-center">
                        <OrderListManagement orderList={orders} isLoading={isLoading} />
                    </TabPanel>
                    <TabPanel header="Canceled" className="col" headerClassName="d-flex justify-content-center">
                        <OrderListManagement orderList={orders} isLoading={isLoading} />
                    </TabPanel>
                </TabView>
            </div>
        </div>
    )
}
