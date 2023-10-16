import {EMPTY_STRING} from "../constant/string";

export const newVariant = () => {
    return {
        id: null,
        color: {
            id: null,
            name: EMPTY_STRING,
        },
        size: {
            id: null,
            name: EMPTY_STRING,
        },
        indexSize: -1,
        weight: null,
        errorWeight: EMPTY_STRING,
        stock: null,
        errorStock: EMPTY_STRING,
        importPrice: null,
        errorImportPrice: EMPTY_STRING,
        salePrice: null,
        errorSalePrice: EMPTY_STRING,
        errorNameClassify: EMPTY_STRING,
        shown: true,
        //bên backend là shown, nhưng bên này để shown thì bên kia mới nhận được giá trị @@ đó là do quy tắc JavaBeans
    }
}

export const cloneVariant = (_variant) => {
    const variant = {..._variant};
    variant.color = {..._variant.color};
    variant.size = {..._variant.size};
    return variant;
}