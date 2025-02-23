import React, { useEffect, useState } from 'react'
import './Payment.css';
import { useStateValue } from './StateProvider'
import CheckoutProduct from './CheckoutProduct';
import { Link, useNavigate } from 'react-router-dom';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format';
import { getBasketTotal } from './reducer';
import axios from './axios.js';
import { db } from './firebase.js';

function Payment() {
  const [{ basket, user, city, pincode}, dispatch] = useStateValue();
  const navigate = useNavigate();

  const stripe = useStripe();
  const elements = useElements();

  const [processing, setProcessing] = useState(false);
  const [succeeded, setSucceeded] = useState("");
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState(true);

  useEffect(() => {
    // Generate the stripe secret which allows us to charge a customer
    const getClientSecret = async () => {
        try {
            const response = await axios({
                method: 'post',
                url: `/payments/create?total=${getBasketTotal(basket) * 100}`
            });
            setClientSecret(response.data.clientSecret);
        } catch (err) {
            console.error("Error fetching client secret:", err);
            
            if (!err.response) {
                setError("Network error! Check your internet connection.");
            } else if (err.response.status === 500) {
                setError("Server error! Please try again later.");
            } else {
                setError("Failed to initialize payment. Please try again.");
            }
        }
    };

    getClientSecret();
  }, [basket])

  const handleSubmit = async(e) => {
    e?.preventDefault();

    if (!user) {
        setError("Please sign in.");
        return;
    }
    
    setProcessing(true);

    if (!clientSecret) {
        setError("Payment could not be processed. Please try again.");
        setProcessing(false);
        return;
    }
    try {
        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        });

        if (payload.error) {
            throw new Error(payload.error.message);
        }

        db
          .collection('users')
          .doc(user?.uid)
          .collection('orders')
          .doc(payload.paymentIntent.id)
          .set({
            basket: basket,
            amount: payload.paymentIntent.amount,
            created: payload.paymentIntent.created
          })

        setSucceeded(true);
        setError(null);
        setProcessing(false);

        dispatch({
            type: 'EMPTY_BASKET'
        })

        navigate('/orders', {replace: true});
    } catch (err) {
        console.error("Payment failed:", err);
        setProcessing(false);
    }
  }

  const handleChange = e => {
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  }

  return (
    <div>
      <div className="payment">
        <div className="payment_container">
            <h1>Checkout (<Link to='/checkout'>{basket?.length} items</Link>)</h1>
            <div className="payment_section">
                <div className="payment_title">
                    <h4>Delivery address</h4>
                </div>
                <div className="payment_address">
                    <p>{user?.email}</p>
                    <p>{city && city} {pincode && pincode}</p>
                </div>
            </div>
            <div className="payment_section">
                <div className="payment_title">
                    <h4>Review items and delivery</h4>
                </div>
                <div className="payment_items">
                    {basket.map((item, i) => (
                        <CheckoutProduct
                            key={i}
                            id={item.id}
                            title={item.title}
                            price={item.price}
                            ratings={item.ratings}
                            ratingsCount={item.ratingsCount}
                            imgSrc={item.image}
                            altText={item.altText}
                        />
                    ))}
                </div>
            </div>
            <div className="payment_section">
                <div className="payment_title">
                    <h4>Payment Method</h4>
                </div>
                <div className="payment_details">
                    <form onSubmit={handleSubmit}>
                        <CardElement onChange={handleChange}/>

                        <div className="payment_priceDetails">
                            <CurrencyFormat
                                renderText={(value) => (
                                    <>
                                        <h3>Order Total: {value}</h3>
                                    </>
                                )}
                                decimalScale={2}
                                value={getBasketTotal(basket)}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"₹"}
                            />

                            <button disabled={processing || disabled || succeeded}>
                                <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                            </button>
                        </div>

                        {error && <div>{error}</div>}
                    </form>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Payment
