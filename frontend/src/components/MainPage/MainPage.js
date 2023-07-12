import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import './MainPage.css'

function MainPage() {
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
      setAnimate(true); // Add the animate class after the component mounts
    }, []);

    return (
        <>
            <div className={`mainpageContainer ${animate ? 'animate' : ''}`}>
                <div className='mainImage'></div>
                <div className='loginDiv'>
                    <h1 className='letsLog'>
                        Unlock Exclusive Access: Log in to Explore our Premium E-Bikes for Sale!
                    </h1>
                </div>
                <div className='rightTextPage'>
                    <h1>Ride the Future: Powering Your Pedals!</h1>
                    <br/>
                    <p className='smallText'>
                        At our e-bike store, we strive to provide you with an unparalleled experience
                        in electric mobility. With a passion for sustainability, adventure, and innovation,
                        we offer a carefully curated selection of top-quality e-bikes that are designed to
                        elevate your riding experience.
                    </p>
                </div>
                {/* <div className='login-something'>  <Link to="/login" className='login-links'> Login</Link></div>
                <div className='login-something'><Link to="/signup" className='login-links'>Sign Up</Link></div> */}
            </div>
        </>
    )
}

export default MainPage;
