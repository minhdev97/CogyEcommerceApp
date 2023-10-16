import {EMPTY_STRING, TYPE_OF_STRING} from "../constant/string";
import isEmpty from "validator/es/lib/isEmpty";
import {MAX_NUMBER_OF_VARIANTS, MAX_PHOTOS, ONE_ELEMENT, ZERO} from "../constant/number";
import {
    ERROR_EMPTY_CATEGORY, ERROR_EMPTY_IMAGE,
    ERROR_EMPTY_INPUT,
    ERROR_EMPTY_SUB_CATEGORY,
    ERROR_NAME_COLOR,
    ERROR_VARIANT_INPUT
} from "../constant/errorMessage";
import {uploadImage} from "../api/firebaseAPI";
import {newPhoto} from "./photoService";


export const changeNameAndSetErrorClassify = (array, field, oldValue, index, newValue) => {
    array[index].errorNameClassify = EMPTY_STRING;
    if (array[index][field]) {
        array[index][field].name = newValue;
    }
    if (oldValue) {
        const filteredArray = [];
        array.forEach((item, index) => {
            if (item[field].name === oldValue) {
                filteredArray.push(index);
            }
        })
        if (filteredArray.length === ONE_ELEMENT) {
            array[filteredArray[ZERO]].errorNameClassify = EMPTY_STRING;
        }
    }
    array.forEach((data, currentIndex) => {
        if (data[field]?.name === newValue && currentIndex !== index && !isEmpty(data[field].name)) {
            array[currentIndex].errorNameClassify = array[index].errorNameClassify = ERROR_NAME_COLOR;
        }
    })
    if (isEmpty(newValue.trim())) array[index].errorNameClassify = ERROR_EMPTY_INPUT;
    return array;
}


export const checkDefinitionAndReturnProduct = (product, field) => {
    switch (field) {
        case "color": {
            if (isEmpty(product.definitionOfColor.trim())) {
                product.errorDefinitionColor = ERROR_EMPTY_INPUT;
            }
            return product;
        }
        case "size": {
            if (isEmpty(product.definitionOfSize.trim())) {
                product.errorDefinitionSize = ERROR_EMPTY_INPUT;
            }
            return product;
        }
        default :
            return product;
    }
}


export const checkCategoryAndSubCategory = (product) => {
    if (!product.selectedCategory) {
        product.errorSelectCategory = ERROR_EMPTY_CATEGORY;
    } else if (!product.subCategory) {
        product.errorSelectSubCategory = ERROR_EMPTY_SUB_CATEGORY;
    }
}


export const cloneProductList = (productList) => {
    return productList.map(product => {
        const _product = {...product}
        _product.variants = _product.variants.map(variant => ({...variant}));
        return _product;
    });
}


export const cloneProduct = (product) => {
    const _product = {...product};
    _product.photos = _product.photos.map(item => ({...item}));
    if (_product.photos.length < MAX_PHOTOS) {
        _product.photos.push({...newPhoto()})
    }
    _product.variants = _product.variants.map(item => {
        const _item = {...item};
        _item.color = {...item.color};
        _item.size = {...item.size};
        return _item;
    })
    return _product;
}


export const getFieldError = (field) => {
    switch (field) {
        case "importPrice" : return "errorImportPrice";
        case "salePrice" : return "errorSalePrice";
        case "stock" : return "errorStock";
        case "weight" : return "errorWeight";
        default : return EMPTY_STRING;
    }
}


