import { BreadCrumb } from 'primereact/breadcrumb';
import { useNavigate} from 'react-router-dom';

import '../../asset/css/other/detail.css';

import {
    CATEGORY_PAGE,
    HOME_PAGE,
} from '../../constant/page';
import {AiOutlineHome} from "react-icons/ai";


export default function BreadCrumbs( {category, subCategory, name} ) {
    const navigate = useNavigate();
    const itemTemplate = (item, index) => {
        if (item.url) {
            return (
                <span key={index} onClick={() => navigate(item.url)}>
                    {item.label}
                </span>
            );
        } else {
            return <span key={index}>{item.label}</span>;
        }
    };

    const items = [
        { label: category?.name, url: `${CATEGORY_PAGE}/${category?.name}.${category?.id}?pageNumber=1` },
        { label: subCategory?.name, url: `${CATEGORY_PAGE}/${category?.name}.${category?.id}.${subCategory?.id}?pageNumber=1` },
        { label: name },
    ];
    const home = { template: <AiOutlineHome style={{cursor:"pointer"}} size={25} onClick={() => navigate(`${HOME_PAGE}`)} />, className: 'd-flex align-items-center'};

    return (
        <BreadCrumb
            model={items}
            home={home}
            itemTemplate={itemTemplate}
            className="variant-ground"
            style={{ fontSize: '2rem'}}
        />
    );
}
