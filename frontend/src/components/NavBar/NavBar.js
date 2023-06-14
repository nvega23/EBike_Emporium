import React, { useState, useEffect } from 'react';
import myImage from '../../assets/bike_icon.png';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsActive(false);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
        <div className='navBar'>
            <Link to="/" className='content'>
                <img src={myImage} alt="Bike Icon" />
            </Link>
            <div id='navMenu' className={isActive ? 'active' : ''} onClick={handleClick}>
                <span></span>
                <span></span>
                <span></span>
            </div>
            {isActive && (
                <div className="menu">
                    <Link to="/">Home</Link>
                    <Link to="/about">About</Link>
                    <Link to="/contact">Contact</Link>
                    {/* <Link to="/signup">signup</Link>
                    <Link to="/login">login</Link> */}
                </div>
            )}
        </div>
    </>
  );
};

export default NavBar;

// import { Link } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import './NavBar.css';
// import { logout } from '../../store/session';

// function NavBar () {
//   const loggedIn = useSelector(state => !!state.session.user);
//   const dispatch = useDispatch();

//   const logoutUser = e => {
//       e.preventDefault();
//       dispatch(logout());
//   }

//   const getLinks = () => {
//     if (loggedIn) {
//       return (
//         <div className="links-nav">
//           <Link to={'/product'}>All Tweets</Link>
//           <Link to={'/profile'}>Profile</Link>
//           <Link to={'/product/new'}>Write a Tweet</Link>
//           <button onClick={logoutUser}>Logout</button>
//         </div>
//       );
//     } else {
//       return (
//         <div className="links-auth">
//           <Link to={'/signup'}>Signup</Link>
//           <Link to={'/login'}>Login</Link>
//         </div>
//       );
//     }
//   }

//   return (
//     <>
//       <h1>Biker</h1>
//       { getLinks() }
//     </>
//   );
// }

// export default NavBar;
