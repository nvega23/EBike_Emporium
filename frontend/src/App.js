import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import ProductGrid from './components/ImageCarousel';
import SplashPage from '../src/components/splashPage.js'
import './App.css'
import NavBar from './components/navbar';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToTop />
        <NavBar/>
        {/* <SplashPage/> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
