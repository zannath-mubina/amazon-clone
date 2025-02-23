import React from 'react';
import './Footer.css';

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  return (
    <div className='footer'>
        <div onClick={scrollToTop} className="backToTopContainer">
              <button><small>Back to top</small></button>
        </div>
        <div className="footer_container">
            <div className="footer_columns">
                <h4>Get to Know Us</h4>
                <p>About Amazon</p>
                <p>Careers</p>
                <p>Press Releases</p>
                <p>Amazon Science</p>
            </div>
            <div className="footer_columns">
                <h4>Connect with Us</h4>
                <p>Facebook</p>
                <p>Twitter</p>
                <p>Instagram</p>
            </div>
            <div className="footer_columns">
                <h4>Make Money with Us</h4>
                <p>Sell on Amazon</p>
                <p>Sell under Amazon Accelerator</p>
                <p>Protect and Build Your Brand</p>
                <p>Amazon Global Selling</p>
                <p>Supply to Amazon</p >
                <p>Become an Affiliate</p >
                <p>Fulfilment by Amazon</p >
                <p>Advertise Your Products</p >
                <p>Amazon Pay on Merchants</p >
            </div>
            <div className="footer_columns">
                <h4>Let Us Help You</h4>
                <p>Your Account</p>
                <p>Returns Centre</p>
                <p>Recalls and Product Safety Alerts</p>
                <p>100% Purchase Protection</p>
                <p>Amazon App Download</p>
                <p>Help</p>
            </div>
        </div>
    </div>
  )
}

export default Footer
