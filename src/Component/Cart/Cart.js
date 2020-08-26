import React from 'react';

const Cart = (props) => {
    const cart =props.cart;
    console.log(cart);
   // let total =0;
    const total =cart.reduce((total, pro)=>total+pro.product.price, 0);
    let shipping =0;
    if(total >35)
    {
        shipping = 0;
    }
    else if(total> 15)
    {
        shipping =4.99;
    }
    else if(total>0)
    {
        shipping =12.99;
    }
    const tax= (total/12).toFixed(2);

    return (
        <div>
            <h1>Oder Summary</h1>
            <p>Items ordered:{cart.length}</p>
             <p>shipping Charge: {shipping}</p>
             <p>Items Price: {total}</p>
            <p>Total before tax:	{total+shipping}</p>
            <p>Tax + vat {tax}</p>
            <p>Order Total:	{total+shipping+Number(tax)}</p>
        </div>
    );
};

export default Cart;