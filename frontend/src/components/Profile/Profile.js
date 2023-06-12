import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProducts, clearProductErrors } from '../../store/products';
import ProductBox from '../Products/ProductBox';

function Profile () {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.session.user);
  const userProducts = useSelector(state => Object.values(state.products.user))

  useEffect(() => {
    dispatch(fetchUserProducts(currentUser._id));
    return () => dispatch(clearProductErrors());
  }, [currentUser, dispatch]);

  if (userProducts.length === 0) {
    return <div>{currentUser.username} has no Products</div>;
  } else {
    return (
      <>
        <h2>All of {currentUser.username}'s Products</h2>
        {userProducts.map(tweet => (
          <ProductBox
            key={tweet._id}
            text={tweet.text}
          />
        ))}
      </>
    );
  }
}

export default Profile;
