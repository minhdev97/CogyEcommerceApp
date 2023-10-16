import React, {useState, useEffect} from 'react';
import {Galleria} from 'primereact/galleria';
import {PhotoService} from './PhotoService.js';

export default function IndicatorsDemo({props}) {
    const [images, setImages] = useState(null);
    const [inside, setInside] = useState(true);
    const [position, setPosition] = useState('bottom');
    useEffect(() => {
        PhotoService.getImages().then(data => setImages(data));
    }, []);

    const itemTemplate = (item) => {
        return <img src={item.itemImageSrc} alt={item.alt} style={{width: '100%', display: 'block'}}/>;
    }

    const thumbnailTemplate = (item) => {
        return <img src={item.thumbnailImageSrc} alt={item.alt} style={{display: 'block'}}/>;
    }

    return (
        <div className="card">
            <Galleria value={images} numVisible={5} style={{maxWidth: props }}
                      showItemNavigators showItemNavigatorsOnHover showIndicators
                      showThumbnails={false} item={itemTemplate} thumbnail={thumbnailTemplate} circular autoPlay
                      transitionInterval={5000} showIndicatorsOnItem={inside} indicatorsPosition={position}  />
        </div>
    )
}
