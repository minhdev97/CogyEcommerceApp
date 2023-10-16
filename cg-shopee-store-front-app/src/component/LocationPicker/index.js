import {Button} from "primereact/button";
import {ZERO} from "../../constant/number";
import LocationList from "../../component/LocationList";
import React, {useEffect, useMemo, useState} from "react";
import LocationDialog from "../../component/LocationDialog";

const LocationPicker = ({locationList, onSaveLocationList, isSeller}) => {

    const [shownLocationDialog, setShownLocationDialog] = useState(false);
    const [defaultAddress, setDefaultAddress] = useState(false);
    const [locations, setLocations] = useState([]);
    const locationListMemo = useMemo(() => locationList, [locationList]);


    useEffect(() => {
        if (locationListMemo) {
            const _locations = locationListMemo.map((item, index) => {
                const _item = {...item};
                _item.index = index
                return _item;
            });
            setLocations(_locations);
        }
    },[locationListMemo])


    const handleHideLocationDialog = () => {
        setShownLocationDialog(false);
    }


    const handleOpenLocationDialog = () => {
        if (locations.length === ZERO) {
            setDefaultAddress(true);
        } else {
            setDefaultAddress(false);
        }
        setShownLocationDialog(true);
    }

    const styleFontSize = () => {
        if (isSeller) {
            return { fontSize: '1rem' };
        } else {
            return { fontSize: '1.5rem' };
        }
    };



    const handleSaveLocation = (location) => {
        let _locations = [...locations];
        const _location = location;
        if (_location.index !== -1) {
            _locations = _locations.filter(item => item.index !== _location.index);
        } else {
            _location.index = _locations.length;
        }
        if (_location.defaultAddress) {
            _locations.map(item => item.defaultAddress = false);
        }
        _locations.unshift(_location);
        setLocations(_locations);
        onSaveLocationList(_locations);
        setShownLocationDialog(false);
    }


    const handleDeleteLocation = (location) => {
        const _locations = locations.filter(item => item.index !== location.index);
        _locations.length > ZERO && _locations.forEach((item, index) => item.index = index);
        setLocations(_locations);
        onSaveLocationList(_locations);
    }

    return (
        <>
            <div className="d-flex flex-column gap-2 mb-3">
                {isSeller &&
                    <label className="mb-0 pb-0">
                        Pick up address <sup style={{color: "red"}}>*</sup>
                    </label>
                }
                <div className="col-lg-6 col-md-6">
                    <Button label="Add address"
                            icon="pi pi-map-marker"
                            size="small"
                            style={styleFontSize()}
                            className="gradient-custom-2 "
                            onClick={handleOpenLocationDialog}
                    />
                </div>
            </div>

            {locations.length !== ZERO &&
                <LocationList locationList={locations}
                              isSeller={isSeller}
                              onUpdateLocation={handleSaveLocation}
                              onDeleteLocation={handleDeleteLocation}
                />
            }

            <LocationDialog onHideLocationDialog={handleHideLocationDialog}
                            isShown={shownLocationDialog}
                            isSeller={isSeller}
                            onSaveLocation={handleSaveLocation}
                            isDefaultAddress={defaultAddress}
            />

        </>
    );
};

export default LocationPicker;