import React, {useEffect, useState} from 'react';
import {Button} from "primereact/button";
import {Dialog} from "primereact/dialog";
import {Card} from 'primereact/card';
import { Dropdown } from 'primereact/dropdown';

import pickUpTheGoods from "../../asset/img/pick-up-the-goods.jpg";
import {fetchSellerLocations} from "../../api/locationAPI";
import {RiContactsLine} from "react-icons/ri";
import {FiMapPin} from "react-icons/fi";
import {BsFillBuildingsFill} from "react-icons/bs";
import {postOrderToDeliveryService} from "../../api/orderAPI";
import {ProgressSpinner} from "primereact/progressspinner";

const DialogConfirmOrder = ({isOpen, order, onHide, onPostOrderSuccess}) => {

    // const options = [
    //     {
    //         button: <Button label="Confirm" icon="pi pi-check"  autoFocus />,
    //         title: "I will bring the goods to the post office myself",
    //         text: `You can send goods at any ${order?.deliveryService} post office in the same Province/City`,
    //         image: bringTheGoods
    //     },
    //     {
    //         button: <Button label="Next" icon="pi pi-check"  autoFocus />,
    //         title: "The delivery service company to pick up goods",
    //         text: `${order?.deliveryService} will come to pick up the goods according to the pickup address you will confirm`,
    //         image: pickUpTheGoods
    //     }
    // ];

    // const [deliveryMethod, setDeliveryMethod] = useState(null);
    const [locations, setLocations] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchSellerLocations().then(data => {
            setLocations(data);
            setSelectedLocation(data.find(item => item.defaultAddress));
        });
    }, []);


    const handleClickConfirmOrder = async () => {
        setIsLoading(true);
        const requestBody = {
            orderId: order?.id,
            sellerLocationId: selectedLocation.id,
            sellerBringGoodsToPostOffice: false
        }
        console.log(requestBody)
        const responseOrder = await postOrderToDeliveryService(requestBody);
        onPostOrderSuccess(responseOrder);
        setIsLoading(false);
        onHide();
    }

    const footerContent = (
        <div>
            {
                isLoading
                ? <ProgressSpinner style={{width: '50px', height: '50px'}}
                                   strokeWidth="8"
                                   fill="var(--surface-ground)"
                                   animationDuration=".5s"/>
                : <>
                        <Button label="Cancel" icon="pi pi-times" onClick={() => onHide(false)} className="p-button-text"/>
                        <Button label="Confirm" icon="pi pi-check" autoFocus onClick={handleClickConfirmOrder}/>
                    </>
            }
            {/*{deliveryMethod?.button}*/}
        </div>
    );

    // const itemTemplate = (value) => {
    //     return (
    //         <div className="flex justify-content-center card h-100">
    //             <Card title={<h5>{value.title}</h5>}
    //                   header={<img alt="Card" src={value.image} width={200} height={200} className="border"/>}
    //                   className="md:w-50rem xl:w-50rem lg:w-50rem h-100"
    //             >
    //                 <p>{value.text}</p>
    //             </Card>
    //         </div>
    //     );
    // }

    const header = (
        <div>
            <h4>Order Delivery</h4>
            <p className="text-uppercase">#{order?.cogyOrderCode}</p>
        </div>
    )

    const itemLocation = (location) => {
        return (
            <div className="col-12">
                <div className="flex flex-column xl:flex-row xl:align-items-start gap-4 ">
                    <div
                        className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3 mb-2">
                            <div className="d-flex align-items-center gap-2 mb-0 justify-content-between">
                                <div>
                                    <BsFillBuildingsFill size={25}/>
                                    <span className="font-semibold ms-3">{location?.typeAddress}</span>
                                </div>
                            </div>
                            <div className="flex align-items-center gap-3 mt-3 mb-2">
                                <RiContactsLine size={25}/>
                                <strong className="ms-3 mb-0">{`${location?.deputyName} | ${location?.phoneNumber}`}</strong>
                            </div>

                            <div className="flex align-items-center gap-3 mt-3 mb-3">
                                <span className="flex align-items-center gap-2">
                                    <FiMapPin size={25}/>
                                    <span className="font-semibold ms-3">
                                        {`${location?.address}, ${location?.hamlet}, ${location?.ward}, ${location?.district}, ${location?.province}`}
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <Dialog header={header}
                visible={isOpen}
                style={{width: '30vw'}}
                onHide={() => onHide(false)}
                footer={footerContent}
                className="d-flex justify-content-center"
        >
            {/*<SelectButton value={deliveryMethod}*/}
            {/*              onChange={(e) => setDeliveryMethod(e.value)}*/}
            {/*              options={options}*/}
            {/*              itemTemplate={(e) => itemTemplate(e)}*/}
            {/*              className="d-flex justify-content-center"*/}
            {/*/>*/}
            <div className="flex justify-content-center card h-100">
                <Card title={<h5>The delivery service company to pick up goods</h5>}
                      header={<img alt="Card" src={pickUpTheGoods} width={200} height={200}/>}
                      className="md:w-50rem xl:w-50rem lg:w-50rem h-100"
                >
                    <p>
                        {`${order?.deliveryService} 
                        delivery service will come to pick up the goods according to the pickup address you confirm`}
                    </p>
                    <div className="card flex justify-content-center mt-4">
                        <span className="p-float-label">
                        <Dropdown inputId="dd-location"
                                  value={selectedLocation}
                                  onChange={(e) => setSelectedLocation(e.value)}
                                  options={locations}
                                  itemTemplate={itemLocation}
                                  valueTemplate={() => itemLocation(selectedLocation)}
                                  optionLabel="deputyName"
                                  className="w-full md:w-14rem w-100"
                        />
                        <label htmlFor="dd-location">Select an address</label>
                        </span>
                    </div>
                </Card>
            </div>
        </Dialog>
    );
};

export default DialogConfirmOrder;