export const validateAllFieldOfProduct = (product, colors, sizes) => {
    let success = true;
    if (isEmpty(product.name.trim())) {
        product.errorName = ERROR_EMPTY_INPUT;
        success = false;
    }
    if (isEmpty(product.definitionOfColor.trim())) {
        product.errorDefinitionColor = ERROR_EMPTY_INPUT;
        success = false;
    }
    if (isEmpty(product.definitionOfSize.trim())) {
        product.errorDefinitionSize = ERROR_EMPTY_INPUT;
        success = false;
    }
    if (product.image === EMPTY_STRING) {
        product.errorImage = EMPTY_STRING;
        success = false;
    }
    if (!product.selectedCategory) {
        product.errorSelectCategory = ERROR_EMPTY_CATEGORY;
        success = false;
    }
    if (product.selectedCategory && !product.subCategory) {
        product.errorSelectSubCategory = ERROR_EMPTY_SUB_CATEGORY;
        success = false;
    }
    if (!product.isChangeImage) {
        product.errorImage = ERROR_EMPTY_IMAGE;
        success = false;
    }

    sizes.forEach(item => {
        if (isEmpty(item.size.name.trim())) {
            item.errorNameClassify = ERROR_EMPTY_INPUT;
            success = false;
        }
    })

    colors.forEach(item => {
        if (isEmpty(item.color.name.trim())) {
            item.errorNameClassify = ERROR_EMPTY_INPUT;
            success = false;
        }
        item.variants.forEach(variant => {
            if (isEmpty(variant.size.name.trim())) {
                variant.errorNameClassify = ERROR_EMPTY_INPUT;
                success = false;
            }
            if (variant.weight === null) {
                variant.errorWeight = ERROR_EMPTY_INPUT;
                success = false;
            }
            if (variant.importPrice === null) {
                variant.errorImportPrice = ERROR_EMPTY_INPUT;
                success = false;
            }
            if (variant.salePrice === null) {
                variant.errorSalePrice = ERROR_EMPTY_INPUT;
                success = false;
            }
            if (variant.stock === null) {
                variant.errorStock = ERROR_EMPTY_INPUT;
                success = false;
            }
            if (variant.importPrice < ZERO) {
                variant.errorImportPrice = ERROR_VARIANT_INPUT;
                success = false;
            }
            if (variant.salePrice < ZERO) {
                variant.errorSalePrice = ERROR_VARIANT_INPUT;
                success = false;
            }
            if (variant.stock < ZERO) {
                variant.errorImportPrice = ERROR_VARIANT_INPUT;
                success = false;
            }
        })
    })
    return success;
}


export const processingProduct = async (product, colors, description) => {
    const originVariants = [];
    colors.forEach(item => {
        item.variants.forEach(variant => {
            originVariants.push({...variant, color: item.color, size: variant.size})
        })
    });
    const uploadPromise = [];
    if (typeof product.image !== TYPE_OF_STRING) {
        uploadPromise.push(uploadImage(product.image));
    }
    product.photos = product.photos.filter(photo => photo.url !== EMPTY_STRING);
    for (const photo of product.photos) {
        if (typeof photo.url !== TYPE_OF_STRING) {
            uploadPromise.push(uploadImage(photo.url));
        }
    }
    let firebaseUrls = [];
    try {
        firebaseUrls = await Promise.all(uploadPromise);
    } catch (err) {
        console.log(err)
    }
    if (typeof product.image !== TYPE_OF_STRING) {
        product.image = firebaseUrls.shift();
    }
    const photos = product.photos.map(({id, url}) => {
        if (typeof url !== TYPE_OF_STRING) {
            url = firebaseUrls.shift();
        }
        return {id, url};
    }).filter(photo => photo.url !== null && photo.url !== EMPTY_STRING);
    return {
        id: product.id,
        name: product.name,
        image: product.image,
        description,
        subCategory: product.subCategory,
        shown: product.shown,
        variants: originVariants,
        photos,
        definitionOfColor: product.definitionOfColor,
        definitionOfSize: product.definitionOfSize
    }
}


export const newProduct = () => {
    return {
        id: null,
        name: EMPTY_STRING,
        errorName: EMPTY_STRING,
        image: EMPTY_STRING,
        isChangeImage: false,
        errorImage: EMPTY_STRING,
        photos: [],
        description: EMPTY_STRING,
        category: {id: null, name: EMPTY_STRING, subCategories: []},
        selectedCategory: false,
        errorSelectCategory: EMPTY_STRING,
        subCategory: null,
        errorSelectSubCategory: EMPTY_STRING,
        shown: true,
        definitionOfColor: EMPTY_STRING,
        definitionOfSize: EMPTY_STRING,
        errorDefinitionColor: EMPTY_STRING,
        errorDefinitionSize: EMPTY_STRING,
        isFullSize: false,
        isFullColor: false,
        variants: []
    }
}