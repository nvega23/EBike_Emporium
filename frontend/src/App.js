// import SplashPage from '../src/components/splashPage.js'
import { Route } from 'react-router-dom'
import PostIndex from './components/PostIndex/PostIndex';
import MainPage from './components/MainPage/MainPage'
import LoginForm from './components/SessionForms/LoginForm'
import SignupForm from './components/SessionForms/SignupForm'
import CreatePost from './components/CreatePost/CreatePost';

import CreateReview from './components/CreateReviews/CreateReviews';

import EditForm from './components/EditForm/EditForm';

import NavBar from './components/NavBar/NavBar'
import Profile from './components/Profile/Profile';
import { fetchCurrentUser } from './store/session';
import { useEffect, useState } from 'react';
import { Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Cart from './components/Cart/Cartitem';
import Checkout from './components/Cart/Checkout';
import ReviewIndexItem from './components/ReviewIndexItem/ReviewIndexItem';
import ItemDescription from './components/ItemDescription/ItemDescription';
import ReviewUpdate from './components/ReviewUpdate/ReviewUpdate';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const [loaded, setLoaded] = useState(false)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrentUser()).then(() => setLoaded(true))
  }, [dispatch])

  return loaded && (
    <>
    <ScrollToTop/>
    <NavBar />
    {/* <SplashPage/> */}
    <Routes>
      <Route exact path="/" element={<MainPage/>} />
      <Route exact path="/login" element={<LoginForm/>} />
      <Route exact path="/signup" element={<SignupForm/>} />
      <Route exact path="/posts" element={<PostIndex/>} />
      <Route exact path='/posts/new' element={<CreatePost/>} />
      <Route exact path='/review/new/:postId/:userId' element={<CreateReview/>} />
      <Route exact path='/:postId/edit' element={<EditForm/>} />
      <Route exact path="/profile/:userId" element={<Profile/>} />
      <Route exact path="/profile/:userId" element={<ReviewIndexItem/>} />
      <Route exact path='/review/update/:reviewId/:userId' element={<ReviewUpdate/>} />
      <Route exact path='/cart' element={<Cart/>} />
      <Route exact path='/item' element={<ItemDescription/>} />
      <Route exact path='/checkout' element={<Checkout/>} />
      {/* <ProtectedRoute exact path='/Message' component={Message} /> */}
    </Routes>
    </>
  );
}

export default App;
