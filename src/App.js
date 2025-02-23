import Header from './Header.js';
import Home from './Home.js';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Checkout from './Checkout.js';
import Login from './Login.js';
import Orders from './Orders.js';
import { useEffect } from 'react';
import { auth } from './firebase.js';
import { useStateValue } from './StateProvider.js';
import Payment from './Payment.js';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Footer from './Footer.js';

const promise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

function App() {
  const [{}, dispatch] = useStateValue();
  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      if (authUser) {
        dispatch({
          type: 'SET_USER',
          user: authUser
        })
      } else {
        dispatch({
          type: 'SET_USER',
          user: null
        })
      }
    })
  }, []);

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="/orders" element={<>
            <Header />
            <Orders />
            <Footer />
          </>} />
          <Route path="/checkout" element={<>
            <Header />
            <Checkout />
            <Footer />
          </>}/>
          <Route path="/payment" element={<>
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
            <Footer />
          </>} />
          <Route path="/" element={<>
            <Header />
            <Home />
            <Footer />
          </>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
