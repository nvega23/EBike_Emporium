import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import './MainPage.css'

function MainPage() {
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
      setAnimate(true);
    }, []);

    return (
        <>
            <div className={`mainpageContainer ${animate ? 'animate' : ''}`}>
                <div className='mainImage'></div>
                <div className='loginDiv'>
                    <h1 className='letsLog'>
                        Unlock Exclusive Access: Log in to Explore our Premium E-Bikes for Sale!
                    </h1>
                    <br/>
                    <div className='loginSomething'>
                        <Link to="/login" className='loginLinks'>Login</Link>
                        <Link to="/signup" className='loginLinks'>Sign Up</Link>
                    </div>
                </div>
                <div className='rightTextPage'>
                </div>
            </div>
        </>
    )
}

export default MainPage;
