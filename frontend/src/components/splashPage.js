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
        <div class="container">
          <div class="content">

          </div>
          <div class="loading-spinner"></div>
        </div>
      ) : (
      <ImageCarousel/>
      )}
    </div>
  );
};

export default SplashPage;
