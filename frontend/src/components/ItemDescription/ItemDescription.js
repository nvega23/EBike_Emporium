import {React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import './ItemDescription.css'
import { Link, useNavigate } from "react-router";
import {ShoppingCartOutlined} from "@ant-design/icons"
import { fetchPosts } from "../../store/post";

const ItemDescription = ({ post, postId }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const posts = useSelector(store => Object.values(store.post));
  // const post = useSelector((store) => store.post[postId]);

  useEffect(() => {
    dispatch(fetchPosts(postId));
  }, [dispatch, postId]);

  const handleAddToCart = () => {
    let quantityChange = false
    let cart = []
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')){
            cart = JSON.parse(localStorage.getItem('cart'))
        }
        cart.forEach(food => {
            if (food.post._id === post._id){
                quantityChange = true

                food.quantity += 1
            }
        });
        if(!quantityChange){
            cart.push({
                post,
                quantity: 1
            });

        }
        localStorage.setItem('cart', JSON.stringify(cart))
        dispatch({
            type: "ADD_TO_CART",
            payload: cart,
        })
    }
}

  const usersProfilePage = () => {
    // const selectedPost = posts.find((post) => postId === postId);
    // const selectedPost = post.find((p) => p._id === postId);
    navigate(`/profile/${post?.author._id}`)
  }

  const handlePost = () => {
    // const selectedPost = posts.find((post) => postId === postId);
    if (post) {
      return (
        <>
          <div className="itemDescriptionContainer">
            <div className="borderAroundImage">
              <img className='selectedPostImage' loading='lazy' src={post?.imageUrls[0]} alt='post-image'/>
            </div>
            <div className="selectedBody">
              <div className="containerAroundSelectedBody">

              <p className="selectedBodyText">
                  {post?.body}
              </p>
              <br/>
              <br/>
              <p>
                {post?.reciepeName}
              </p>
              <br/>
              <p className='priceForItem'>
                Price: {post === "undefined" ? "N/A" : `$${post?.price}`}
              </p>
              <br/>
              <div className="divAroundUsername">
                <p>
                  Sold by
                </p>
                <button onClick={usersProfilePage} className="userProfilePageButton">
                  {post?.author?.username}
                </button>
              </div>
              </div>
              {/* <div className="divAroundCartReview">
                  {selectedPost?.price === "undefined" ? "": <a onClick={handleAddToCart} className='addToCart'>
                  <ShoppingCartOutlined className='addToCartButton'/>Add to Cart</a>}
                  <br/>
                  <button onClick={e => navigate(`/review/new/${selectedPost?._id}/${selectedPost?.author._id}`)} className="reviewButton">Leave a Review</button>
              </div> */}
            </div>
          </div>
        </>
        )
      }
    else{
      <>
      <h1>Not working</h1>
      </>
    }
  };

  return (
    <div>
      <div className="handlePostFactor">{handlePost()}</div>
    </div>
  );
};

export default ItemDescription;
