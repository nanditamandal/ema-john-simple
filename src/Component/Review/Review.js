import React ,{useState, useEffect} from 'react';
import {getDatabaseCart, removeFromDatabaseCart} from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItems from '../ReviewItems/ReviewItems';
import Cart from '../Cart/Cart';


const Review = () => {
    const [cart, setCart]=useState([]);

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
    console.log(cart[0]);

    return (
        <div className="shop-container">
             <div className="products-container">
       
                    { 
                        cart.map(pd => <ReviewItems deleteItem={deleteItem} product={pd}></ReviewItems>)
                    }

            </div>
            <div className="cart-container">
                    <Cart cart={cart}></Cart>
            </div>
            
        </div>
    );
};

export default Review;