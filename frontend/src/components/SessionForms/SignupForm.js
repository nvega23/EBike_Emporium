import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IoIosCheckmarkCircle } from  "react-icons/io"
import { RiCheckboxBlankCircleLine } from "react-icons/ri"
import { signup, clearSessionErrors } from '../../store/session';
import './SessionForm.css';

function SignupForm () {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmedPassword] = useState('');
  const errors = useSelector(state => state.errors.session);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);

  const passwordRequirements = () => {
    if (password.length > 0) {
        return (
            <div id="Password-Requirements">
                {passwordLengthReq()}
                {passwordMatchReq()}
            </div>
        )
    }
  }

  const passwordMatchReq = () => {
    if (password === confirmPassword) {
        return (<span className="green"><div className="Pass-Req-Icon-Container"><IoIosCheckmarkCircle style={{fontSize: '14px'}} /></div>Passwords must match</span>)
    } else {
        return (<span className="red"><div className="Pass-Req-Icon-Container"><RiCheckboxBlankCircleLine style={{ fontSize: '13px' }} /></div>Passwords must match</span>)
    }
  }

  const passwordLengthReq = () => {
    if (password.length >= 6) {
        return (<span className="green"><div className="Pass-Req-Icon-Container"><IoIosCheckmarkCircle style={{ fontSize: '14px' }} /></div>Password must be at least 6 characters</span>)
    }else{
        return (<span className="red"><div className="Pass-Req-Icon-Container"><RiCheckboxBlankCircleLine style={{ fontSize: '13px' }} /></div>Password must be at least 6 characters</span>)
    }
  }

  const update = field => {
    let setState;

    switch (field) {
      case 'email':
        setState = setEmail;
        break;
      case 'username':
        setState = setUsername;
        break;
      case 'password':
        setState = setPassword;
        break;
      case 'confirmPassword':
        setState = setConfirmedPassword;
        break;
      default:
        throw Error('Unknown field in Signup Form');
    }

    return e => setState(e.currentTarget.value);
  }

  const usernameSubmit = e => {
    e.preventDefault();
    const user = {
      email,
      username,
      password
    };

    dispatch(signup(user));
  }

  return (
    <>
    <div className='outer'>
    <div className="wrapper">

      <div class="title">
            Sign up
      </div>
        <form action='#' onSubmit={usernameSubmit}>
          {/* <h2>Sign Up Form</h2> */}
          <div className="errors">{errors?.email}</div>
          <label>
            {/* <span>Email</span> */}
            <input type="text"
              value={email}
              onChange={update('email')}
              placeholder="Email"
              className='field'
              />
          </label>
          <div className="errors">{errors?.username}</div>
          <label>
            {/* <span>Username</span> */}
            <input type="text"
              value={username}
              onChange={update('username')}
              placeholder="Username"
              className='field'
              />
          </label>
          <div className="errors">{errors?.password}</div>
          <label>
            {/* <span>Password</span> */}
            <input type="password"
              value={password}
              onChange={update('password')}
              placeholder="Password"
              className='field'
              />
          </label>
          <div className="errors">
            {password !== confirmPassword && 'Confirm Password field must match'}
          </div>
          <label>
            {/* <span>Confirm Password</span> */}
            <input type="password"
              value={confirmPassword}
              onChange={update('confirmPassword')}
              placeholder="Confirm Password"
              className='field'
              />
          </label>
          <br/>
          <input
            type="submit"
            value="Sign Up"
            className='buttonField'
            disabled={!email || !username || !password || password !== confirmPassword}
            />
        </form>
        </div>
      </div>
    </>
  );
}

export default SignupForm;
