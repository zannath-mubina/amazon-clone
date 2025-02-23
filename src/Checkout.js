import React from 'react';
import './Checkout.css';
import Subtotal from './Subtotal';
import { useStateValue } from './StateProvider';
import CheckoutProduct from './CheckoutProduct';
import EmptyCart from './EmptyCart';

function Checkout() {
  const [{basket, user}] = useStateValue();

  return (
    <div className='checkout'>
        <div className="checkout_left">
            <img className='checkout_ad' src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg" alt="Ad in checkout page" />
            <div>
                <h4>Hello, {user ? user.email : 'Guest'}</h4>
                <h2 className="checkout_title">Your Shopping Basket</h2>
            </div>
            {basket.length > 0 ? basket.map((item, i) => (
              <CheckoutProduct
                id={item.id}
                key={i}
                title={item.title}
                price={item.price}
                ratings={item.ratings}
                ratingsCount={item.ratingsCount}
                imgSrc={item.image}
                altText={item.altText}
              />
            )) : <EmptyCart type="empty_cart"/>}
        </div>
        <div className="checkout_right">
            <Subtotal />
        </div>
    </div>
  )
}

export default Checkout
