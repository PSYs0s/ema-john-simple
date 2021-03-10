import React from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';
import Product from '../Product/Product';

const ProductDetail = () => {
    const{key}=useParams()
    const product=fakeData.find(pd=>pd.key===key)
    return (
        <div>
            Product detail
            <Product showAddToCart={false} product={product}></Product>
        </div>
    );
};

export default ProductDetail;