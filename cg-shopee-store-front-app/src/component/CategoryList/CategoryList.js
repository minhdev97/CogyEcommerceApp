import React, {useState, useEffect} from 'react';
import {Carousel} from 'primereact/carousel';
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {
    getCategories,
    selectCategoryList,
    selectSuccessCategories,
    setSuccessCategories
} from "../../features/category/categorySlice";

export default function CategoryList() {
    const [categories, setCategories] = useState([]);
    const dispatch = useDispatch();
    const categoryList = useSelector(selectCategoryList);
    const success = useSelector(selectSuccessCategories);
    const responsiveOptions = [
        {
            breakpoint: '1199px',
            numVisible: 5,
            numScroll: 1
        },
        {
            breakpoint: '991px',
            numVisible: 4,
            numScroll: 1
        },
        {
            breakpoint: '767px',
            numVisible: 3,
            numScroll: 1
        }
    ];

    const getCategoryList = () => {
        const getCategoryList = async () => {
            !success && (await dispatch(getCategories()));
        };
        getCategoryList().then(() => {
            success && setCategories(categoryList);
        })
    }

    useEffect(() => {
        getCategoryList();
        return () => {
            dispatch(setSuccessCategories(false));
        }
    }, [categoryList]);

    const productTemplate = (category) => {
        return (
            <div className="category-list-item border-1 surface-border border-round m-10 text-center py-5 px-10" key={category?.id}>
                <Link to={`category/${category?.name}.${category?.id}?pageNumber=1`}>
                    <div className="mb-3">
                        <img src={category?.image}
                             alt={category?.name} className="w-6 category-list-item_img"/>
                    </div>
                    <div>
                        <h4 className="mb-1 category-list-item_name">{category?.name}</h4>
                    </div>
                </Link>
            </div>
        );
    };
    return (
        <div className="card" style={{width: 1200, height: 280}}>
            <div align={'center'} style={{fontFamily:"Roboto,sans-serif",paddingTop: 12,fontSize:22}}><p>CATEGORIES</p></div>
            <Carousel value={categories} numVisible={5} numScroll={1} responsiveOptions={responsiveOptions}
                      className="custom-carousel" circular
                      itemTemplate={productTemplate}/>
        </div>
    )
}