import React ,{useState, useEffect } from 'react';
import {getDatabaseCart, removeFromDatabaseCart, processOrder} from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItems from '../ReviewItems/ReviewItems';
import Cart from '../Cart/Cart';
import happyImage from '../../images/giphy.gif';
import { useHistory } from "react-router-dom";


const Review = () => {
    const [cart, setCart]=useState([]);
    const [oderPlaced, setOrderPlaced]=useState(false);
    let history = useHistory();
    const handelProceedCheckOut=()=>{
     
        history.push("/login");
    }

    const deleteItem = (pdKey)=>{
        console.log("clicked", pdKey);
        const newCart = cart.filter(pd => pd.key !== pdKey);
        setCart(newCart);
        removeFromDatabaseCart(pdKey);
 
    }
    useEffect(()=>{
       
        const saveCart = getDatabaseCart();
        const productKeys= Object.keys(saveCart);
        
        const cartProduct = productKeys.map(key =>{
            console.log(key);
            const product=fakeData.find(pd=> pd.key === key);
            product.quantity =saveCart[key];
           
            return product;
        })
        setCart(cartProduct); 
        
        
    },[])
  
    let thankyou;
    if(oderPlaced){
        thankyou =<img src={happyImage}></img>
    }
    return (
        <div className="shop-container">
             <div className="products-container">
       
                    { 
                        cart.map(pd => <ReviewItems deleteItem={deleteItem} product={pd}></ReviewItems>)
                    }
                    {
                        thankyou
                    }

            </div>
            <div className="cart-container">
                    <Cart cart={cart}>
                        <button  onClick={handelProceedCheckOut}className="main-button">Proceed CheckOut</button>
                    </Cart>
            </div>
            
        </div>
    );
};

export default Review;