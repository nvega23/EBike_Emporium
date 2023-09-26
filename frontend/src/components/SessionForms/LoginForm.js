import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BiHide, BiShow } from "react-icons/bi";
import bikeVideo from "../../assets/ebikeVid.mp4"
import './SessionForm.css';

import { login, clearSessionErrors } from '../../store/session';
import { useNavigate } from 'react-router';

function LoginForm () {
  const [email, setEmail] = useState('');
  const [documentTitle, setDocumentTitle] = useState("EcoBike Emporium - Log in or Sign up");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState('');
  const errors = useSelector(state => state.session.errors);
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
      document.title = documentTitle
    };
  }, [dispatch, documentTitle]);

  const update = (field) => {
    const setState = field === 'email' ? setEmail : setPassword;
    return e => setState(e.currentTarget.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }))
      .then(()=>{
        document.title = "EcoBike Emporium"
      })
    navigate("/posts");
  }

  const handleDemo =(e) => {
    e.preventDefault()
    dispatch(login({email:"demo@user.io", password: "password"}))
      .then(()=>{
        document.title = "EcoBike Emporium"
      })
    navigate("/posts");
  }

  return (
    <div id="outer">
      <video autoPlay loop muted className="background-video">
        <source src={bikeVideo} />
      </video>

    <div className="wrapper">
      <div className="title">
            Login Form
      </div>
      <form onSubmit={handleSubmit}>
        {/* <h2 className="title">Login</h2> */}

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
                <a href="/signup#/signup">Need an Account?</a>
              </div>
        </div>

      </form>
    </div>
  </div>
  );
}

export default LoginForm;
