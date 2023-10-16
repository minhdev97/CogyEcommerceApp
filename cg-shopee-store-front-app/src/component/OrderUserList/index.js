import {Column} from "primereact/column";
import {DataTable} from "primereact/datatable";
import React, {useRef, useState} from "react";
import {Toolbar} from "primereact/toolbar";
import {Button} from "primereact/button";
import {ProgressSpinner} from "primereact/progressspinner";
import {InputText} from "primereact/inputtext";
import {Image} from "primereact/image";
import Avatar from "../../component/Avatar";
import {formatDateTime24h, formatVNDPrice} from "../../formater";
import {Tag} from "primereact/tag";
import {Link} from "react-router-dom";
import {GHTK_CHECK_ORDER} from "../../constant/link";


const OrderUserList = ({orderList, isLoading}) => {

    const dt = useRef(null);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [expandedRows, setExpandedRows] = useState([]);

    const exportCSV = () => {
        dt.current.exportCSV();
    };

    const rightToolbarTemplate = () => {
        return <Button label="Export" icon="pi pi-upload" size="large" className="p-button-help" onClick={exportCSV}/>;
    };

    const emptyMessageTemplate = () => {
        return <p>Order not found</p>;
    }

    const loadingTemplate = () => {
        return <ProgressSpinner style={{width: '80px', height: '80px'}}
                                strokeWidth="8"
                                fill="var(--surface-ground)"
                                animationDuration=".5s"
        />
    }


    const header = (
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
            <span className="p-input-icon-left">
                <i className="pi pi-search"/>
                <InputText
                    type="search"
                    style={{fontSize: '1.5rem'}}
                    onInput={(e) => setGlobalFilter(e.target.value)}
                    placeholder="Search..."
                />
            </span>
        </div>
    );

    const imageBodyTemplate = (product) => {
        return <Image src={`${product.image}`}
                      zoomSrc={`${product.image}`}
                      alt={product.name}
                      width="80"
                      height="80"
                      preview/>;
    };

    const rowExpansionTemplate = (rowData) => {
        return (
            <div className="p-3">
                <h5>Order Detail</h5>
                <DataTable value={rowData.orderDetails} dataKey="id" style={{fontSize: '1.5rem'}}>
                    <Column field="productName" header="Name of product"></Column>
                    <Column field="image" header="Image" body={imageBodyTemplate}></Column>
                    <Column field="color" header="First classify"></Column>
                    <Column field="size" header="Second classify"></Column>
                    <Column field="quantity" header="Quantity"></Column>
                </DataTable>
            </div>
        );
    };

    const buyerBodyTemplate = (rowData) => {
        return (
            <div className="flex align-items-center gap-2">
                <Avatar src={rowData.seller.image} size={30}/>
                <span className="ms-2">{rowData.seller.name}</span>
            </div>
        );
    };


    const getSeverity = (status) => {
        switch (status) {
            case 'REQUESTING':
                return 'warning';
            case 'PENDING':
                return 'info';
            case 'DELIVERING':
                return 'info';
            case 'COMPLETE':
                return 'success';
            case 'CANCELED':
                return 'danger';
            default:
                return null;
        }
    };


    const statusBodyTemplate = (rowData) => {
        return <Tag value={rowData.status} severity={getSeverity(rowData.status)}  style={{fontSize: '1.2rem'}}/>;
    }


    const processBodyTemplate = (rowData) => {
        console.log()
        return rowData.deliveryTrackingCode
            ? <Link to={`${GHTK_CHECK_ORDER}/${rowData.deliveryTrackingCode}`} target="_blank">
                <Button icon="pi pi-eye" rounded outlined size="large"/>
            </Link>
            : null;
    }


    return (
        <div className="card">
            <Toolbar className="mb-4" right={rightToolbarTemplate}></Toolbar>
            <DataTable ref={dt}
                       emptyMessage={emptyMessageTemplate}
                       loading={isLoading}
                       loadingIcon={loadingTemplate}
                       value={orderList}
                       expandedRows={expandedRows}
                       onRowToggle={(e) => setExpandedRows(e.data)}
                       rowExpansionTemplate={rowExpansionTemplate}
                       dataKey="id"
                       style={{fontSize: '1.5rem'}}
                       paginator
                       rows={10}
                       rowsPerPageOptions={[5, 10, 25]}
                       currentPageReportTemplate="Showing {first} to {last} of {totalRecords} orders"
                       globalFilter={globalFilter}
                       header={header}>
                <Column expander={true} style={{width: '5rem'}}/>
                <Column field="seller"
                        header="Shop"
                        style={{minWidth: '15rem'}}
                        body={buyerBodyTemplate}>
                </Column>
                <Column field="totalPrice"
                        header="Total Order"
                        body={rowData => formatVNDPrice(rowData.totalPrice)}
                        style={{minWidth: '10rem'}}>
                </Column>
                <Column field="cogyOrderCode"
                        header="Code of Order"
                        style={{minWidth: '10rem'}}
                        bodyClassName={"text-uppercase"}>
                </Column>
                <Column field="status" header="Status" style={{minWidth: '10rem'}} body={statusBodyTemplate}></Column>
                <Column field="deliveryService" header="Delivery Service" style={{minWidth: '10rem'}}></Column>
                <Column field="requestTime"
                        header="Ordering Time"
                        style={{minWidth: '10rem'}}
                        body={rowData => formatDateTime24h(rowData.requestTime)}>
                </Column>
                <Column body={processBodyTemplate} style={{minWidth: '12rem'}}></Column>
            </DataTable>
        </div>
    );
};

export default OrderUserList;