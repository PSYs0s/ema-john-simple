import React from 'react';

const ReviweItem = (props) => {
    const {name,quantity,key,price}=props.product
    const styles={
        borderBottom:"1px solid lightgray",
        marginBottom:"5px",
        paddingBottom:"5px",
        marginLeft:"200px"
    }
    return (
        <div style={styles} className="reviwe-item">
            <h4 className="product-name">{name}</h4>
            <p>Quantity: {quantity}</p>
            <p>  <small>${price} </small> </p>
            <br/>
            <button onClick={()=>props.removeProduct(key)} className="add-product-btn">Remove Item</button>
        </div>
    );
};

export default ReviweItem;