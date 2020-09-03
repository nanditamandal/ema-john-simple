import React from 'react';
import {Link} from 'react-router-dom';

const ReviewCart = (props) => {
    const cart =props.cart;
    let total=0;
    console.log(cart);
   // let total =0;
   // const total =cart.reduce((total, pro)=>total+pro.product.price, 0);
    for(let i=0; i<cart.length; i++)
    {
        //const product =cart[i].product;
        total =(total +cart[i].price)*cart[i].quantity;
    }  
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
            <h1 className="text-danger">Oder Summary</h1>
            <p>Items ordered:{cart.length}</p>
             <p>shipping Charge: {shipping}</p>
             <p>Items Price: {total}</p>
            <p>Total before tax:	{total+shipping}</p>
            <p>Tax + vat {tax}</p>
            <p>Order Total:	{total+shipping+Number(tax)}</p>
            <Link to='/review'>
                <button className="btn btn-primary">Review</button>
            </Link>
            
        </div>
    );
};

export default ReviewCart;