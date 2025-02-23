import React from 'react';
import CurrencyFormat from 'react-currency-format';
import './Subtotal.css'
import { useStateValue } from './StateProvider';
import { useNavigate } from 'react-router-dom';
import { getBasketTotal } from './reducer';

function Subtotal() {
  const [{basket}] = useStateValue();
  const navigate = useNavigate();

   return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
            <>
                <p>
                    Subtotal ({basket?.length} items): <strong>{value}</strong>
                </p>
                <small className="subtotal_gift">
                  <input disabled={basket.length === 0} type="checkbox" /> This order contains a gift
                </small>
            </>
        )}
        decimalScale={2}
        value={getBasketTotal(basket)}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"₹"}
      />

      <button disabled={basket.length === 0} onClick={e => navigate('/payment')}>Proceed to Checkout</button>
    </div>
  )
}

export default Subtotal
