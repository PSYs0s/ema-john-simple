import { useParams } from 'react-router-dom';
import Product from '../Product/Product';
import React, { useEffect, useState } from 'react';
const ProductDetail = () => {
    const{key}=useParams()
    const [product,setProduct]=useState({})
    useEffect(()=>{
        fetch('http://localhost:5000/product/'+key)
        .then(res=>res.json())
        .then(data=>setProduct(data))
    },[key])
    return (
        <div>
            <Product showAddToCart={false} product={product}></Product>
        </div>
    );
};

export default ProductDetail;