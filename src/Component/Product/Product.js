import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './Product.css';
import {Link} from 'react-router-dom';

const Product = (props) => {
    const product =props.product;
    const {name,seller, price, img,stock, key}=product;
    product.quantity =1;

    return (
        <div className="product">
            <div>
                <img src={img} alt=""/>
            </div>
            <div>
                 <h4><Link to={"/product/"+key}>{name} </Link></h4>
                 <br/>
                 <p><small>by:{seller}</small></p>
                 <p>${price}</p>
               
                <p><small>Only{stock}left in stock -Order soon</small></p>
                { props.addButton  &&   <button onClick={()=>props.handelAddProduct(props.product)}><FontAwesomeIcon icon={faShoppingCart} />
                    add to cart</button>}

            </div>
        </div>
    );
};

export default Product;