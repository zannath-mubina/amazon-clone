import React from 'react';
import './CheckoutProduct.css';
import { useStateValue } from './StateProvider';

function CheckoutProduct(props) {
  const [{basket}, dispatch] = useStateValue();

const removeFromBasket = () => {
    dispatch({
        type: 'REMOVE_FROM_BASKET',
        id: props.id
    });
};
  return (
    <div className='checkoutProduct'>
        <img className='checkoutProduct_image' src={props.imgSrc} alt={props.altText} />
        <div className="checkout_product_info">
            <p className='checkoutProduct_title'>{props.title}</p>
            <div className="checkout_product_price">
                <small>M.R.P: </small>
                <small>₹</small>
                <strong>{props.price?.toLocaleString('en-IN')}</strong>
            </div>
            <div className="checkout_product_rating">
                {Array(props.ratings).fill().map((_, i) => (
                    <p key={i}>⭐</p>
                ))}
                <p>{props.ratingsCount}</p>
            </div>
            {!props.hideButton && (
                <button onClick={removeFromBasket}>Remove to basket</button>
            )}
        </div>
    </div>
  )
}

export default CheckoutProduct
