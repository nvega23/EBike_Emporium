// import React, { useState, useEffect } from 'react';
// import { Route, Routes, useLocation } from 'react-router-dom'
// import LoginForm from '../SessionForms/LoginForm';
// import SignupForm from '../SessionForms/SignupForm';
// import myImage from '../../assets/bike_icon.png';
// import { Link, useNavigate } from 'react-router-dom';
// import './NavBar.css';

// function NavBar() {
//   const [isActive, setIsActive] = useState(false);

//   const handleClick = () => {
//     setIsActive(!isActive);
//   };

//   const navigate = useNavigate();

//   const handleLoginClick = () => {
//     navigate('/login');
//   };

//   const handleSignupClick = () => {
//     navigate('/signup');
//   };

//   return (
//     <>
//       <div className='navBar'>
//         <Link to="/" className='content'>
//           <img src={myImage} alt="Bike Icon" />
//         </Link>
//         <div id='navMenu' className={isActive ? 'active' : ''} onClick={handleClick}>
//           <span></span>
//           <span></span>
//           <span></span>
//         </div>
//         {isActive && (
//           <div className="menu">
//             {/* <button onClick={handleLoginClick}>Login</button> */}
//             {/* <button onClick={handleSignupClick}>Sign Up</button> */}
//             <Link to="/">Home</Link>
//             <Link to="/about">About</Link>
//             <Link to="/contact">Contact</Link>
//           </div>
//         )}
//       </div>
//     </>
//   );
// }

// export default NavBar;

// // import { Link } from 'react-router-dom';
// // import { useSelector, useDispatch } from 'react-redux';
// // import './NavBar.css';
// // import { logout } from '../../store/session';

// // function NavBar () {
// //   const loggedIn = useSelector(state => !!state.session.user);
// //   const dispatch = useDispatch();

// //   const logoutUser = e => {
// //       e.preventDefault();
// //       dispatch(logout());
// //   }

// //   const getLinks = () => {
// //     if (loggedIn) {
// //       return (
// //         <div className="links-nav">
// //           <Link to={'/product'}>All Tweets</Link>
// //           <Link to={'/profile'}>Profile</Link>
// //           <Link to={'/product/new'}>Write a Tweet</Link>
// //           <button onClick={logoutUser}>Logout</button>
// //         </div>
// //       );
// //     } else {
// //       return (
// //         <div className="links-auth">
// //           <Link to={'/signup'}>Signup</Link>
// //           <Link to={'/login'}>Login</Link>
// //         </div>
// //       );
// //     }
// //   }

// //   return (
// //     <>
// //       <h1>Biker</h1>
// //       { getLinks() }
// //     </>
// //   );
// // }

// // export default NavBar;
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { NavLink } from "react-router-dom";
import { logout } from '../../store/session';
import './NavBar.css';
import { Badge } from 'antd';
import SearchBar from '../SearchBar.js/SearchBar';

function NavBar() {
    const [isActive, setIsActive] = useState(false);
    const loggedIn = useSelector(state => !!state.session.user)
    const {cart} = useSelector(state => ({...state}))
    const dispatch = useDispatch()

    const currentUserId = useSelector(state=> state.session.user?._id)

    const logoutUser = (e) => {
        e.preventDefault()
        dispatch(logout())
    }

    const handleClick = () => {
       setIsActive(!isActive);
    };

    let navbar;

    if(loggedIn) {
        navbar=(
            <>
                <div className='links-nav'>

               {/* <Link to={'/posts'} className="rightNav"><i className="fa-solid fa-images"></i></Link>
                <Link to={`/profile/${currentUserId}`} className="rightNav"><i className="fa-sharp fa-solid fa-user"></i></Link>
                <Link to={'/posts/new'} className="rightNav"><i className="fa-solid fa-camera-retro"></i></Link> */}

                <Link to={'/posts'} className="rightNav"><i className="fa-solid fa-images"></i></Link>
                <Link to={`/profile/${currentUserId}`} className="rightNav"><i className="fa-sharp fa-solid fa-user"></i></Link>
                <Link to={'/posts/new'} className="rightNav"><i className="fa-sharp fa-solid fa-square-plus"></i></Link>
                {/*  */}

                <Link to="/cart" className="rightNav">
                    <Badge count={cart.length} offset={[9, 0]} className="rightNav">
                    <i className="fa-solid fa-cart-shopping"></i>
                    </Badge>
                </Link>
                <button onClick={logoutUser} id="logoutButton">Logout</button>
                </div>
            </>
            )
         } else {
            navbar=(
                <div className='links-auth'>
                    <Link to={'/login'} className="rightNav">
                        <i className="fas fa-regular fa-right-to-bracket"></i>
                    </Link>
                    <Link to={'/signup'} className="rightNav">
                        <i className="fas fa-regular fa-user-plus"></i>
                    </Link>
                </div>
            )
         }

    return (
        <>
        <div id='navMenu' className={isActive ? 'active' : ''} onClick={handleClick}>
            <span></span>
            <span></span>
            <span></span>
        </div>
        <div id="navbarOuter">
            <NavLink exact to="/" id="title">
            </NavLink>
            <SearchBar/>
            {/* {navbar} */}

        </div>
        </>
    )
}

export default NavBar
