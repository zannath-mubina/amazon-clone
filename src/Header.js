import React, { useEffect, useState } from 'react';
import './Header.css';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {Link} from 'react-router-dom';
import { useStateValue } from './StateProvider';
import { auth } from './firebase';

function Header() {
  const [{basket, user, city, pincode}, dispatch] = useStateValue();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [location, setLocation] = useState({city: "", pincode: ""});

  useEffect(() => {
    const getCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(successFn, errorFn);
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    }

    const successFn = (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                const city = data.address.city || data.address.town || data.address.village || data.address.state_district || data.address.state;
                const pincode = data.address.postcode;
                if (city) {
                    dispatch({
                        type: 'SET_CITY',
                        city: city
                    })
                }
                if (pincode) {
                    dispatch({
                        type: 'SET_PINCODE',
                        pincode: pincode
                    })
                }
            })
            .catch(error => console.error("Error:", error));
    }

    const errorFn = (error) => {
        console.error("Error fetching location: ", error);
    }

    getCurrentLocation();
  }, []);

  useEffect(() => {
    document.querySelector(".modal-backdrop")?.remove();
  }, [isModalOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocation(prevValue => ({ ...prevValue, [name]: value }))
  };

  const updateLocation = e => {
      e.preventDefault();

      if (location.city) {
        dispatch({
            type: 'SET_CITY',
            city: location.city
        })
      }

      if (location.pincode) {
        dispatch({
            type: 'SET_PINCODE',
            pincode: location.pincode
        })
      }
      document.getElementById("modalCloseBtn").click();
  }

  const textDec = {textDecoration: 'none'};

  return (
    <div className='header'>
        <Link to="/">
            <img className='header_logo' src={`${process.env.PUBLIC_URL}/amazon.png`} alt='Amazon logo' />
        </Link>
        <span className='headerLogoIn'>.in</span>
        <div className='header_location'>
            <LocationOnIcon />
            <div className='header_option location'>
                <span className='navOptionLine1'>Deliver to {city && city} {pincode && pincode}</span>
                <button className='navOptionLine2' onClick={() => setIsModalOpen(true)} data-bs-toggle="modal" data-bs-target="#exampleModalLive">Update Location</button>
            </div>
        </div>
        <div className='header_searchBar'>
            <input className='header_searchInput' type='text' placeholder='Search AmazonClone.in'/>
            <SearchIcon className='header_searchIcon'/>
        </div>
        <div className='header_navBar'>
            <Link to={!user && "/Login"} style={textDec}>
                <div className='header_option' onClick={() => user && auth.signOut()}>
                    <span className='navOptionLine1'>Hello {user ? user.email : 'Guest'}</span>
                    <span className='navOptionLine2'>{user ? "Sign out" : "Sign in"}</span>
                </div>
            </Link>
            <Link to='/orders' style={textDec}>
                <div className='header_option'>
                    <span className='navOptionLine1'>Returns</span>
                    <span className='navOptionLine2'>& Orders</span>
                </div>
            </Link>
            <div className='header_option'>
              <span className='navOptionLine1'>Your</span>
              <span className='navOptionLine2'>Prime</span>
            </div>
            <Link to="/checkout" style={textDec}>
                <div className='header_basket'>
                    <ShoppingCartIcon />
                    <div className='headerBasketCount'>
                        <span className='navOptionLine2'>{basket?.length}</span>
                    </div>
                </div>
            </Link>
        </div>

        <div className="modal fade" tabIndex="-1" id="exampleModalLive" data-bs-backdrop="static" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title fs-5" id="exampleModalLabel">Update Location</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setIsModalOpen(false)}></button>
                    </div>
                    <div className="modal-body">
                        <input type="text" name="city" className="form-control mb-2" placeholder="Enter City" onChange={handleChange}/>
                        <input type="text" name="pincode" className="form-control" placeholder="Enter Pincode" onChange={handleChange} />
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" id="modalCloseBtn" data-bs-dismiss="modal" onClick={() => setIsModalOpen(false)}>Close</button>
                        <button type="button" className="btn btn-primary" onClick={updateLocation}>Save</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Header
