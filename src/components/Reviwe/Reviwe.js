import React, { useEffect, useState } from 'react';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviweItem from '../ReviweItem/ReviweItem';
import happyImg from '../../images/giphy.gif';
import { useHistory } from 'react-router';
const Reviwe = () => {
    const [cart, setCart] = useState([])
    const [orderPlace, setOrderPlace] = useState(false)
    const history=useHistory()

    const handleProceedCheakout = () => {
        history.push("/shipment")
    }

    const handleRemoveProduct = (productKey) => {
        const newCart = cart.filter(pd => pd.key !== productKey)
        setCart(newCart)
        removeFromDatabaseCart(productKey)
    }

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
                    <button onClick={handleProceedCheakout} className="add-product-btn">Proceed Cheackout</button>
                </Cart>
            </div>
        </div>
    );
}
export default Reviwe;