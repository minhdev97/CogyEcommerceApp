import React, {useEffect, useState} from "react";

import "../../../component/GlobalStyles/GlobalStyles.scss";
import {Link, useSearchParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {
    selectProductListByPageNumber,
    selectSuccessProducts,
    showProductsByPageNumber
} from "../../../features/product/homeProductSlice";

export default function Pagination() {
    const [totalPages, setTotalPages] = useState(0);
    const [hasNext, setHasNext] = useState(false);
    const [hasPrevious, setHasPrevious] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [searchParams] = useSearchParams();
    const page = Number(searchParams.get('pageNumber'));
    const productList = useSelector(selectProductListByPageNumber);
    const success = useSelector(selectSuccessProducts);
    const dispatch = useDispatch();

    const handleItemClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    const renderPaginationIcon = (pageNumber, iconClass, disabled) => (
        <li className="pagination-item">
            <Link
                to={`/daily_discover?pageNumber=${pageNumber}`}
                className={`pagination-item__link ${disabled ? '' : 'disabled'}`}
                onClick={handleItemClick}
            >
                <i className={`pagination-item__icon fa-solid ${iconClass}`}/>
            </Link>
        </li>
    );
    const renderPaginationItem = (pageNumber) => (
        <li
            className={`pagination-item ${page === pageNumber ? 'pagination-item--active' : ''}`}
        >
            <Link to={`/daily_discover?pageNumber=${pageNumber}`} className="pagination-item__link" onClick={handleItemClick}>
                {pageNumber}
            </Link>
        </li>
    );

    const renderDots = () => (
        <li className="pagination-item">
            ...
        </li>
    );

    const renderPaginationItems = () => {
        const paginationItems = [];
        if (totalPages < 7) {
            for (let i=1;i <= totalPages;i++) {
                paginationItems.push(renderPaginationItem(i));
            }
        } else if (page <= 5) {
            for (let i = 1; i <= Math.min(totalPages, 6); i++) {
                paginationItems.push(renderPaginationItem(i));
            }
            paginationItems.push(renderDots());
            paginationItems.push(renderPaginationItem(totalPages));
        } else if (page > 5 && page < totalPages - 4) {
            paginationItems.push(renderPaginationItem(1));
            paginationItems.push(renderDots());
            paginationItems.push(renderPaginationItem(page - 1));
            paginationItems.push(renderPaginationItem(page));
            paginationItems.push(renderPaginationItem(page + 1));
            paginationItems.push(renderPaginationItem(page + 2));
            paginationItems.push(renderDots());
            paginationItems.push(renderPaginationItem(totalPages));
        } else if (page >= totalPages - 4 && page <= totalPages) {
            paginationItems.push(renderPaginationItem(1));
            paginationItems.push(renderDots());
            paginationItems.push(renderPaginationItem(totalPages - 5));
            paginationItems.push(renderPaginationItem(totalPages - 4));
            paginationItems.push(renderPaginationItem(totalPages - 3));
            paginationItems.push(renderPaginationItem(totalPages - 2));
            paginationItems.push(renderPaginationItem(totalPages - 1));
            paginationItems.push(renderPaginationItem(totalPages));
        }

        return paginationItems;
    };

    const getProductByPageNumber = async (pageNumber) => {
        // let isPageStatus = success && hasPrevious && hasNext;
        const getProductByPageNumber = async (pageNumber) =>{
            !success && (await dispatch(showProductsByPageNumber(pageNumber)));
        };

        getProductByPageNumber(pageNumber).then(() => {
            if (success) {
                setTotalPages(productList.totalPages);
                setHasNext(productList.hasNext);
                setHasPrevious(productList.hasPrevious);
                setCurrentPage(productList.currentPageNumber);
            }
        })
    }

    useEffect(() => {
            getProductByPageNumber(page - 1);
    }, [productList,page]);

    return (
        <div>
            <ul className="pagination home-product__pagination">
                {renderPaginationIcon(currentPage, 'fa-angle-left', hasPrevious)}
                <>{renderPaginationItems()}</>
                {renderPaginationIcon(currentPage + 2, 'fa-angle-right', hasNext)}
            </ul>
        </div>
    );
}

