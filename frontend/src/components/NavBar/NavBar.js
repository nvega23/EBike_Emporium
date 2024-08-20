import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { NavLink } from "react-router-dom";
import { logout } from '../../store/session';
import './NavBar.css';
import { Badge } from 'antd';
import SearchBar from '../SearchBar/SearchBar';
import myImageHome from '../../assets/home_icon.png';
import myImageSell from '../../assets/sellIcon.png';
import myImageProfile from '../../assets/windows_profile_pic.png';
import myImageCart from '../../assets/cart.png';
import image1 from '../../assets/gray_bike.png'; 
import image2 from '../../assets/white_bike.png';

function NavBar() {
  const [isActive, setIsActive] = useState(false);
  const [currentImage, setCurrentImage] = useState(image1);
  const navigate = useNavigate();
  const currentUser = useSelector(state => state.session.user);
  const loggedIn = useSelector(state => !!state.session.user);
  const cart = useSelector(state => state.cart);
  const currentUserId = useSelector(state => state.session.user?._id);
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };


  const logoutUser = (e) => {
    e.preventDefault();
    dispatch(logout());
    navigate('/');
    window.location.reload();
  };

  const handleOutsideClick = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setShowMenu(false);
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 0) {
        setIsScrolled(true);
        const spans = document.querySelectorAll('.menu-span');
        spans.forEach((span) => {
          span.classList.add('scrolled');
        });
        setCurrentImage(image2);
      } else {
        setIsScrolled(false);
        const spans = document.querySelectorAll('.menu-span');
        spans.forEach((span) => {
          span.classList.remove('scrolled');
        });
        setCurrentImage(image1);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  let navbar;

  if (loggedIn || currentUserId) {
    navbar = (
      <>
        <div
          id="navMenu"
          className={`${showMenu ? 'active' : ''} ${
            isScrolled ? 'scrolled' : ''
          }`}
          onClick={toggleMenu}
        >
          <span className='menu-span' id='span1'></span>
          <span className='menu-span' id='span2'></span>
          <span className='menu-span' id='span3'></span>
        </div>
        {showMenu && (
          <div className={`menu ${showMenu ? 'active' : ''}`} ref={menuRef}>
            <div className='links-nav'>
              <Link to={'/posts'} className="rightNav"><img className='dropDownImage' src={myImageHome} alt="Home" /></Link>
              <Link to={`/profile/${currentUserId}`} className="rightNav"><img className='dropDownImage' src={myImageProfile} alt="Profile" /></Link>
              <Link to={'/posts/new'} className="rightNav"><img className='dropDownImage' src={myImageSell} alt="Sell" /></Link>
              <Link to="/cart" className="rightNav">
                <Badge count={cart.length} offset={[9, 0]} className="rightNav">
                  <img className='dropDownImage' src={myImageCart} alt="Cart" />
                </Badge>
              </Link>
              <h1 className='loggedInAs'>Logged in as {currentUser?.username}</h1>
              <button onClick={logoutUser} id="logoutButton">Logout</button>
            </div>
          </div>
        )}
      </>
    );
  } else {
    navbar = (
      <div id='navMenuSession' className={showMenu ? 'active' : ''} onClick={toggleMenu}>
        <span className='menu-span' id='span1'></span>
        <span className='menu-span' id='span2'></span>
        <span className='menu-span' id='span3'></span>
        {showMenu && (
          <div className={`menuSession ${showMenu ? 'active' : ''}`} ref={menuRef}>
            <Link to={'/login'} className="rightNav">
              <i id='sessionNav' className="fas fa-regular fa-right-to-bracket">Login</i>
            </Link>
            <Link to={'/signup'} className="rightNav">
              <i id='sessionNav' className="fas fa-regular fa-user-plus">Signup</i>
            </Link>
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      <div id="navbarOuter">
        <NavLink to={loggedIn ? '/posts' : '/'} id="title">
          <img className='content' id='navBarImage' src={currentImage} alt='bike' />
        </NavLink>
        <SearchBar />
        {navbar}
      </div>
    {loggedIn ? 
      <button className="scrollToTopButton" onClick={handleScrollToTop}>
          Scroll to Top
      </button>
      :
      null
    }
    </>
  );
}

export default NavBar;
