import React, { useState, useEffect } from 'react';
import myImage from '../assets/bike_icon.png';
import { Link } from 'react-router-dom';
import './navbar.css';

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
