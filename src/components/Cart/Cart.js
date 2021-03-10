import React from 'react';
import { Link } from 'react-router-dom';

const Cart = (props) => {
    const cart = props.cart
    const totalPrice = cart.reduce((totalPrice, prd) => totalPrice + (prd.price*prd.quantity), 0)

    //alternative for cart.reduce and core concept of processing

    // let total=0
    // for(let i=0;i<cart.length;i++){
    //     const product=cart[i]
    //     total += product.price
    // }

    let shippingCost = 0
    if (totalPrice > 1000) {
        shippingCost = 0.00
    }
    else if (totalPrice > 500) {
        shippingCost = 2.99
    }
    else if (totalPrice > 100) {
        shippingCost = 3.99
    }
    else if (totalPrice > 50) {
        shippingCost = 5.99
    }
    else if (totalPrice > 0) {
        shippingCost = 6.99
    }

    const tax = (totalPrice * .02)
    const grandTotal = (totalPrice + shippingCost + tax)

    const formatNumber = num => {
        const precision = num.toFixed(2)
        return Number(precision)
    }
    return (
        <div>
            <h4>Order Summary</h4>
            <p>Items Ordered: {cart.length}</p>
            <p>Product Price: ${formatNumber(totalPrice)}</p>
            <p><small>Shipping Cost: ${shippingCost}</small></p>
            <p><small>Tax + VAT: ${formatNumber(tax)}</small></p>
            <p>Total Price: ${formatNumber(grandTotal)}</p>
            <br />
            {
                props.children
            }
        </div>
    );
};

export default Cart;