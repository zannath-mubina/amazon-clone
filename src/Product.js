import React from 'react';
import './Product.css';
import { useStateValue } from './StateProvider';

function Product(props) {
  const [{basket}, dispatch] = useStateValue();

  const addToBasket = () => {
    dispatch({
      type: 'ADD_TO_BASKET',
      item: {
        id: props.id,
        title: props.title,
        image: props.imgSrc,
        price: props.price,
        alt: props.altText,
        ratings: props.ratings,
        ratingsCount: props.ratingsCount
      }
    });
  };

  return (
    <div className='product'>
        <div className="product_info">
            <p>{props.title}</p>
            <div className="product_price">
              <small>M.R.P:</small>
              <small>₹</small>
              <strong>{props.price.toLocaleString('en-IN')}</strong>
            </div>
            <div className="product_rating">
              {Array(props.ratings).fill().map((_, i) => (
                <small key={i}>⭐</small>
              ))}
              <small>{`(${props.ratingsCount})`}</small>
            </div>
        </div>
        <img src={props.imgSrc} alt={props.altText} />
        <button onClick={addToBasket}>Add to basket</button>
    </div>
  )
}

export default Product
