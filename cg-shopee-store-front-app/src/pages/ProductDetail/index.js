import React from 'react'
import { HeaderOnly } from '../../component/Layout'
import Footer from '../../component/product/Footer'
import ProductDetail from '../../component/ProductDetail';

function ProductDetailPage() {
  return (
      <>
          <HeaderOnly />
          <ProductDetail />
          <Footer />
      </>
  );
}

export default ProductDetailPage;