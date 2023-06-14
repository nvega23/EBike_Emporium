// import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
// import ProductGrid from './components/ImageCarousel';
// import SplashPage from '../src/components/splashPage.js'
// import './App.css'

// const ScrollToTop = () => {
//   const { pathname } = useLocation();
//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [pathname]);
//   return null;
// };

// import { useEffect, useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { Routes, Router } from 'react-router-dom';
// import { Provider } from 'react-redux';
// // import { BrowserRouter, Route } from 'react-router-dom';

// import { AuthRoute, ProtectedRoute } from './components/Routes/routes';
// import NavBar from './components/NavBar/NavBar';

// import MainPage from './components/MainPage/MainPage';
// import LoginForm from './components/SessionForms/LoginForm';
// import SignupForm from './components/SessionForms/SignupForm';
// import Products from './components/Products/Product';
// import Profile from './components/Profile/Profile';
// import ProductCompose from './components/Products/ProductCompose';
// import store from './store/store.js';

// import { getCurrentUser } from './store/session';

// function App() {
//   const [loaded, setLoaded] = useState(false);
//   const dispatch = useDispatch();
//   useEffect(() => {
//     dispatch(getCurrentUser()).then(() => setLoaded(true));
//   }, [dispatch]);

//   return loaded && (
//     <>
//     <Provider store={store}>
//       <NavBar />
//       <Router>
//       <Routes>
//         <AuthRoute exact path="/" component={MainPage} />
//         <AuthRoute exact path="/login" component={LoginForm} />
//         <AuthRoute exact path="/signup" component={SignupForm} />

//         <ProtectedRoute exact path="/products" component={Products} />
//         <ProtectedRoute exact path="/profile" component={Profile} />
//         <ProtectedRoute exact path="/products/new" component={ProductCompose} />
//       </Routes>
//       </Router>
//     </Provider>
//     </>
//   );
// }

// export default App;


import ProductGrid from './components/ImageCarousel';
import SplashPage from '../src/components/splashPage.js'
import './App.css'

import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom'

import { AuthRoute, ProtectedRoute } from './components/Routes/routes';
import NavBar from './components/NavBar/NavBar';

import MainPage from './components/MainPage/MainPage';
import LoginForm from './components/SessionForms/LoginForm';
import SignupForm from './components/SessionForms/SignupForm';
import Products from './components/Products/Product';
import Profile from './components/Profile/Profile';
import ProductCompose from './components/Products/ProductCompose';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// import { getCurrentUser } from './store/session';

function App() {

  return (
    <>
      <div>
        <NavBar />
        {/* <ProductGrid/>/ */}
        {/* <SplashPage/> */}
        <Routes>

          <Route exact path="/" element={<MainPage/>} />
          <Route exact path="/login" element={<LoginForm/>} />
          <Route exact path="/signup" element={<SignupForm/>} />

          <Route exact path="/products" element={<Products/>} />
          <Route exact path="/profile" element={<Profile/>} />
          <Route exact path="/products/new" element={<ProductCompose/>} />

        </Routes>
      </div>
    </>
  );
}

export default App;
