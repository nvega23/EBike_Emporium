// import React, { useEffect } from 'react';
// import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
// import ProductGrid from './components/ImageCarousel';
// import SplashPage from '../src/components/splashPage.js'
// import './App.css'

// import NavBar from './components/NavBar/NavBar';
// // import { Switch } from 'react-router-dom';
// // import { AuthRoute, ProtectedRoute } from './components/Routes/routes';

// // import MainPage from './components/MainPage/MainPage';
// // import LoginForm from './components/SessionForms/LoginForm';
// // import SignupForm from './components/SessionForms/SignupForm';

// const ScrollToTop = () => {
//   const { pathname } = useLocation();
//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [pathname]);
//   return null;
// };

// function App() {
//   return (
//     <div className="App">
//       <BrowserRouter>
//         <ScrollToTop />
//         <NavBar/>
//         <Switch>
//           <AuthRoute exact path="/" component={MainPage} />
//           <AuthRoute exact path="/login" component={LoginForm} />
//           <AuthRoute exact path="/signup" component={SignupForm} />
//         </Switch>
//         {/* <SplashPage/> */}
//       </BrowserRouter>
//     </div>
//   );
// }

// export default App;
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Switch } from 'react-router-dom';

import { AuthRoute, ProtectedRoute } from './components/Routes/routes';
import NavBar from './components/NavBar/NavBar';

import MainPage from './components/MainPage/MainPage';
import LoginForm from './components/SessionForms/LoginForm';
import SignupForm from './components/SessionForms/SignupForm';
import Products from './components/Products/Product';
import Profile from './components/Profile/Profile';
import ProductCompose from './components/Products/ProductCompose';

import { getCurrentUser } from './store/session';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser()).then(() => setLoaded(true));
  }, [dispatch]);

  return loaded && (
    <>
      <NavBar />
      <Switch>
        <AuthRoute exact path="/" component={MainPage} />
        <AuthRoute exact path="/login" component={LoginForm} />
        <AuthRoute exact path="/signup" component={SignupForm} />

        <ProtectedRoute exact path="/products" component={Products} />
        <ProtectedRoute exact path="/profile" component={Profile} />
        <ProtectedRoute exact path="/product/new" component={ProductCompose} />
      </Switch>
    </>
  );
}

export default App;
