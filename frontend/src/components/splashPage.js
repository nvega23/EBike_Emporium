import React, { useEffect, useState } from 'react';
import ImageCarousel from './ImageCarousel'
import './splashPage.css'

const SplashPage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="splash-page">
      {loading ? (
        // <div className="loading-spinner">
        //   {/* Loading... */}
        // </div>
        <div className="container">
          <div className="content">

          </div>
          <div className="loading-spinner"></div>
        </div>
      ) : (
      <ImageCarousel/>
      )}
    </div>
  );
};

export default SplashPage;
