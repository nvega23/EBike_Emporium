import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BiHide, BiShow } from "react-icons/bi";
import bikeImage from "../../assets/bikeImage.jpeg";
import { login, clearSessionErrors } from '../../store/session';
import { useNavigate } from 'react-router';
import './login.css';

const API_URL = process.env.REACT_APP_API_URL;

const fetchCSRFToken = async () => {
  try {
      const response = await fetch(`${API_URL}/csrf/restore`);
      if (!response.ok) {
          throw new Error('Failed to fetch CSRF token');
      }
      const data = await response.json(); // Call json() only once
      document.cookie = `CSRF-Token=${data['CSRF-Token']}; path=/`;
  } catch (error) {
      console.error('Error fetching CSRF token:', error);
  }
};


function LoginForm () {
  const [email, setEmail] = useState('');
  const [documentTitle, setDocumentTitle] = useState("EcoBike Emporium - Log in or Sign up");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState('');
  const errors = useSelector(state => state.session.errors);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  useEffect(() => {
    fetchCSRFToken();
    return () => {
      dispatch(clearSessionErrors());
      document.title = documentTitle;
    };
  }, [dispatch, documentTitle]);

  const update = (field) => {
    const setState = field === 'email' ? setEmail : setPassword;
    return e => setState(e.currentTarget.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }))
      .then(() => {
        document.title = "EcoBike Emporium";
      });
    navigate("/posts");
  };

  const handleDemo = (e) => {
    e.preventDefault();
    dispatch(login({email:"demo@user.io", password: "password"}))
      .then(() => {
        document.title = "EcoBike Emporium";
      });
    navigate("/posts");
  };

  return (
    <div id="outer">
      <div className="media-container">
        {/* <video src={bikeVideo} autoPlay loop muted className="background-video"></video> */}
        <img src={bikeImage} alt="Bike" className="background-image" />
      </div>
      <div className="wrapper">
        <div className="title">
          Login Form
        </div>
        <form onSubmit={handleSubmit}>
          <div className="errors">{errors?.email}</div>
          <label className="customFieldLogin">
            <input type="email"
              value={email}
              onChange={update('email')}
              placeholder="Email"
              className="loginField"
              required/>
          </label>
          <div className="errors">{errors?.password}</div>
          <label className="custom-loginField">
            <input type={passwordVisible ? "text" : "password"}
              value={password}
              onChange={update('password')}
              placeholder="Password"
              className="loginField"
              required/>
          </label>
          <button className='toggleButton' onClick={togglePasswordVisibility}>
            {passwordVisible ? (
              <>
                <BiHide /> Hide Password
              </>
            ) : (
              <>
                <BiShow /> Show Password
              </>
            )}
          </button>
          <div className="divLoginField">
            <input
              className="loginFields"
              type="submit"
              value="Login"
              disabled={!email || !password}
            />
          </div>
          <br/>
          <button type='submit' className='buttonField' onClick={handleDemo}>Demo Login</button>
          <div className="content">
            <div className="checkbox">
              <input type="checkbox" id="remember-me"/>
              <label htmlFor="remember-me">Remember me</label>
            </div>
            <div className="pass-link">
              <a href="/signup">Need an Account?</a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
