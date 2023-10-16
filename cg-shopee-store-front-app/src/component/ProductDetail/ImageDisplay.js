import React, { useEffect, useState } from 'react';
import { Galleria } from 'primereact/galleria';

function ImageDisplay({ product }) {
    const { image, photos } = product;
    const [pictures, setPictures] = useState([]);
    const [currentPictureIndex, setCurrentPictureIndex] = useState(0);

    useEffect(() => {
        if (image) {
            const pictureUrls = [image];
            if (photos && photos.length > 0) {
                pictureUrls.push(...photos.map((photo) => photo.url));
            }
            setPictures(pictureUrls);
        }
    }, [image, photos]);

   useEffect(() => {
       const interval = setInterval(() => {
           setPictures((prevPictures) => {
               const newPictures = [...prevPictures];
               const firstPicture = newPictures.shift();
               newPictures.push(firstPicture);
               return newPictures;
           });
       }, 5000);

       return () => clearInterval(interval);
   }, []);

    const responsiveOptions = [
        {
            breakpoint: '1024px',
            numVisible: 5,
        },
        {
            breakpoint: '960px',
            numVisible: 4,
        },
        {
            breakpoint: '768px',
            numVisible: 3,
        },
        {
            breakpoint: '560px',
            numVisible: 1,
        },
    ];

    const itemTemplate = (item) => {
        return <img src={item} alt="" style={{ display: 'block', width: '400px', height: '370px' }} />;
    };

    const thumbnailTemplate = (item) => {
        return <img src={item} alt="" style={{ width: '100px', display: 'block' }} />;
    };

    return (
        <Galleria
            value={pictures}
            activeIndex={currentPictureIndex}
            responsiveOptions={responsiveOptions}
            numVisible={3}
            circular
            style={{ maxWidth: '800px', width: '400px' }}
            item={itemTemplate}
            thumbnail={thumbnailTemplate}
        />
    );
}

export default ImageDisplay;
