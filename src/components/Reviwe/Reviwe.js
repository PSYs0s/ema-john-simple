import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviweItem from '../ReviweItem/ReviweItem';
import happyImg from '../../images/giphy.gif';
const Reviwe = () => {
    const [cart, setCart] = useState([])
    const [orderPlace, setOrderPlace] = useState(false)

    const handlePlaceOrder = () => {
        setCart([])
        setOrderPlace(true)
        processOrder()
    }

    const handleRemoveProduct = (productKey) => {
        const newCart = cart.filter(pd => pd.key !== productKey)
        setCart(newCart)
        removeFromDatabaseCart(productKey)
    }

    useEffect(() => {
        const savedCart = getDatabaseCart()
        const productKeys = Object.keys(savedCart)
        const cartProducts = productKeys.map(key => {
            const product = fakeData.find(pd => pd.key === key)
            product.quantity = savedCart[key]
            return product
        })
        setCart(cartProducts)
    }, [])

    let thankYou;
    if (orderPlace) {
        thankYou = <img src={happyImg} alt=""></img>
    }
    return (
        <div className="shop-container">
            <div className="product-container">
                {
                    cart.map(pd => <ReviweItem removeProduct={handleRemoveProduct} product={pd} key={pd.key}></ReviweItem>)
                }
                {
                    thankYou
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <button onClick={handlePlaceOrder} className="add-product-btn">Place Order</button>
                </Cart>
            </div>
        </div>
    );
}
export default Reviwe;