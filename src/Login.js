import { Link, useNavigate } from 'react-router-dom';
import React, {useState} from 'react';
import './Login.css';
import {auth} from './firebase.js';

function Login() {
  const [credentials, setCredentials] = useState({email: "", password: ""});
  const navigate = useNavigate();

  const handleChange = e => {
    const {name, value} = e.target;
    setCredentials(prevValue => ({...prevValue, [name]: value}))
  };

  const signIn = e => {
    e.preventDefault();

    auth
        .signInWithEmailAndPassword(credentials.email, credentials.password)
        .then(auth => {
          navigate("/")
        })
        .catch(error => alert(error.message));
  };

  const register = e => {
    e.preventDefault();

    auth
      .createUserWithEmailAndPassword(credentials.email, credentials.password)
      .then(auth => {
        if (auth) navigate("/");
      })
      .catch(error => alert(error.message));
  }

  return (
    <div className='loginContainer'>
      <div className='login'>
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', color: '#111' }}>
            <img className='logo' src={`${process.env.PUBLIC_URL}/Amazon_Logo.svg`} alt='Amazon logo' />
            <span className='logoIn'>.in</span>
        </Link>
        <div className="login_container">
            <h3>Sign in</h3>
            <form action="">
                <h6>Email</h6>
                <input type="text" name="email" value={credentials.email} onChange={handleChange} autoFocus/>
                <h6>Password</h6>
                <input type="password" name="password" value={credentials.password} onChange={handleChange} />
                <button className='signInButton' onClick={signIn}>Continue</button>
            </form>
            <p>By continuing, you agree to Amazon Clone's Conditions of Use and Privacy Notice.</p>

            <p className="newToAmazon"><span>New to Amazon?</span></p>

          <button className='signInButton newAccount' onClick={register}>Create your Amazon account</button>
        </div>
      </div>
      <p className='divider'></p>
      <div className="login_footer">
        <p>© 2025, AmazonClone.com or its affiliates</p>
      </div>
    </div>
  )
}

export default Login
