import React from 'react';
import {useParams} from 'react-router-dom';
import fakeData from '../../fakeData';
import Product from '../Product/Product';

const ProductDetails = () => {
    const { productKey}= useParams();
    const product = fakeData.find((pro)=> pro.key === productKey);
    console.log(product);
    return (
        <div>

            {productKey} comming sooon
            <Product addButton={false} product={product}></Product>
        </div>
    );
};

export default ProductDetails;