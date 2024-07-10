import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signup, clearSessionErrors } from '../../store/session';
import signUpBike from "../../assets/signUpBike.mp4";
import './SessionForm.css';

function SignupForm() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const errors = useSelector(state => state.errors.session);

  useEffect(() => {
    dispatch(clearSessionErrors());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      email,
      username,
      password
    };
    dispatch(signup(user)).then((action) => {
      if (!action.error) {
        navigate('/posts');
      }
    });
  };

  return (
    <div id="outer">
      <video autoPlay loop muted className="background-video" playbackRate={0.5}>
        <source src={signUpBike} />
      </video>

      <div className="wrapper">
        <div className="title">
          Signup Form
        </div>
        <div className="outerBox">
          <form className='session-form' onSubmit={handleSubmit}>

            <div className='errors'>{errors?.username}</div>
            <label className="custom-field">
              <input
                value={username}
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
                className='field'
              />
            </label>

            <div className='errors'>{errors?.email}</div>
            <label className="custom-field">
              <input
                value={email}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                className='field'
              />
            </label>

            <div className='errors'>{errors?.password}</div>
            <label className="custom-field">
              <input
                type="password"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                className='field'
              />
            </label>

            <div className='errors'>{password !== password2 && "Confirm Password must match"}</div>
            <label className="custom-field">
              <input
                type="password"
                value={password2}
                placeholder="Confirm Password"
                onChange={(e) => setPassword2(e.target.value)}
                className='field'
              />
            </label>

            <input
              className="buttonField"
              type="submit"
              value="Sign Up"
              disabled={!email || !username || !password || password !== password2}
            />
            <div className="content">
              <div className="pass-link">
                <a href="/login">Have an account?</a>
              </div>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}

export default SignupForm;
