import React from 'react';


const ReviewItems = (props) => {
    const{img, name, price, quantity, key} = props.product;
    return (
        <div className="product">
            <div>
                <img src={img} alt=""/>
            </div>
            <div>
                 <h4>{name}</h4>
                 <br/>
                 <p>{quantity}</p>
                 <p>${price}</p>
           
                  <button onClick={()=>{props.deleteItem(key)}} >
                    Remove</button>

            </div>
        </div>
    );
};

export default ReviewItems;