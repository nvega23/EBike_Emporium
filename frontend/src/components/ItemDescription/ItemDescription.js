import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import './ItemDescription.css';
import { useNavigate, useParams } from "react-router";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { fetchPost } from "../../store/post";
import ReviewIndexItem from "../ReviewIndexItem/ReviewIndexItem";

const ItemDescription = ({ post }) => {
  const { id } = useParams();
  const postUserId = post?.author?._id;
  const reviews = Object.values(useSelector(state => state.review));
  const specificReviews = reviews.filter(review => review.reviewer === postUserId);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const postPrice = post?.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

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
          item.quantity += 1;
        }
      });
      if (!quantityChange) {
        cart.push({
          post,
          quantity: 1
        });
      }
      localStorage.setItem('cart', JSON.stringify(cart));
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
            <a onClick={handleAddToCart} className='addToCart'>
              <ShoppingCartOutlined className='addToCartButton' />Add to Cart
            </a>
          }
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
