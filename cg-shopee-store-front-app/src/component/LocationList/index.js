import {DataView} from 'primereact/dataview';
import {Tag} from 'primereact/tag';
import {SpeedDial} from "primereact/speeddial";
import {FiMapPin} from "react-icons/fi";
import {BsFillBuildingsFill} from "react-icons/bs";
import React, {useState} from "react";

import LocationDialog from "../../component/LocationDialog";
import "../../asset/scss/location-list.scss";
import {RiContactsLine} from "react-icons/ri";
import {Dialog} from "primereact/dialog";
import {Button} from "primereact/button";

export default function LocationList({locationList, isSeller, onUpdateLocation, onDeleteLocation, isReadOnly}) {
    const [editLocationDialog, setEditLocationDialog] = useState(false);
    const [deleteLocationDialog, setDeleteLocationDialog] = useState(false);
    const [locationToEdit, setLocationToEdit] = useState(null);
    const [locationToDelete, setLocationToDelete] = useState(null);

    const styleFontSize = () => {
        if (isSeller) {
            return { fontSize: '1rem' };
        } else {
            return { fontSize: '1.5rem' };
        }
    };

    const handleHideEditLocationDialog = () => {
        setEditLocationDialog(false);
    }


    const handleOpenEditLocationDialog = (location) => {
        setLocationToEdit(location);
        setEditLocationDialog(true);
    }


    const handleHideDeleteLocationDialog = () => {
        setDeleteLocationDialog(false);
    };


    const handleOpenDeleteLocationDialog = (location) => {
        setLocationToDelete(location);
        setDeleteLocationDialog(true);
    }


    const handleSaveLocation = (location) => {
        onUpdateLocation(location);
        setEditLocationDialog(false);
    }

    const handleDeleteLocation = () => {
        onDeleteLocation(locationToDelete);
        setDeleteLocationDialog(false);
    }


    const deleteLocationDialogFooter = (
        <React.Fragment>
            <Button label="No"
                    icon="pi pi-times"
                    size={isSeller ? "small" : "large"}
                    outlined
                    onClick={handleHideDeleteLocationDialog}
            />
            <Button label="Yes"
                    icon="pi pi-check"
                    severity="danger"
                    size={isSeller ? "small" : "large"}
                    onClick={handleDeleteLocation}
            />
        </React.Fragment>
    );


    const itemTemplate = (location) => {
        const items = [
            {
                label: 'Edit',
                icon: 'pi pi-pencil',
                command: () => {
                    handleOpenEditLocationDialog(location);
                    // toast.current.show({ severity: 'info', summary: 'Add', detail: 'Data Added' });
                }
            },
            {
                label: 'Delete',
                icon: 'pi pi-trash',
                command: () => {
                    handleOpenDeleteLocationDialog(location);
                    // toast.current.show({ severity: 'error', summary: 'Delete', detail: 'Data Deleted' });
                }
            }
        ];

        return (
            <div className="col-12">
                <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4 ">
                    <div
                        className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3 mb-2">
                            <div className="d-flex align-items-center gap-2 mb-0 justify-content-between">
                                <div>
                                    <BsFillBuildingsFill size={25}/>
                                    <span className="font-semibold ms-3" style={styleFontSize()}>{location.typeAddress}</span>
                                </div>
                                {!isReadOnly &&
                                    <SpeedDial style={{position: "relative"}}
                                               model={items}
                                               direction="left"
                                               buttonStyle={{width: '3rem', height: '3rem'}}
                                    />
                                }
                            </div>
                            <div className="flex align-items-center gap-3 mt-3 mb-2">
                                <RiContactsLine size={25}/>
                                <strong className="ms-3 mb-0" style={styleFontSize()}>{`${location.deputyName} | ${location.phoneNumber}`}</strong>

                            </div>

                            <div className="flex align-items-center gap-3 mt-3 mb-3">
                                <span className="flex align-items-center gap-2">
                                    <FiMapPin size={25}/>
                                    <span className="font-semibold ms-3" style={styleFontSize()}>
                                        {`${location.address}, ${location.hamlet}, ${location.ward}, ${location.district}, ${location.province}`}
                                    </span>
                                </span>
                            </div>
                            {location.defaultAddress &&
                                <Tag value={isSeller
                                    ? "Here is the address to pick up and return product"
                                    : "Here is the delivery address"}
                                     severity="warning"
                                     style={styleFontSize()}>
                                </Tag>
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="card">
            <DataView value={locationList} itemTemplate={itemTemplate}/>
            <LocationDialog onHideLocationDialog={handleHideEditLocationDialog}
                            isShown={editLocationDialog}
                            isSeller={isSeller}
                            onSaveLocation={handleSaveLocation}
                            isDefaultAddress={locationToEdit?.defaultAddress}
                            locationToEdit={locationToEdit}
            />
            <Dialog visible={deleteLocationDialog}
                    style={{width: '32rem'}}
                    style={styleFontSize()}
                    breakpoints={{'960px': '75vw', '641px': '90vw'}} header="Confirm" modal
                    footer={deleteLocationDialogFooter} onHide={handleHideDeleteLocationDialog}
            >
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{fontSize: {isSeller} ?'2rem':'4rem'}}/>
                    <span style={styleFontSize()}>Are you sure you want to delete this address?</span>
                </div>
            </Dialog>
        </div>
    )
}
