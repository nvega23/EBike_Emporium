import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signup, clearSessionErrors } from '../../store/session';
import signUpBike from "../../assets/signUpBike.mp4";
import signUpBikeImage from "../../assets/folded.avif";
import './SessionForm.css';

function SignupForm() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearSessionErrors());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setGeneralError("");
    const user = {
      email,
      username,
      password
    };

    dispatch(signup(user)).then((action) => {
      if (!action.error) {
        console.log(action.error, 'I am the error')
        navigate('/posts');
      } else {
        if (action.error.response?.data?.errors) {
          const backendErrors = {};
          action.error.response.data.errors.forEach(error => {
            backendErrors[error.param] = error.msg;
          });
          setErrors(backendErrors);
          setGeneralError("There was a problem with your signup. Please correct the errors below.");
        } else {
          setGeneralError("An account with this email already exists!");
        }
      }
    }).catch((err) => {
      console.error("Signup failed:", err);
      setGeneralError("An unexpected error occurred. Please try again later.");
    });
  };

  return (
    <div id="outer">
      {/* <video autoPlay loop muted className="background-video" playbackRate={0.5}>
        <source src={signUpBike} />
      </video> */}
      <img src={signUpBikeImage} alt="Bike" className="background-image" />
      <div className="wrapper">
        <div className="title">
          Signup Form
        </div>
        <div className="outerBox">
          <form className='session-form' onSubmit={handleSubmit}>

            <div className='errors'>{errors.username}</div>
            <label className="custom-field">
              <input
                value={username}
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
                className='field'
              />
            </label>

            <div className='errors'>{errors.email}</div>
            <label className="custom-field">
              <input
                value={email}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                className='field'
              />
            </label>

            <div className='errors'>{errors.password}</div>
            <label className="custom-field">
              <input
                type="password"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                className='field'
              />
            </label>

            <div className='errors'>{password !== password2 && "Passwords must match"}</div>
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
            {generalError && <div className="general-error">{generalError}</div>}
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
