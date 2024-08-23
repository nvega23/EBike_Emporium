import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './ItemDescription.css';
import { useNavigate, useParams } from "react-router";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { fetchPost } from "../../store/post";
import { fetchPostReviews } from "../../store/review"; // Fetch reviews action
import ReviewIndexItem from "../ReviewIndexItem/ReviewIndexItem"; // Component to display individual reviews
import { Link } from "react-router-dom";

const ItemDescription = ({ post }) => {
  const { id } = useParams();
  const [isPurchased, setIsPurchased] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const postPrice = post?.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  const totalPrice = post?.price ? (quantity * post.price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "0";

  // Fetch the post details and its reviews when the component mounts
  useEffect(() => {
    if (id) {
      dispatch(fetchPost(id));
      dispatch(fetchPostReviews(id)); // Fetch reviews for the specific post
    }
  }, [dispatch, id]);

  // Get the reviews for the specific post from Redux store
  const reviews = useSelector((state) => Object.values(state.review).filter(review => review.post === id));

  useEffect(() => {
    if (typeof window !== 'undefined' && post) {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      const itemInCart = cart.find(item => item.post._id === post._id);
      if (itemInCart) {
        setIsPurchased(true);
        setQuantity(itemInCart.quantity);
      }
    }
  }, [post]);

  const handleAddToCart = () => {
    let quantityChange = false;
    let cart = [];
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
      }
      cart.forEach(item => {
        if (item.post._id === post._id) {
          quantityChange = true;
          item.quantity += 1;
          setQuantity(item.quantity);
        }
      });
      if (!quantityChange) {
        cart.push({
          post,
          quantity: quantity
        });
        setQuantity(quantity);
      }
      localStorage.setItem('cart', JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
      setIsPurchased(true); // Set purchased state to true
    }
  };

  const handleQuantityChange = (e) => {
    const newQuantity = e.target.value < 1 ? 1 : e.target.value;
    setQuantity(newQuantity);
    let cart = [];
    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      cart.forEach((item, i) => {
        if (item.post._id === post._id) {
          cart[i].quantity = newQuantity;
        }
      });
      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };

  const usersProfilePage = () => {
    navigate(`/profile/${post?.author?._id}`);
  };

  if (!post) {
    return <h1 className="notWorking">Not working</h1>;
  }

  return (
    <div className="itemDescriptionContainer">
      <div className="postItemContainer">

      <div className="borderAroundImage">
        <img className='selectedPostImage' loading='lazy' src={post?.imageUrls[0]} alt='post-image' />
      </div>
      <div className="selectedBody">
        <div className="containerAroundSelectedBody">
          <p className="selectedBodyText">
            {post?.body}
          </p>
          <br />
          <br />
          <p className="bikeBioItem">
            {post.reciepeName ? post.reciepeName : post.bikeName}
          </p>
          <br />
          <div className='priceForItem'>
            {post?.price !== undefined &&
              <h1 className="postPriceItem">
                ${postPrice}
              </h1>
            }
          </div>
          <br />
          <div className="totalPrice">
            <label className="quantityLabel">
              Quantity:
              <input
                className="quantityInput"
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
                />
            </label>
            <p>Total Price: ${totalPrice}</p>
          </div>
          <div className="divAroundUsername">
            <p>
              Sold by
            </p>
            <button onClick={usersProfilePage} className="userProfilePageButton">
              {post?.author?.username}
            </button>
          </div>
        </div>
        <div className="divAroundCartReview">
          {post?.price !== undefined &&
            <>
              {isPurchased ? (
                <Link to="/cart" className='checkoutButtonItemIcon'>
                  <ShoppingCartOutlined className='checkoutButtonItem' />
                  Checkout Now
                </Link>
              ) : (
                <a onClick={handleAddToCart} className='addToCart'>
                  <ShoppingCartOutlined className='addToCartButton' />
                  Add to Cart
                </a>
              )}
            </>
          }
          <button onClick={() => navigate(`/review/new/${post?._id}/${post?.author._id}`)} className="reviewButton">Leave a Review</button>
          <button onClick={()=> navigate('/posts')} className="backButtonItem">Back</button>
        </div>
      </div>
          </div>
      <div className="reviewsContainer">
        <h2>Customer Reviews</h2>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <ReviewIndexItem key={review._id} review={review} />
          ))
        ) : (
          <p className="itemNoReviews">No reviews yet for this item. Be the first to leave a review!</p>
        )}
      </div>
    </div>
  );
};

export default ItemDescription;
