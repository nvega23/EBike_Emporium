import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { NavLink } from "react-router-dom";
import { logout } from '../../store/session';
import './NavBar.css';
import { Badge } from 'antd';
import SearchBar from '../SearchBar.js/SearchBar';
import myImage from '../../assets/bike_icon.png';
import myImageHome from '../../assets/home_icon.png';
import myImageSell from '../../assets/sellIcon.png';
import myImageProfile from '../../assets/windows_profile_pic.png';
import myImageCart from '../../assets/cart.png';

function NavBar() {
    // const [isActive, setIsActive] = useState(false)
    const navigate = useNavigate();
    const loggedIn = useSelector(state => !!state.session.user)
    const {cart} = useSelector(state => ({...state}))
    const dispatch = useDispatch()
    const [showMenu, setShowMenu] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const currentUserId = useSelector(state=> state.session.user?._id)

    // const handleClick = () => {
    //    setIsActive(!isActive);
    // };

    const logoutUser = (e) => {
        e.preventDefault()
        dispatch(logout())
        navigate('/')
    }

    useEffect(() => {
        const handleScroll = () => {
          if (window.pageYOffset > 0) {
            setIsScrolled(true);
          } else {
            setIsScrolled(false);
          }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    let navbar;

    if(loggedIn) {
        navbar=(
            <>
        <div
          id="navMenu"
          className={`${showMenu ? 'active' : ''} ${
            isScrolled ? 'scrolled' : ''
          }`}
          onClick={toggleMenu}
        >
                <span></span>
                <span></span>
                <span></span>
            </div>
            {showMenu && (
                <div className={`menu ${showMenu ? 'active' : ''}`}>
                <div className='links-nav'>

                <Link to={'/posts'} className="rightNav"><img className='dropDownImage' src={myImageHome}/></Link>
                <Link to={`/profile/${currentUserId}`} className="rightNav"><img className='dropDownImage' src={myImageProfile}/></Link>
                <Link to={'/posts/new'} className="rightNav"><img className='dropDownImage' src={myImageSell}/></Link>

                <Link to="/cart" className="rightNav">
                    <Badge count={cart.length} offset={[9, 0]} className="rightNav">
                        <img className='dropDownImage' src={myImageCart}/>
                    </Badge>
                </Link>
                <button onClick={logoutUser} id="logoutButton">Logout</button>
                </div>
                </div>
            )}
            </>
            )
         } else {
            navbar=(
                <div id='navMenu' className={showMenu ? 'active' : ''} onClick={toggleMenu}>
                <span></span>
                <span></span>
                <span></span>
                {showMenu && (
                    <div className={`menu ${showMenu ? 'active' : ''}`}>
                        <Link to={'/login'} className="rightNav">
                            <i className="fas fa-regular fa-right-to-bracket">Login</i>
                        </Link>
                        <Link to={'/signup'} className="rightNav">
                            <i className="fas fa-regular fa-user-plus">Signup</i>
                        </Link>
                    </div>
                )}
            </div>
            )
         }

    return (
        <>
            <div id="navbarOuter">
                <NavLink exact to="/" id="title">
                    <img className='content' src={myImage} alt='bike'/>
                </NavLink>
                <SearchBar/>
                {navbar}
            </div>
        </>
    )
}

export default NavBar
