import React, { useEffect, useState } from 'react';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';

const Shop = () => {
    //const first10 = fakeData.slice(0, 10)
    const [products, setProducts] = useState([])
    const [cart, setCart] = useState([])
    useEffect(()=>{
        fetch('https://still-oasis-42937.herokuapp.com/products')
        .then(res=>res.json())
        .then(data=>setProducts(data))
    },[])
    useEffect(() => {
        const savedCart = getDatabaseCart()
        const productKeys = Object.keys(savedCart)
        fetch('https://still-oasis-42937.herokuapp.com/productsByKeys',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(productKeys)
        })
        .then(res=>res.json())
        .then(data=>setCart(data))
    }, [])
    const handleAddProduct = (product) => {
        const productToBeAdded = product.key
        const sameProduct = cart.find(pd => pd.key === productToBeAdded)
        let count = 1
        let newCart
        if (sameProduct) {
            count = sameProduct.quantity + 1
            sameProduct.quantity = count
            const others = cart.filter(pd => pd.key !== productToBeAdded)
            newCart = [...others, sameProduct]
        }
        else {
            product.quantity = 1
            newCart = [...cart, product]
        }
        setCart(newCart)
        addToDatabaseCart(product.key, count)
    }

    return (
        <div className="shop-container">
            <div className="product-container">
                {
                    products.map(productInfo => <Product showAddToCart={true} handleAddProuct={handleAddProduct} key={productInfo.key} product={productInfo}></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to="/reviwe">
                        <button className="add-product-btn">Reviwe order</button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;