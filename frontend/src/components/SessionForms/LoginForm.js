import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BiHide, BiShow } from "react-icons/bi";
import './SessionForm.css';

import { login, clearSessionErrors } from '../../store/session';
import { useNavigate } from 'react-router';

function LoginForm () {
  const [email, setEmail] = useState('');
  const navigate = useNavigate()
  const [password, setPassword] = useState('');
  const errors = useSelector(state => state.session.errors);
  const dispatch = useDispatch();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);

  const update = (field) => {
    const setState = field === 'email' ? setEmail : setPassword;
    return e => setState(e.currentTarget.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  }

  const handleDemo =(e) => {
    e.preventDefault()
    dispatch(login({email:"demo@user.io", password: "password"}))
    navigate("/posts");
  }

  return (
    <div id="outer">

    <div className="wrapper">
      <div className="title">
            Login Form
      </div>
      <form onSubmit={handleSubmit}>
        {/* <h2 className="title">Login</h2> */}

        <div className="errors">{errors?.email}</div>
        <label className="custom-field">
          <input type="email"
            value={email}
            onChange={update('email')}
            placeholder="Email"
            className="field"
            required/>
        </label>


        <div className="errors">{errors?.password}</div>

        <label className="custom-field">
          <input type={passwordVisible ? "text" : "password"}
            value={password}
            onChange={update('password')}
            placeholder="Password"
            className="field"
            required/>

        </label>
        <button className='toggleButton' onClick={togglePasswordVisibility}>
          {passwordVisible ? <BiHide /> : <BiShow />}
        </button>
        <div className="field">
        <input
          className="field"
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
