import React, { useState, useEffect } from 'react';
import fakeData from '../../fakeData';
import Product from '../Product/Product'
import './Shop.css';
import Cart from '../Cart/Cart';
import {addToDatabaseCart, getDatabaseCart} from '../../utilities/databaseManager';

const Shop = () => {
    const first10 =fakeData.slice(0,10);
    const [products, setProduct] = useState(first10);
    const [cart, setCart]=useState([]);
    
    useEffect(()=>{
        const saveCart =getDatabaseCart();
        const productKeys=Object.keys(saveCart);
        const previousCart =productKeys.map(existingKeys=>{
            const product=fakeData.find(pd => pd.key === existingKeys);
            product.quantity=saveCart[existingKeys];
            return product;

        })
        setCart(previousCart);
        console.log("cart", previousCart);
    },[])
    

    const handelAddProduct =(product)=>{
        console.log(product);
        const key =product.key;
        console.log("key", key);
        const sameProduct = cart.find(pd => pd.key ===key );
        let count =1;
        let newCart;
        if(sameProduct){
            
           count = sameProduct.quantity+1;
           console.log("count",count);
           sameProduct.quantity =count;
            const others =cart.filter(pd=>pd.key !== key);
            newCart= [...others,sameProduct ];
        }
        else{
            product.quantity =1;
            newCart=[...cart,product ];
           
            console.log(newCart);
        }
        console.log("same product",sameProduct);
      
        setCart(newCart);
        addToDatabaseCart(product.key, count );

    }
    console.log("total", cart);
    return (
        <div className="shop-container">
            <div className="products-container">
                
                    {
                        products.map(product => <Product product={product} addButton={true} handelAddProduct={handelAddProduct}></Product>)
                    }
                

            </div>
            <div className="cart-container">
                <Cart cart={cart}></Cart>
               
            </div>
            
        </div>
    );
};

export default Shop;