import React from 'react';
import './EmptyCart.css';
import { Link } from 'react-router-dom';

function EmptyCart({type}) {
  const textDec = {textDecoration: 'none'};
  return (
    <div className='emptyCart'>
      {type === 'zero_order' && 
        <div className='zero_order'>
          <p>Looks like you haven't placed an order.</p>
        </div>
      }
      {type === 'empty_cart' &&
        <div className='empty_cart'>
          <img src={`${process.env.PUBLIC_URL}/empty_cart.svg`} alt="Kettle represents empty cart" />
          <div className="empty_card_right">
            <h4>Your Amazon Cart is empty</h4>
            <Link to='/' style={textDec}>Shop today’s deals</Link>
            <Link to='/Login' style={textDec}><button className='signInButton'>Sign in to your account</button></Link>
          </div>
        </div>
      }
    </div>
  )
}

export default EmptyCart
