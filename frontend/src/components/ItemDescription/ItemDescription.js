import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './ItemDescription.css';
import { useNavigate, useParams } from "react-router";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { fetchPost } from "../../store/post";
import ReviewIndexItem from "../ReviewIndexItem/ReviewIndexItem";
import { Link } from "react-router-dom";

const ItemDescription = ({ post }) => {
  const { id } = useParams();
  const [isPurchased, setIsPurchased] = useState(false);
  const [quantity, setQuantity] = useState(1); // Track quantity
  const postUserId = post?.author?._id;
  const reviews = Object.values(useSelector(state => state.review));
  const specificReviews = reviews.filter(review => review.reviewer === postUserId);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const postPrice = post?.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  const totalPrice = post?.price ? (quantity * post.price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "0";

  useEffect(() => {
    if (id) {
      dispatch(fetchPost(id));
    }
  }, [dispatch, id]);

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
          item.quantity += quantity; // Adjust quantity
          setQuantity(item.quantity); // Update the quantity state
        }
      });
      if (!quantityChange) {
        cart.push({
          post,
          quantity: quantity // Use current quantity
        });
        setQuantity(quantity); // Initialize quantity
      }
      localStorage.setItem('cart', JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
      setIsPurchased(true); // Set the state to indicate the item has been purchased
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

  const handleAddMore = () => {
    handleAddToCart();
  };

  const usersProfilePage = () => {
    navigate(`/profile/${post?.author?._id}`);
  };

  if (!post) {
    return <h1 className="notWorking">Not working</h1>;
  }

  return (
    <div className="itemDescriptionContainer">
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
              <a onClick={handleAddToCart} className='addToCart'>
                <ShoppingCartOutlined className='addToCartButton' />
                Add to Cart
              </a>
            </>
          }
          <Link to="/cart" className="cartItemDescription">Go to Cart</Link>
          <br />
          <button onClick={() => navigate(`/review/new/${post?._id}/${post?.author._id}`)} className="reviewButton">Leave a Review</button>
        </div>
      </div>
      {/* <div>
        {specificReviews.length > 0 ? (
          specificReviews.map((review) => (
            <ReviewIndexItem key={review._id} review={review} />
          ))
        ) : (
          <h1>No reviews for this item yet, Be the first!</h1>
        )}
      </div> */}
    </div>
  );
};

export default ItemDescription;
