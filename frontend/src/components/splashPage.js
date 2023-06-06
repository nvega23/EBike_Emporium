import React, { useEffect, useState } from 'react';
import ImageCarousel from './ImageCarousel'
import './splashPage.css'

const SplashPage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="splash-page">
      {loading ? (
        <div className="loading-spinner">
          Loading...
        </div>
      ) : (
      <ImageCarousel/>
      )}
    </div>
  );
};

export default SplashPage;
