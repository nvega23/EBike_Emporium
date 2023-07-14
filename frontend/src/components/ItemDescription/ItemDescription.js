import {React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import './ItemDescription.css'
import { Link, useNavigate } from "react-router";
import {ShoppingCartOutlined} from "@ant-design/icons"
import { fetchPosts } from "../../store/post";

const ItemDescription = ({ post, postId }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const posts = useSelector(store => Object.values(store.post));

  useEffect(() => {
    fetchPosts(posts)
  }, []);

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
    const selectedPost = posts.find((post) => postId === postId);
    navigate(`/profile/${selectedPost?.author._id}`)
  }

  const handlePost = () => {
    const selectedPost = posts.find((post) => postId === postId);
    // const usersProfilePage = () => {
    //   navigate(`/profile/${selectedPost?.author._id}`)
    // }
    if (selectedPost) {
      return (
        <>
          <div className="itemDescriptionContainer">
            <div className="borderAroundImage">
              <img className='selectedPostImage' loading='lazy' src={selectedPost?.imageUrls[0]} alt='post-image'/>
            </div>
            <div className="selectedBody">
              <div className="containerAroundSelectedBody">

              <p className="selectedBodyText">
                  {selectedPost.body}
              </p>
              <br/>
              <br/>
              <p>
                {selectedPost.reciepeName}
              </p>
              <br/>
              <p className='priceForItem'>
                Price: {selectedPost === "undefined" ? "N/A" : `$${selectedPost?.price}`}
              </p>
              <br/>
              <div className="divAroundUsername">
                <p>
                  Sold by
                </p>
                <button onClick={usersProfilePage} className="userProfilePageButton">
                  {selectedPost?.author?.username}
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
    return null;
  };

  return (
    <div>
      <div className="handlePostFactor">{handlePost()}</div>
    </div>
  );
};

export default ItemDescription;
