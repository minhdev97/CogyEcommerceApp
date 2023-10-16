import React, {Fragment, useCallback, useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {classNames} from 'primereact/utils';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {Toast} from 'primereact/toast';
import {Button} from 'primereact/button';
import {Image} from 'primereact/image';
import {Toolbar} from 'primereact/toolbar';
import {RadioButton} from 'primereact/radiobutton';
import {Dialog} from 'primereact/dialog';
import {InputText} from 'primereact/inputtext';
import {Editor} from "primereact/editor";
import {InputNumber} from "primereact/inputnumber";
import {InputSwitch} from "primereact/inputswitch";
import {Input, InputGroup, InputGroupText} from "reactstrap";
import isEmpty from "validator/es/lib/isEmpty";
import {AiOutlinePlusCircle} from "react-icons/ai";
import {RiDeleteBin6Line} from "react-icons/ri";
import {MDBBtn, MDBTable, MDBTableBody, MDBTableHead} from "mdb-react-ui-kit";


import {
    selectProductList,
    selectLoadingProducts,
    selectSuccessProducts,
    selectProductDetail,
    getProductsBySellerId,
    saveNewProduct,
    getByIdToEdit, updateProduct,
} from "../../features/product/productManagementSlice";
import ImageUploader from "../../component/ImageUploader";
import DropDownCategoryList from "../../component/CategoryList/DropDownCategoryList";
import {deleteProduct} from "../../api/productAPI";
import {ERROR_EMPTY_INPUT, ERROR_ADD_VARIANT, ERROR_EMPTY_IMAGE} from "../../constant/errorMessage";
import {
    LIFE_OF_TOAST,
    MAX_LENGTH_OF_DEFINITION_NAME,
    MAX_LENGTH_OF_DESCRIPTION,
    MAX_LENGTH_OF_NAME_OF_CLASSIFICATION,
    MAX_LENGTH_OF_NAME_PRODUCT,
    MAX_NUMBER_OF_VARIANTS,
    MAX_PHOTOS,
    ONE_ELEMENT,
    ZERO
} from "../../constant/number";
import {COLOR, EMPTY_STRING, SIZE} from "../../constant/string";
import {
    changeNameAndSetErrorClassify,
    checkCategoryAndSubCategory,
    checkDefinitionAndReturnProduct,
    cloneProduct,
    getFieldError,
    newProduct,
    processingProduct,
    validateAllFieldOfProduct
} from "../../service/productService";
import {cloneVariant, newVariant} from "../../service/variantService";
import {ProgressSpinner} from "primereact/progressspinner";
import {newPhoto} from "../../service/photoService";
import {getSellerId, getUser} from "../../service/userService";
import {Link, useNavigate} from "react-router-dom";
import {LOGIN_PAGE, PRODUCT_DETAIL_PAGE, PRODUCT_MANAGEMENT_PAGE, REGISTER_SELLER_PAGE} from "../../constant/page";
import {setHistory} from "../../features/history/historySlice";
import {Tag} from "primereact/tag";
import {ToggleButton} from "primereact/togglebutton";
import {formatVNDPrice} from "../../formater";

const ProductManagement = () => {

    const [description, setDescription] = useState(EMPTY_STRING);
    const [colors, setColors] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [productList, setProductList] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [product, setProduct] = useState(newProduct);
    const [productDialog, setProductDialog] = useState(false);
    const [deleteVariantDialog, setDeleteVariantDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [variant, setVariant] = useState({});
    const [expandedRows, setExpandedRows] = useState([]);
    const [loadingSave, setLoadingSave] = useState(false);


    const toast = useRef(null);
    const dt = useRef(null);
    const category = useRef(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const successProduct = useSelector(selectSuccessProducts);
    const products = useSelector(selectProductList);
    const loadingProducts = useSelector(selectLoadingProducts);
    const productToEdit = useSelector(selectProductDetail);



    useEffect(() => {
        dispatch(setHistory(PRODUCT_MANAGEMENT_PAGE));
        if (!getUser()) {
            navigate(LOGIN_PAGE);
        } else if (!getSellerId()) {
            navigate(REGISTER_SELLER_PAGE);
        }
        getProducts();
        if (productToEdit) {
            configProductToFormEdit();
        }
    }, [products, productToEdit]);


    const dataGroupOfVariants = {
        color: {
            id: null,
            name: EMPTY_STRING,
        },
        isFullVariants: true,
        errorAddVariant: EMPTY_STRING,
        errorNameClassify: EMPTY_STRING,
        variants: sizes?.map(item => ({...item}))
    };


    const getProducts = () => {
        if (!successProduct) {
            dispatch(getProductsBySellerId());
        }
        setProductList(products);
    };

    const configProductToFormEdit = () => {
        category.current = productToEdit.category;
        let _product = {...newProduct(), ...productToEdit, isChangeImage: true, selectedCategory: true};
        _product = cloneProduct(_product);
        setDescription(productToEdit.description);
        const _variants = productToEdit.variants;
        const _colors = [];
        const _sizes = [];
        const _newVariant = {...newVariant()};
        _variants.forEach(variant => {
            const _variant = cloneVariant(variant);
            if (_sizes.every(item => item.size?.name !== _variant.size.name)) {
                _sizes.push({
                    ..._newVariant,
                    size: {..._variant.size},
                    indexSize: _sizes.length
                });
            }
            if (_colors.every(item => item.color?.name !== _variant.color.name)) {
                const indexSize = _sizes.find(item => item.size.name === _variant.size.name).indexSize;
                _colors.push({
                    errorAddVariant: EMPTY_STRING,
                    errorNameClassify: EMPTY_STRING,
                    color: {..._variant.color},
                    variants: [{..._variant, indexSize}]
                });
            } else {
                const indexSize = _sizes.find(item => item.size.name === _variant.size.name).indexSize;
                _colors.find(item => item.color.name === _variant.color.name).variants.push({
                    ..._newVariant,
                    ..._variant,
                    indexSize
                });
            }
        });
        _colors.map(item => {
            item.isFullVariants = item.variants.length >= sizes.length;
            return item;
        })
        setSizes(_sizes);
        setColors(_colors);
        _product.isFullColor = (_colors.length + ONE_ELEMENT) * (_sizes.length) > MAX_NUMBER_OF_VARIANTS;
        _product.isFullSize = (_colors.length) * (_sizes.length) > MAX_NUMBER_OF_VARIANTS;
        setProduct(_product);
    }


    const exportCSV = () => {
        dt.current.exportCSV();
    };


    const handleOpenNewProductDialog = () => {
        setLoadingSave(false);
        setSubCategories([]);
        setProduct({...newProduct()});
        setColors([]);
        setSizes([]);
        category.current = null;
        setProductDialog(true);
    };


    const handleOpenEditProductDialog = (product) => {
        dispatch(getByIdToEdit({id: product.id}));
        setProductDialog(true);
    };


    const handleHideProductDialog = () => {
        setProductDialog(false);
        setColors([]);
        setSizes([]);
        setSubCategories([]);
        setProduct({...newProduct()});
    };


    const handleChangeImageFile = (file, isMain, index) => {
        const _product = {...product};
        if (isMain) {
            _product.image = file;
            if (file) {
                _product.isChangeImage = true;
                _product.errorImage = EMPTY_STRING;
            } else {
                _product.isChangeImage = false;
                _product.errorImage = ERROR_EMPTY_IMAGE;
            }
            if (!_product.photos.length) {
                _product.photos.push({...newPhoto()})
            }
        } else {
            _product.photos[index].url = file;
            if (index === _product.photos.length - ONE_ELEMENT
                && _product.photos.length < MAX_PHOTOS
                && _product.photos[_product.photos.length - ONE_ELEMENT].url !== EMPTY_STRING) {
                _product.photos.push({...newPhoto()})
            }
        }
        setProduct(_product);
    };


    const handleChangeNameProduct = (e) => {
        let _product = {...product};
        _product.errorName = EMPTY_STRING;
        _product.name = e.target.value;
        setProduct(_product);
    };


    const handleBlurInputName = (e) => {
        const _product = {...product};
        _product.errorName = EMPTY_STRING;
        if (isEmpty(e.target.value.trim())) {
            _product.errorName = ERROR_EMPTY_INPUT;
        }
        setProduct(_product);
    };


    const handleChangeEditor = (e) => {
        setDescription(e.htmlValue);
    }


    const handleChangeCategory = useCallback(async (subcategories) => {
        setSubCategories(subcategories);
        setProduct((prevState) => ({
            ...prevState,
            selectedCategory: true,
            errorSelectCategory: EMPTY_STRING,
        }));
    }, []);


    const handleChangeSubCategory = (e) => {
        const _product = {...product};
        _product.errorSelectSubCategory = EMPTY_STRING;
        _product.subCategory = e.value;
        setProduct(_product);
    };


    const handleChangeDefinitionOfColor = (e) => {
        const _product = {...product};
        _product.definitionOfColor = e.target.value;
        _product.errorDefinitionColor = EMPTY_STRING;
        if (isEmpty(e.target.value.trim())) {
            _product.errorDefinitionColor = ERROR_EMPTY_INPUT;
        }
        checkCategoryAndSubCategory(_product)
        if (colors.length === ZERO) {
            setColors([dataGroupOfVariants]);
        }
        setProduct(_product);
    };


    const handleChangeDefinitionOfSize = (e) => {
        const _product = {...product};
        _product.errorDefinitionSize = EMPTY_STRING;
        _product.definitionOfSize = e.target.value;
        if (isEmpty(e.target.value.trim())) {
            _product.errorDefinitionSize = ERROR_EMPTY_INPUT;
        }
        if (sizes.length === ZERO) {
            const _variant = {...newVariant()};
            const _sizes = [{..._variant, indexSize: ZERO}];
            setSizes(_sizes);
            setColors(colors.map(item => {
                item.variants.push({
                    ..._variant,
                    indexSize: ZERO,
                    color: item.color,
                });
                return item;
            }))
        }
        checkCategoryAndSubCategory(_product);
        setProduct(_product);
    };


    const handleAddColor = () => {
        setColors([...colors, dataGroupOfVariants])
        const _product = {...product};
        const CURRENT_LENGTH_OF_COLORS = colors.length + ONE_ELEMENT;
        _product.isFullColor =
            (CURRENT_LENGTH_OF_COLORS + ONE_ELEMENT) * sizes.length > MAX_NUMBER_OF_VARIANTS;
        _product.isFullSize =
            CURRENT_LENGTH_OF_COLORS * (sizes.length + ONE_ELEMENT) > MAX_NUMBER_OF_VARIANTS;
        setProduct(_product);
    };


    const handleAddSize = () => {
        const _variant = {...newVariant()};
        _variant.indexSize = sizes.length;
        setSizes([...sizes, _variant])
        setColors(colors.map(item => {
            item.variants.push({
                ..._variant,
                color: item.color,
            });
            return item;
        }))
        const _product = {...product};
        const CURRENT_LENGTH_OF_SIZES = sizes.length + ONE_ELEMENT;
        _product.isFullColor =
            (colors.length + ONE_ELEMENT) * CURRENT_LENGTH_OF_SIZES > MAX_NUMBER_OF_VARIANTS;
        _product.isFullSize =
            colors.length * (CURRENT_LENGTH_OF_SIZES + ONE_ELEMENT) > MAX_NUMBER_OF_VARIANTS;
        setProduct(_product);
    };


    const handleRemoveDataGroupList = (argIndex) => {
        setColors(colors.filter((item, index) => index !== argIndex));
        const _product = {...product};
        const CURRENT_LENGTH_OF_COLORS = colors.length - ONE_ELEMENT;
        _product.isFullColor = false;
        _product.isFullSize =
            CURRENT_LENGTH_OF_COLORS * (sizes.length + ONE_ELEMENT) > MAX_NUMBER_OF_VARIANTS;
        setProduct(_product);
    };


    const handleRemoveSize = (indexSize) => {
        setSizes(sizes.filter((item, index) => index !== indexSize));
        setColors(colors.map((item) => {
            item.variants = item.variants.filter(item => item.indexSize !== indexSize);
            return item;
        }));
        const _product = {...product};
        const CURRENT_LENGTH_OF_SIZES = sizes.length - ONE_ELEMENT;
        _product.isFullColor =
            (colors.length + ONE_ELEMENT) * CURRENT_LENGTH_OF_SIZES > MAX_NUMBER_OF_VARIANTS;
        _product.isFullSize = false;
        setProduct(_product);
    };


    const handleChangeColor = (oldValue, index, newValue) => {
        setProduct(checkDefinitionAndReturnProduct({...product}, COLOR))
        const _colors = changeNameAndSetErrorClassify(
            [...colors], COLOR, oldValue, index, newValue
        )
        setColors(_colors);
        if (!product.isFullColor && !_colors[index + ONE_ELEMENT]) {
            handleAddColor();
        }
    };


    const handleChangeSize = (oldValue, index, newValue, indexSize) => {
        setProduct(checkDefinitionAndReturnProduct({...product}, SIZE))
        const _sizes = changeNameAndSetErrorClassify(
            [...sizes], SIZE, oldValue, index, newValue
        )
        setSizes(_sizes);
        setColors(colors.map((item) => {
            item.variants = item.variants.map(variant => {
                if (variant.indexSize === indexSize && variant.size) {
                    variant.size.name = newValue;
                }
                return variant;
            })
            return item;
        }))
        if (!product.isFullSize && !_sizes[index + ONE_ELEMENT]) {
            handleAddSize();
        }
    };


    const handleChangeShownOfVariant = (indexDataGroup, indexVariant) => {
        let _variant;
        setColors(colors.map((item, indexColumn) => {
            if (indexColumn === indexDataGroup) {
                item.variants?.map((variant, indexRow) => {
                    if (indexRow === indexVariant) {
                        variant.shown = !variant.shown;
                        _variant = variant;
                    }
                    return variant;
                })
            }
            return item;
        }));
        toast.current.show({
            severity: _variant.shown ? 'success' : 'warn',
            summary: 'Successful',
            detail: `Variant ${_variant.color.name} - ${_variant.size.name} of ${product.name} was ${_variant.shown === true ? 'shown' : 'hidden'}`,
            life: LIFE_OF_TOAST
        })
    };



    const handleChangeVariantInput = (value, indexDataGroup, indexVariant, field) => {
        setColors(colors.map((item, indexColumn) => {
            if (indexColumn === indexDataGroup) {
                item.variants?.map((variant, indexRow) => {
                    if (indexRow === indexVariant) {
                        variant[field] = value;
                        variant[getFieldError(field)] = EMPTY_STRING;
                    }
                    return variant;
                })
            }
            return item;
        }));
    };


    const handleBlurVariantInput = (value, indexDataGroup, indexVariant, field) => {
        setColors(colors.map((item, indexColumn) => {
            if (indexColumn === indexDataGroup) {
                item.variants?.map((variant, indexRow) => {
                    if (indexRow === indexVariant && isEmpty(value)) {
                        variant[field] = value;
                        if (isEmpty(value)) {
                            variant[getFieldError(field)] = ERROR_EMPTY_INPUT;
                        }
                    }
                    return variant;
                })
            }
            return item;
        }));
    };


    const handleShowDeleteVariantDialog = (indexDataGroup, indexVariant) => {
        setVariant(colors[indexDataGroup].variants[indexVariant]);
        setDeleteVariantDialog(true);
    };


    const handleHideDeleteVariantDialog = () => {
        setDeleteVariantDialog(false);
    };


    const handleDeleteVariant = () => {
        setColors(colors.map(item => {
            item.variants = item.variants.filter(item => item !== variant);
            item.isFullVariants = item.variants.length >= sizes.length;
            return item;
        }));
        setDeleteVariantDialog(false);
    };


    const handleAddVariant = (index) => {
        const _colors = [...colors];
        const elementOfColors = _colors[index];
        const _variant = sizes.find(item =>
            elementOfColors.variants.every(({size}) => size.name !== item.size.name)
        )
        if (_variant) {
            elementOfColors.errorAddVariant = EMPTY_STRING;
            const indexVariant = sizes.findIndex(variant => variant === _variant);
            elementOfColors.variants.splice(indexVariant, ZERO, {..._variant, shown: true});
            elementOfColors.isFullVariants =
                elementOfColors.variants.length >= sizes.length;
        } else {
            elementOfColors.errorAddVariant = ERROR_ADD_VARIANT;
        }
        setColors(_colors);
    };


    const handleChangeShownOfProduct = () => {
        const _product = {...product};
        _product.shown = !_product.shown;
        setProduct(_product);
        toast.current.show({
            severity: _product.shown ? 'success' : 'warn',
            summary: 'Successful',
            detail: `Product ${_product.name} will be ${_product.shown === true ? 'shown' : 'hidden'}`,
            life: LIFE_OF_TOAST
        })
    }


    const handleSaveProduct = async () => {
        let _product = {...product};
        let _sizes = [...sizes];
        let _colors = [...colors];
        const isValidProduct = validateAllFieldOfProduct(_product, _colors, _sizes);
        if (!isValidProduct) {
            setProduct(_product);
            setColors(_colors);
            setSizes(_sizes);
            return;
        }
        setLoadingSave(true);
        _product = await processingProduct(_product, _colors, description);
        if (_product.id) {
            await dispatch(updateProduct({product: _product}));
            toast.current.show({
                severity: 'success',
                summary: 'Successful',
                detail: `Product ${_product.name} updated`,
                life: LIFE_OF_TOAST
            });
        } else {
            await dispatch(saveNewProduct({product: _product}));
            toast.current.show({
                severity: 'success',
                summary: 'Successful',
                detail: `Product ${_product.name} created!`,
                life: LIFE_OF_TOAST
            });
        }
        setProductDialog(false);
        setProduct(newProduct);
        setDescription(EMPTY_STRING);
        if (successProduct) {
            await dispatch(getProductsBySellerId());
        }
        if (loadingProducts) {
            setProductList(products);
        }
        setLoadingSave(false);
    };


    const handleHideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    };


    const handleConfirmDeleteProduct = (product) => {
        setProduct(product);
        setDeleteProductDialog(true);
    };


    const handleDeleteProduct = () => {
        deleteProduct(product.id).then().catch(err => console.log(err));
        let _products = productList.filter((val) => val.id !== product.id);
        setProductList(_products);
        setDeleteProductDialog(false);
        setProduct(newProduct);
        toast.current.show({
            severity: 'success',
            summary: 'Successful',
            detail: 'Product Deleted',
            life: LIFE_OF_TOAST
        });
    };


    const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <Button label="New" icon="pi pi-plus" severity="success" onClick={handleOpenNewProductDialog}/>
            </div>
        );
    };


    const rightToolbarTemplate = () => {
        return <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV}/>;
    };


    const imageBodyTemplate = (product) => {
        return <Image src={`${product.image}`}
                      zoomSrc={`${product.image}`}
                      alt={product.name}
                      width="80"
                      height="80"
                      preview/>;
    };


    const actionBodyTemplate = (product) => {
        return (
            <div className="d-flex justify-content-end">
                {product.shown &&
                    <div className="p-1">
                        <Link to={`${PRODUCT_DETAIL_PAGE}/${product.id}`} target="_blank">
                            <Button icon="pi pi-eye" rounded outlined/>
                        </Link>
                    </div>
                }
                <div className="p-1">
                    <Button icon="pi pi-pencil" rounded outlined
                            onClick={() => handleOpenEditProductDialog(product)}/>
                </div>
                <div className="p-1">
                    <Button icon="pi pi-trash" rounded outlined severity="danger"
                            onClick={() => handleConfirmDeleteProduct(product)}/>
                </div>
            </div>
        );
    };


    const header = (
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
            <h4 className="m-0">Manage Products</h4>
            <span className="p-input-icon-left">
                <i className="pi pi-search"/>
                <InputText
                    type="search"
                    onInput={(e) => setGlobalFilter(e.target.value)}
                    placeholder="Search..."
                />
            </span>
        </div>
    );


    const productDialogFooter = () => {
        if (loadingSave) {
            return <ProgressSpinner style={{width: '50px', height: '50px'}}
                                    strokeWidth="8"
                                    fill="var(--surface-ground)"
                                    animationDuration=".5s"/>
        } else {
            return (
                <div className="mt-5">
                    <ToggleButton checked={product.shown}
                                  onChange={() => handleChangeShownOfProduct(product)}
                                  className="w-8rem"
                                  onLabel={"SHOWN"}
                                  offLabel={"HIDDEN"}
                    />
                    <Button className="ms-2" label="Cancel" icon="pi pi-times"
                            outlined onClick={handleHideProductDialog}
                    />
                    <Button label="Save" icon="pi pi-check"
                            onClick={handleSaveProduct}
                    />
                </div>
            )
        }
    }


    const deleteVariantDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={handleHideDeleteVariantDialog}/>
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={handleDeleteVariant}/>
        </React.Fragment>
    );


    const deleteProductDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={handleHideDeleteProductDialog}/>
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={handleDeleteProduct}/>
        </React.Fragment>
    );


    const allowExpansion = (product) => {
        return product.variants?.length > ZERO;
    };


    const shownOfProduct = (product) => (
        <Tag value={product.shown ? 'SHOWN' : 'HIDDEN'} severity={product.shown ? 'success' : 'danger'} />
    );


    const shownOfVariant = (product, variant) => (
        <Tag value={variant.shown ? 'SHOWN' : 'HIDDEN'} severity={variant.shown ? 'success' : 'danger'} />
    );


    const rowExpansionTemplate = (product) => {
        return (
            <div className="p-3">
                <h5>Variants of {product.name}</h5>
                <DataTable value={product.variants}
                           dataKey="id"
                           paginator
                           rows={5}
                           rowsPerPageOptions={[5, 10, 25, 50]}
                           currentPageReportTemplate="Showing {first} to {last} of {totalRecords} variants"
                >
                    <Column field="size.name" header={product.definitionOfSize} sortable></Column>
                    <Column field="color.name" header={product.definitionOfColor} sortable></Column>
                    <Column field="importPrice"
                            header="Import Price"
                            body={(variant) => formatVNDPrice(variant.importPrice)}
                            sortable
                    >
                    </Column>
                    <Column field="salePrice"
                            header="Sell Price"
                            body={(variant) => formatVNDPrice(variant.salePrice)}
                            sortable
                    >
                    </Column>
                    <Column field="stock" header="Stock" sortable></Column>
                    <Column field="shown" header="Shown/Hidden"
                            body={(variant) => shownOfVariant(product, variant)}></Column>
                </DataTable>
            </div>
        );
    };


    const emptyMessageTemplate = () => {
        return <p>You haven't created any products yet.</p>;
    }

    const loadingTemplate = () => {
        return <ProgressSpinner style={{width: '80px', height: '80px'}}
                                strokeWidth="8"
                                fill="var(--surface-ground)"
                                animationDuration=".5s"
        />
    }


    return (
        <div className="d-flex justify-content-center">
            <Toast ref={toast}/>
            <div className="card col-xl-10 col-sm-12 shop-management">
                <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
                <DataTable ref={dt}
                           emptyMessage={emptyMessageTemplate}
                           loading={loadingProducts}
                           loadingIcon={loadingTemplate}
                           value={productList}
                           expandedRows={expandedRows}
                           onRowToggle={(e) => setExpandedRows(e.data)}
                           rowExpansionTemplate={rowExpansionTemplate}
                           dataKey="id"
                           paginator
                           rows={10}
                           rowsPerPageOptions={[5, 10, 25]}
                           currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                           globalFilter={globalFilter}
                           header={header}>
                    <Column expander={allowExpansion} style={{width: '5rem'}}/>
                    <Column field="name" header="Product" sortable style={{minWidth: '16rem'}}></Column>
                    <Column field="image" header="Image" body={imageBodyTemplate}></Column>
                    <Column field="subCategory.name" header="Category" sortable style={{minWidth: '10rem'}}></Column>
                    <Column field="numberOfPurchase" header="Purchases" sortable style={{minWidth: '10rem'}}></Column>
                    <Column field="view" header="Views" sortable style={{minWidth: '10rem'}}></Column>
                    <Column field="shown" header="Shown/Hidden" body={shownOfProduct} style={{minWidth: '5rem'}}></Column>
                    <Column body={actionBodyTemplate} exportable={false} style={{minWidth: '10rem'}}></Column>
                </DataTable>
            </div>

            <Dialog visible={productDialog}
                    breakpoints={{'960px': '75vw', '641px': '90vw'}}
                    header={product.id ? "Product Detail" : "Add New Product"}
                    modal
                    className="p-fluid w-75"
                    footer={productDialogFooter}
                    onHide={handleHideProductDialog}
            >
                <div className="p-1 mb-5">
                    <div className="field">
                        <label className="font-bold mb-2" htmlFor="inputGroupFile02">
                            {product.image ? "Choose other image" : "Choose image"} <sup style={{color: "red"}}>*</sup>
                        </label>
                        <div className="d-flex">
                            <ImageUploader
                                onChangeImage={handleChangeImageFile}
                                image={product.image}
                                isMain={true}
                                index={-1}
                            />
                            <small className="p-error">
                                {product.errorImage}
                            </small>
                        </div>
                        <div className="d-flex float-left">
                            {product.photos?.map((photo, index) => (
                                <ImageUploader
                                    key={index}
                                    onChangeImage={handleChangeImageFile}
                                    image={photo?.url}
                                    isMain={false}
                                    index={index}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="field mt-3">
                        <label htmlFor="name" className="font-bold">
                            Name <sup style={{color: "red"}}>*</sup>
                        </label>
                        <div className="d-flex align-items-center mt-2">
                            <InputGroup className={classNames({'invalid-input-product': product.errorName})}>
                                <Input id="name"
                                       placeholder="Enter name of product..."
                                       onChange={handleChangeNameProduct}
                                       onBlur={handleBlurInputName}
                                       value={product.name}
                                       maxLength={MAX_LENGTH_OF_NAME_PRODUCT}
                                />
                                <InputGroupText>
                                    {product.name.length}/{MAX_LENGTH_OF_NAME_PRODUCT}
                                </InputGroupText>
                            </InputGroup>
                        </div>
                        <small className="p-error">
                            {product.errorName}
                        </small>
                    </div>

                    <div className="field mt-5">
                        <label htmlFor="description" className="font-bold">
                            Description
                        </label>
                        <Editor value={description}
                                id="description"
                                onTextChange={handleChangeEditor}
                                style={{height: '50vh'}}
                                maxLength={MAX_LENGTH_OF_DESCRIPTION}
                        />
                    </div>

                    <hr/>

                    <div className="formgrid grid mt-5 mb-5 d-lg-flex">

                        <div className="field col-lg-6 col-sm-12 mb-lg-0 mb-5" align={'center'}>
                            <div className="col-lg-8 col-md-10 col-sm-12 d-flex flex-column">
                                <label className="font-bold d-flex">
                                    <div>Category <sup style={{color: "red"}}>*</sup></div>
                                </label>
                                <DropDownCategoryList onChangeCategory={handleChangeCategory}
                                                      category={category.current}
                                />
                                <div className="mt-1 d-flex">
                                    <small className="p-error">{product.errorSelectCategory}</small>
                                </div>
                            </div>
                        </div>

                        <div className="field col-lg-6 col-sm-12 mb-lg-0" align="center">
                            <div className="col-lg-8 col-md-10 col-sm-12 d-flex flex-column">
                                <label className="font-bold d-flex justify-content-start">
                                    {product.selectedCategory &&
                                        <div>Subordinate Category <sup style={{color: "red"}}>*</sup></div>}
                                </label>
                                <div className="formgrid grid d-flex flex-column ">
                                    {subCategories?.map((subCategory, index) => (
                                        <div className="field-radiobutton mt-3 d-flex float-left"
                                             key={index}>
                                            <RadioButton inputId={subCategory.id}
                                                         name="subCategory"
                                                         value={subCategory}
                                                         style={{marginRight: '1rem'}}
                                                         onChange={handleChangeSubCategory}
                                                         checked={product.subCategory?.id === subCategory?.id}
                                                         required={true}
                                            />
                                            <label htmlFor={subCategory.id}>{subCategory.name}</label>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-1 d-flex">
                                    <small className="p-error d-flex justify-content-start">
                                        {product.errorSelectSubCategory}
                                    </small>
                                </div>
                            </div>
                        </div>

                    </div>

                    <hr/>

                    <div className="formgrid grid d-lg-flex mt-5 mb-5 ">

                        <div className="field col-lg-6 col-sm-12 mb-lg-0 mb-5" align={'center'}>
                            <div className="col-lg-8 col-md-10 col-sm-12 d-flex flex-column">
                                <label className="font-bold d-flex">
                                    <div>The first classification group: <sup style={{color: "red"}}>*</sup></div>
                                </label>
                                <InputGroup className={`w-75 d-flex ${classNames({
                                    'invalid-input-product': product.errorDefinitionColor
                                })}`}>
                                    <Input placeholder="example: Color v.v"
                                           onChange={handleChangeDefinitionOfColor}
                                           maxLength={MAX_LENGTH_OF_DEFINITION_NAME}
                                           value={product.definitionOfColor}
                                    />
                                    <InputGroupText>
                                        {product.definitionOfColor.length}/{MAX_LENGTH_OF_DEFINITION_NAME}
                                    </InputGroupText>
                                </InputGroup>
                                <div className="mt-1 d-flex">
                                    <small className="p-error">{product.errorDefinitionColor}</small>
                                </div>
                            </div>

                        </div>

                        <div className="field col-lg-6 col-sm-12 mb-lg-0" align={'center'}>
                            <div className="col-lg-8 col-md-10 col-sm-12 d-flex flex-column">
                                <label className="font-bold d-flex">
                                    <div>The second classification group: <sup style={{color: "red"}}>*</sup></div>
                                </label>
                                <InputGroup className={`w-75 ${classNames({
                                    'invalid-input-product': product.errorDefinitionSize
                                })}`}>
                                    <Input placeholder="example: Size v.v"
                                           onChange={handleChangeDefinitionOfSize}
                                           maxLength={MAX_LENGTH_OF_DEFINITION_NAME}
                                           value={product.definitionOfSize}
                                    />
                                    <InputGroupText>
                                        {product.definitionOfSize.length}/{MAX_LENGTH_OF_DEFINITION_NAME}
                                    </InputGroupText>
                                </InputGroup>
                                <div className="mt-1 d-flex">
                                    <small className="p-error">{product.errorDefinitionSize}</small>
                                </div>
                            </div>
                        </div>

                    </div>

                    <hr/>

                    <div className="formgrid grid d-lg-flex mt-5 mb-5">

                        <div className="field col-lg-6 col-sm-12 mb-lg-0 mb-5" align={'center'}>
                            <div className="col-lg-8 col-md-10 col-sm-12 d-flex flex-column">
                                <label className="font-bold d-flex">
                                    <div>
                                        <span>
                                           Product classifications of the first group: <sup
                                            style={{color: "red"}}>*</sup>
                                        </span>
                                        {!product.isFullColor &&
                                            <AiOutlinePlusCircle size="1.2rem"
                                                                 className="ai-outline-plus-circle"
                                                                 onClick={handleAddColor}
                                            />
                                        }
                                    </div>
                                </label>
                                {colors.map((item, index) => (
                                    <div key={index}>
                                        <div className="d-flex align-items-center mt-2">
                                            <InputGroup className={`w-75 ${classNames({
                                                'invalid-input-product': item.errorNameClassify
                                            })}`}>
                                                <Input placeholder="example: White, Red v.v"
                                                       onChange={(e) =>
                                                           handleChangeColor(item.color.name, index, e.target.value)}
                                                       value={item.color.name}
                                                       maxLength={MAX_LENGTH_OF_NAME_OF_CLASSIFICATION}
                                                />
                                                <InputGroupText>
                                                    {item.color?.name?.length}/{MAX_LENGTH_OF_NAME_OF_CLASSIFICATION}
                                                </InputGroupText>
                                            </InputGroup>
                                            {index !== ZERO &&
                                                <RiDeleteBin6Line size="1.2rem"
                                                                  className="delete-icon-bin"
                                                                  onClick={() => handleRemoveDataGroupList(index)}
                                                />
                                            }
                                        </div>
                                        <small className="p-error d-flex">
                                            {item.errorNameClassify}
                                        </small>
                                    </div>

                                ))}

                            </div>
                        </div>

                        <div className="field col-lg-6 col-sm-12 mb-lg-0" align={'center'}>
                            <div className="col-lg-8 col-md-10 col-sm-12 d-flex flex-column">
                                <label className="font-bold d-flex">
                                    <div>
                                         <span>
                                    Product classifications of the second group: <sup style={{color: "red"}}>*</sup>
                                </span>
                                        {!product.isFullSize &&
                                            <AiOutlinePlusCircle size="1.2rem"
                                                                 className="ai-outline-plus-circle"
                                                                 onClick={handleAddSize}
                                            />
                                        }
                                    </div>
                                </label>
                                {sizes.map((item, index) => (
                                    <div key={index}>
                                        <div className="d-flex align-items-center mt-2">
                                            <InputGroup className={`w-75 ${classNames({
                                                'invalid-input-product': item.errorNameClassify
                                            })}`}>
                                                <Input placeholder="example: S, M, v.v"
                                                       onChange={(e) =>
                                                           handleChangeSize(item.size.name, index, e.target.value, item.indexSize)}
                                                       value={item.size?.name}
                                                       maxLength={MAX_LENGTH_OF_NAME_OF_CLASSIFICATION}
                                                />
                                                <InputGroupText>
                                                    {item.size?.name.length}/{MAX_LENGTH_OF_NAME_OF_CLASSIFICATION}
                                                </InputGroupText>
                                            </InputGroup>
                                            {index !== ZERO &&
                                                <RiDeleteBin6Line size="1.2rem"
                                                                  className="delete-icon-bin"
                                                                  onClick={() => handleRemoveSize(index)}
                                                />
                                            }
                                        </div>
                                        <small className="p-error d-flex">
                                            {item.errorNameClassify}
                                        </small>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>

                    <hr/>

                    <div className="field mt-0 mb-5">

                        <div className="formgrid grid">
                            {colors.length !== ZERO && sizes.length !== ZERO &&
                                <MDBTable align="middle">
                                    <MDBTableHead align="middle">
                                        <tr>
                                            <th scope="col">{product.definitionOfColor}</th>
                                            <th scope="col">Add {product.definitionOfSize}</th>
                                            <th scope="col">{product.definitionOfSize}</th>
                                            <th scope="col">Weight</th>
                                            <th scope="col">Import Price</th>
                                            <th scope="col">Sale Price</th>
                                            <th scope="col">Stock</th>
                                            <th scope="col">Shown</th>
                                            <th scope="col"></th>
                                        </tr>
                                    </MDBTableHead>
                                    <MDBTableBody align="middle">
                                        {colors
                                            && colors.map(({
                                                               color,
                                                               variants,
                                                               isFullVariants,
                                                               errorAddVariant,
                                                           }, indexDataGroup) => (
                                                <Fragment key={indexDataGroup}>
                                                    <tr className="pb-3" key={indexDataGroup}>
                                                        {variants.length
                                                            ? <>
                                                                <td rowSpan={variants.length}>{color.name}</td>
                                                                <td rowSpan={variants.length}>
                                                                    <ul className="list-unstyled">
                                                                        <li className="mb-2">
                                                                            <Button icon="pi pi-plus"
                                                                                    size={"small"}
                                                                                    rounded
                                                                                    onClick={() => handleAddVariant(indexDataGroup)}
                                                                                    disabled={isFullVariants}
                                                                            />
                                                                        </li>
                                                                        <li className="w-50">
                                                                            <small className="p-error">
                                                                                {errorAddVariant}
                                                                            </small>
                                                                        </li>
                                                                    </ul>
                                                                </td>
                                                            </>
                                                            : <>
                                                                <td>{color.name}</td>
                                                                <td>
                                                                    <ul className="list-unstyled">
                                                                        <li className="mb-2">
                                                                            <Button
                                                                                icon="pi pi-plus"
                                                                                size="small"
                                                                                rounded
                                                                                onClick={() => handleAddVariant(indexDataGroup)}
                                                                            />
                                                                        </li>
                                                                        <li className="w-50">
                                                                            <small className="p-error">
                                                                                {errorAddVariant}
                                                                            </small>
                                                                        </li>
                                                                    </ul>
                                                                </td>
                                                            </>}
                                                        <td>{variants && variants[ZERO]?.size?.name}</td>
                                                        <td>
                                                            {variants && variants.length !== ZERO &&
                                                                <>
                                                                    <InputNumber
                                                                        onChange={e => handleChangeVariantInput(
                                                                            e.value, indexDataGroup, ZERO, "weight"
                                                                        )}
                                                                        onBlur={e => handleBlurVariantInput(
                                                                            e.target.value, indexDataGroup, ZERO, "weight"
                                                                        )}
                                                                        value={variants && variants[ZERO]?.weight}
                                                                        min={ZERO}
                                                                        placeholder='Enter weight'
                                                                        className={classNames({
                                                                            'invalid-input-product': variants[ZERO]?.errorWeight
                                                                        })}
                                                                    />
                                                                    <small className="p-error d-flex">
                                                                        {variants[ZERO]?.errorWeight}
                                                                    </small>
                                                                </>
                                                            }
                                                        </td>
                                                        <td>
                                                            {variants && variants.length !== ZERO &&
                                                                <>
                                                                    <InputNumber
                                                                        onChange={e => handleChangeVariantInput(
                                                                            e.value, indexDataGroup, ZERO, "importPrice"
                                                                        )}
                                                                        onBlur={e => handleBlurVariantInput(
                                                                            e.target.value, indexDataGroup, ZERO, "importPrice"
                                                                        )}
                                                                        value={variants && variants[ZERO]?.importPrice}
                                                                        min={ZERO}
                                                                        mode="currency"
                                                                        currency="VND"
                                                                        locale="vi-VN"
                                                                        placeholder='Enter import price'
                                                                        className={classNames({
                                                                            'invalid-input-product': variants[ZERO]?.errorImportPrice
                                                                        })}
                                                                    />
                                                                    <small className="p-error d-flex">
                                                                        {variants[ZERO]?.errorImportPrice}
                                                                    </small>
                                                                </>
                                                            }
                                                        </td>
                                                        <td>
                                                            {variants && variants.length !== ZERO &&
                                                                <>
                                                                    <InputNumber
                                                                        onChange={e => handleChangeVariantInput(
                                                                            e.value, indexDataGroup, ZERO, "salePrice"
                                                                        )}
                                                                        onBlur={e => handleBlurVariantInput(
                                                                            e.target.value, indexDataGroup, ZERO, "salePrice"
                                                                        )}
                                                                        value={variants && variants[ZERO]?.salePrice}
                                                                        min={ZERO}
                                                                        mode="currency"
                                                                        currency="VND"
                                                                        locale="vi-VN"
                                                                        placeholder='Enter sale price'
                                                                        className={classNames({
                                                                            'invalid-input-product': variants[ZERO]?.errorSalePrice
                                                                        })}
                                                                    />
                                                                    <small className="p-error d-flex">
                                                                        {variants[ZERO]?.errorSalePrice}
                                                                    </small>
                                                                </>
                                                            }
                                                        </td>
                                                        <td>
                                                            {variants && variants.length !== ZERO &&
                                                                <>
                                                                    <InputNumber
                                                                        onChange={e => handleChangeVariantInput(
                                                                            e.value, indexDataGroup, ZERO, "stock"
                                                                        )}
                                                                        onBlur={e => handleBlurVariantInput(
                                                                            e.target.value, indexDataGroup, ZERO, "stock"
                                                                        )}
                                                                        value={variants && variants[ZERO]?.stock}
                                                                        min={ZERO}
                                                                        placeholder='Enter quantity stock'
                                                                        className={classNames({
                                                                            'invalid-input-product': variants[ZERO]?.errorStock
                                                                        })}
                                                                    />
                                                                    <small className="p-error d-flex">
                                                                        {variants[ZERO]?.errorStock}
                                                                    </small>
                                                                </>
                                                            }
                                                        </td>
                                                        <td>
                                                            {variants && variants.length !== ZERO &&
                                                                <InputSwitch checked={variants && variants[ZERO]?.shown}
                                                                         tooltip={(variants && variants[ZERO]?.shown) ? "SHOWN" : "HIDDEN"}
                                                                         onChange={() => handleChangeShownOfVariant(indexDataGroup, ZERO)}
                                                                />
                                                            }
                                                        </td>
                                                        <td>
                                                            {variants && variants.length !== ZERO &&
                                                                <MDBBtn
                                                                    className="btn-close"
                                                                    color="none"
                                                                    aria-label="Close"
                                                                    onClick={() =>
                                                                        handleShowDeleteVariantDialog(indexDataGroup, ZERO)}
                                                                />}
                                                        </td>
                                                    </tr>
                                                    {variants && variants.map(({
                                                                                   size,
                                                                                   weight,
                                                                                   importPrice,
                                                                                   salePrice,
                                                                                   stock,
                                                                                   shown
                                                                               }, indexVariant) => (
                                                        <Fragment key={indexVariant}>
                                                            {indexVariant !== ZERO &&
                                                                <tr className="pb-3" key={indexVariant}>
                                                                    <td>{size.name}</td>
                                                                    <td>
                                                                        <InputNumber
                                                                            onChange={e => handleChangeVariantInput(
                                                                                e.value, indexDataGroup, indexVariant, "weight"
                                                                            )}
                                                                            onBlur={e => handleBlurVariantInput(
                                                                                e.target.value, indexDataGroup, indexVariant, "weight"
                                                                            )}
                                                                            value={weight}
                                                                            min={ZERO}
                                                                            placeholder='Enter quantity stock'
                                                                            className={classNames({
                                                                                'invalid-input-product': variants[indexVariant]?.errorWeight
                                                                            })}
                                                                        />
                                                                        <small className="p-error d-flex">
                                                                            {variants[indexVariant]?.errorWeight}
                                                                        </small>
                                                                    </td>
                                                                    <td>
                                                                        <InputNumber
                                                                            onChange={e => handleChangeVariantInput(
                                                                                e.value, indexDataGroup, indexVariant, "importPrice"
                                                                            )}
                                                                            onBlur={e => handleBlurVariantInput(
                                                                                e.target.value, indexDataGroup, indexVariant, "importPrice"
                                                                            )}
                                                                            value={importPrice}
                                                                            min={ZERO}
                                                                            mode="currency"
                                                                            currency="VND"
                                                                            locale="vi-VN"
                                                                            placeholder='Enter import price'
                                                                            className={classNames({
                                                                                'invalid-input-product': variants[indexVariant]?.errorImportPrice
                                                                            })}
                                                                        />
                                                                        <small className="p-error d-flex">
                                                                            {variants[indexVariant]?.errorImportPrice}
                                                                        </small>
                                                                    </td>
                                                                    <td>
                                                                        <InputNumber
                                                                            onChange={e => handleChangeVariantInput(
                                                                                e.value, indexDataGroup, indexVariant, "salePrice"
                                                                            )}
                                                                            onBlur={e => handleBlurVariantInput(
                                                                                e.target.value, indexDataGroup, indexVariant, "salePrice"
                                                                            )}
                                                                            value={salePrice}
                                                                            min={ZERO}
                                                                            mode="currency"
                                                                            currency="VND"
                                                                            locale="vi-VN"
                                                                            placeholder='Enter sale price'
                                                                            className={classNames({
                                                                                'invalid-input-product': variants[indexVariant]?.errorSalePrice
                                                                            })}
                                                                        />
                                                                        <small className="p-error d-flex">
                                                                            {variants[indexVariant]?.errorSalePrice}
                                                                        </small>
                                                                    </td>
                                                                    <td>
                                                                        <InputNumber
                                                                            onChange={e => handleChangeVariantInput(
                                                                                e.value, indexDataGroup, indexVariant, "stock"
                                                                            )}
                                                                            onBlur={e => handleBlurVariantInput(
                                                                                e.target.value, indexDataGroup, indexVariant, "stock"
                                                                            )}
                                                                            value={stock}
                                                                            min={ZERO}
                                                                            placeholder='Enter inventory stock'
                                                                            className={classNames({
                                                                                'invalid-input-product': variants[indexVariant]?.errorStock
                                                                            })}
                                                                        />
                                                                        <small className="p-error d-flex">
                                                                            {variants[indexVariant]?.errorStock}
                                                                        </small>
                                                                    </td>
                                                                    <td>
                                                                        <InputSwitch checked={shown}
                                                                                     tooltip={shown ? "SHOWN" : "HIDDEN"}
                                                                                     onChange={() => handleChangeShownOfVariant(indexDataGroup, indexVariant)}
                                                                        />
                                                                    </td>
                                                                    <td>
                                                                        <MDBBtn className="btn-close"
                                                                                color="none"
                                                                                aria-label="Close"
                                                                                onClick={() => handleShowDeleteVariantDialog(
                                                                                    indexDataGroup, indexVariant
                                                                                )}
                                                                        />
                                                                    </td>
                                                                </tr>}
                                                        </Fragment>
                                                    ))}
                                                </Fragment>
                                            ))}
                                    </MDBTableBody>
                                </MDBTable>
                            }
                        </div>

                    </div>

                </div>
            </Dialog>

            <Dialog visible={deleteVariantDialog} style={{width: '32rem'}}
                    breakpoints={{'960px': '75vw', '641px': '90vw'}} header="Confirm" modal
                    footer={deleteVariantDialogFooter} onHide={handleHideDeleteVariantDialog}
            >
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{fontSize: '2rem'}}/>
                    {variant && product && (
                        <span>
                            Do you sure want to delete variant <strong>{variant.size?.name}</strong> with <strong>{variant.color?.name}</strong> of <strong>{product.name || 'this product'}</strong> ?
                        </span>
                    )}
                </div>
            </Dialog>

            <Dialog visible={deleteProductDialog} style={{width: '32rem'}}
                    breakpoints={{'960px': '75vw', '641px': '90vw'}} header="Confirm" modal
                    footer={deleteProductDialogFooter} onHide={handleHideDeleteProductDialog}
            >
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{fontSize: '2rem'}}/>
                    {product && (
                        <span>
                            Are you sure you want to delete <strong>{product.name}</strong>?
                        </span>
                    )}
                </div>
            </Dialog>
        </div>
    );

};

export default ProductManagement;
