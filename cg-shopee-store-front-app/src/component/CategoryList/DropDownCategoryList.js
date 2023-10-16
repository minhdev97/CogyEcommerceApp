import React, {memo, useEffect, useState} from "react";
import {Dropdown} from 'primereact/dropdown';
import {useDispatch, useSelector} from "react-redux";

import {
    selectSuccessModifyCategories,
    selectModifyCategoryList,
    selectLoadingModifyCategories,
    getCategoriesWithAllSubCategories
} from "../../features/category/categoryModifySlice";

const DropDownCategoryList = ({onChangeCategory, category}) => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [categoryList, setCategoryList] = useState([]);

    const successCategories = useSelector(selectSuccessModifyCategories);
    const categories = useSelector(selectModifyCategoryList);
    const dispatch = useDispatch();

    useEffect(() => {
        getCategoryList();
        if (category?.id) {
            setSelectedCategory(category);
            onChangeCategory(category.subCategories);
        }
        return () => onChangeCategory(null)
    }, [category, categories]);


    const getCategoryList = () => {
        const getCategoryList = async () => {
            !successCategories && (await dispatch(getCategoriesWithAllSubCategories()));
        };
        getCategoryList().then(() => {
            successCategories && setCategoryList(categories);
        });
    }

    const selectedCategoryTemplate = (category, props) => {
        if (category) {
            return (
                <div className="d-flex float-left">
                    <img alt={category.name}
                         src={category.image}
                         className={`flag flag-${category.id.toLowerCase()}`}
                         style={{width: '25px', marginRight: '1rem'}}
                    />
                    <div>{category.name}</div>
                </div>
            );
        }

        return <span style={{color: 'orange'}}>{props.placeholder}</span>;
    };

    const categoryTemplate = (category) => {
        return (
            <div className="d-flex float-left">
                <img
                    alt={category.name}
                    src={category.image}
                    className={`flag flag-${category.id.toLowerCase()}`}
                    style={{width: '25px', marginRight: '1rem'}}
                />
                <div>{category.name}</div>
            </div>
        );
    };

    const handleChangeCategory = (e) => {
        setSelectedCategory(e.value);
        onChangeCategory(e.value.subCategories);
    }

    const panelFooterTemplate = () => {
        return (
            <div className="py-2 px-3">
                {selectedCategory ? (
                    <span className="ml-3">
                        <b>{selectedCategory.name}</b> selected.
                    </span>
                ) : (
                    'No subCategory selected.'
                )}
            </div>
        );
    };

    return (
        <div className="card flex justify-content-center w-75 mt-2">
            <Dropdown value={selectedCategory}
                      filter
                      onChange={(e) => handleChangeCategory(e)}
                      options={categoryList}
                      optionLabel="name"
                      placeholder="Select a subCategory"
                      className="w-full md:w-14rem"
                      valueTemplate={selectedCategoryTemplate}
                      itemTemplate={categoryTemplate}
                      panelFooterTemplate={panelFooterTemplate}/>
        </div>
    )
}
export default memo(DropDownCategoryList);
