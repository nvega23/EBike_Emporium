import {React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import './ItemDescription.css'
import { Link, useNavigate, useParams } from "react-router";
import { useLocation } from "react-router";
import {ShoppingCartOutlined} from "@ant-design/icons"
import { fetchPost } from "../../store/post";

const ItemDescription = () => {
  const location = useLocation();
  // const posts = useSelector(store => Object.values(store.post));
  const { id }  = useParams();
  const post = useSelector((state) => state.post[id]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const post = useSelector((state) => state.post.find((p) => p._id === id));
  console.log(post, id, 'im the new post')

  useEffect(() => {
    dispatch(fetchPost(id));
  }, [dispatch, id]);

  const handleAddToCart = () => {
    let quantityChange = false
    let cart = []
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')){
            cart = JSON.parse(localStorage.getItem('cart'))
        }
        cart.forEach(item => {
            if (item.post._id === post._id){
                quantityChange = true
                item.quantity += 1
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
    navigate(`/profile/${post?.author._id}`)
  }

  const handlePost = () => {
    if (id) {
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
                {post?.bikeName}
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
              <div className="divAroundCartReview">
                  {post?.price === "undefined" ? "": <a onClick={handleAddToCart} className='addToCart'>
                  <ShoppingCartOutlined className='addToCartButton'/>Add to Cart</a>}
                  <br/>
                  <button onClick={e => navigate(`/review/new/${post?._id}/${post?.author._id}`)} className="reviewButton">Leave a Review</button>
              </div>
            </div>
          </div>
        </>
        )
      }
    else{
      <>
        <h1 className="notWorking">Not working</h1>
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
