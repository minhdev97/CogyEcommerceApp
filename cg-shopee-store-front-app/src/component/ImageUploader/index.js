import React, {useEffect, useRef, useState} from 'react';
import {RiDeleteBinLine, RiImageAddLine} from "react-icons/ri";
import {EMPTY_STRING} from "../../constant/string";
import {MAX_PHOTOS, ZERO} from "../../constant/number";

const ImageUploader = ({onChangeImage, image, isMain, index, isEmptyContent}) => {
    const [selectedImage, setSelectedImage] = useState(EMPTY_STRING);
    const fileInputRef = useRef(null);

    useEffect(() => {
        setSelectedImage(image);
    }, [image]);


    const handleChangeImage = (e) => {
        const file = e.target.files[ZERO];
        const fileReader = new FileReader();
        if (file) {
            fileReader.readAsDataURL(file);
        }
        fileReader.onload = () => {
            setSelectedImage(fileReader.result);
        };
        onChangeImage(file, isMain, index);
    };

    const handleRemoveImage = (e) => {
        e.preventDefault();
        fileInputRef.current.value = null;
        onChangeImage(EMPTY_STRING, isMain, index);
        setSelectedImage(EMPTY_STRING)
    };

    return (
        <div className="mb-3">
            <label htmlFor={`image-upload-${index}`} className="image-upload-button">
                {selectedImage ? (
                    <>
                        <img src={selectedImage} alt="Selected Image" className="preview-image"/>
                        <RiDeleteBinLine className="delete-icon" onClick={handleRemoveImage}/>
                    </>
                ) : (
                    <>
                        <RiImageAddLine className="upload-icon"/>
                        {!isEmptyContent && !isMain && <p className="upload-count">{`(${index}/${MAX_PHOTOS})`}</p>}
                        <div className="placeholder-image"></div>
                    </>
                )}
                <input
                    type="file"
                    id={`image-upload-${index}`}
                    accept="image/*"
                    onChange={handleChangeImage}
                    ref={fileInputRef}
                    style={{display: 'none'}}
                    className="shadow-input"
                />
                {isMain &&
                    <div className="banner-overlay small justify-content-between">
                        Cover Image
                    </div>}
            </label>
        </div>
    );
}
export default ImageUploader;
