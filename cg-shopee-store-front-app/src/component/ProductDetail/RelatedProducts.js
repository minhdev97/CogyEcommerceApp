import React from 'react';
import { Carousel } from 'primereact/carousel';
import { Rating } from 'primereact/rating';
import { Link } from 'react-router-dom';
import { PRODUCT_DETAIL_PAGE } from '../../constant/page';

function RelatedProducts({ relatedProducts }) {
    const responsiveOptions = [
        {
            breakpoint: '1199px',
            numVisible: 5,
            numScroll: 1,
        },
        {
            breakpoint: '991px',
            numVisible: 4,
            numScroll: 1,
        },
        {
            breakpoint: '767px',
            numVisible: 3,
            numScroll: 1,
        },
    ];

    const handleItemClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const productTemplate = (data) => {
        const rating = (Math.floor(Math.random() * 10) + 1) / 2;
        return (
            <div className="border-1 surface-border border-round m-7 text-center py-5 px-10" key={data.id}>
                <div className="mb-3">
                    <Link to={`${PRODUCT_DETAIL_PAGE}/${data.id}`} onClick={handleItemClick}>
                        <img src={data.image} width={200} height={200} alt="" className="w-6 shadow-2" />
                    </Link>
                </div>
                <div style={{ fontFamily: 'Roboto', color: 'black', alignItems: 'center' }} className="mb-1">
                    <Link to={`${PRODUCT_DETAIL_PAGE}/${data.id}`} style={{ marginBottom: '0.5rem' }}>
                        {data.name}
                    </Link>
                </div>
                <h6
                    className="mt-0 mb-3"
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}
                >
                    <div>{data.view} views</div>
                    <div>{data.numberOfPurchase} purchases</div>
                </h6>
                <div
                    className="mt-5 flex flex-wrap gap-2 justify-content-center"
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}
                >
                    <Rating value={rating} readOnly cancel={false} />
                    <div>{data.minOfPrice?.toLocaleString('vi-VN')}đ</div>
                </div>
            </div>
        );
    };

    return (
        <div className="card" style={{ width: 'auto', height: 'auto', margin: '0px'}}>
            <Carousel
                value={relatedProducts}
                numVisible={5}
                numScroll={1}
                responsiveOptions={responsiveOptions}
                className="custom-carousel"
                circular
                itemTemplate={productTemplate}
            />
        </div>
    );
}

export default RelatedProducts;
