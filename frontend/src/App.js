import { Route, Routes } from 'react-router-dom';
import PostIndex from './components/PostIndex/PostIndex';
import MainPage from './components/MainPage/MainPage';
import LoginForm from './components/SessionForms/LoginForm';
import SignupForm from './components/SessionForms/SignupForm';
import CreatePost from './components/CreatePost/CreatePost';
import CreateReview from './components/CreateReviews/CreateReviews';
import EditForm from './components/EditForm/EditForm';
import NavBar from './components/NavBar/NavBar';
import Profile from './components/Profile/Profile';
import { fetchCurrentUser } from './store/session';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Cart from './components/Cart/Cartitem';
import Checkout from './components/Cart/Checkout';
import ReviewIndexItem from './components/ReviewIndexItem/ReviewIndexItem';
import ReviewUpdate from './components/ReviewUpdate/ReviewUpdate';
import ItemDescription from './components/ItemDescription/ItemDescription';
import Item from './components/ItemDescription/Item';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrentUser()).then(() => setLoaded(true));
  }, [dispatch]);

  return loaded && (
    <>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<MainPage />} />
        <Route exact path="/login" element={<LoginForm />} />
        <Route exact path="/signup" element={<SignupForm />} />
        <Route exact path="/posts" element={<PostIndex />} />
        <Route exact path="/posts/new" element={<CreatePost />} />
        <Route exact path="/review/new/:postId/:userId" element={<CreateReview />} />
        <Route exact path="/:postId/edit" element={<EditForm />} />
        <Route exact path="/profile/:userId" element={<Profile />} />
        <Route exact path="/profile/:userId" element={<ReviewIndexItem />} />
        <Route exact path="/review/update/:reviewId/:userId" element={<ReviewUpdate />} />
        <Route exact path="/cart" element={<Cart />} />
        {/* <Route exact path="/item/:id" element={<ItemDescription />} /> */}
        <Route exact path="/item/:id" element={<Item />} />
      </Routes>
    </>
  );
}

export default App;
