import {useEffect, useState} from 'react';
import { TabView, TabPanel } from 'primereact/tabview';
import {ZERO} from "../../constant/number";
import {findOrdersBySellerId, findOrdersByUserId} from "../../api/orderAPI";
import OrderUserList from "../../component/OrderUserList";


const statusOrders = ["all", "REQUESTING", "PENDING", "DELIVERING", "COMPLETE", "CANCELED"];

export default function OrderUserTabview() {
    const [activeIndex, setActiveIndex] = useState(ZERO);
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        const fetchOrders = async () => {
            let orderList = [];
            orderList = await findOrdersByUserId(statusOrders[activeIndex]);
            setOrders(orderList);
            setIsLoading(false)
        }
        fetchOrders().then();
    }, [activeIndex]);


    return (
        <div className="d-flex justify-content-center" style={{backgroundColor: '#eee', paddingTop: '160px'}}>
            <div className="card col-xl-10 col-sm-12">
                <TabView activeIndex={activeIndex}
                         onTabChange={(e) => setActiveIndex(e.index)}
                         style={{fontSize: '1.5rem'}}
                >
                    <TabPanel header="All" className="col" headerClassName="d-flex justify-content-center">
                        <OrderUserList isLoading={isLoading}
                                       orderList={orders}
                        />
                    </TabPanel>
                    <TabPanel header="Requesting" className="col" headerClassName="d-flex justify-content-center">
                        <OrderUserList isLoading={isLoading}
                                       orderList={orders}
                        />
                    </TabPanel>
                    <TabPanel header="Awaiting pick up" className="col" headerClassName="d-flex justify-content-center">
                        <OrderUserList isLoading={isLoading}
                                       orderList={orders}
                        />
                    </TabPanel>
                    <TabPanel header="Delivering" className="col" headerClassName="d-flex justify-content-center">
                        <OrderUserList isLoading={isLoading}
                                       orderList={orders}
                        />
                    </TabPanel>
                    <TabPanel header="Complete" className="col" headerClassName="d-flex justify-content-center">
                        <OrderUserList isLoading={isLoading}
                                       orderList={orders}
                        />
                    </TabPanel>
                    <TabPanel header="Canceled" className="col" headerClassName="d-flex justify-content-center">
                        <OrderUserList isLoading={isLoading}
                                       orderList={orders}
                        />
                    </TabPanel>
                </TabView>
            </div>
        </div>
    )
}
