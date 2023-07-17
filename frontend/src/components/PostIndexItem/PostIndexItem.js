import './PostIndexItem.css';
import { fetchPosts} from '../../store/post';
import {ShoppingCartOutlined} from "@ant-design/icons"
import _, { set } from "lodash"
import { useLocation } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import { addLike, removeLike } from '../../store/post';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import unLikeImg from '../../assets/red_heart.png'
import likeImg from '../../assets/white_heart.png'
import Item from '../ItemDescription/Item'

const PostIndexItem = ({ post, key1 }) => {
    const currentUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const userId = useSelector(state => state.session.user._id)
    const navigate = useNavigate()
    const [likeCount, setlikeCount] = useState(post.likes.length)
    const location = useLocation();
    const query = location.search;
    // const [isLiked, setIsLiked] = useState(post.likes.map(like => like.user).includes(userId.toString()) || true)
    // const [isLiked, setIsLiked] = useState(false)

      // Retrieve like status from local storage or default to false
  const [isLiked, setIsLiked] = useState(() => {
    const storedLikedPosts = localStorage.getItem('likedPosts');
    if (storedLikedPosts) {
      const likedPosts = JSON.parse(storedLikedPosts);
      return likedPosts.includes(post._id);
    }
    return false;
  });

  useEffect(() => {
    // Update local storage when like status changes
    const storedLikedPosts = localStorage.getItem('likedPosts');
    let likedPosts = [];
    if (storedLikedPosts) {
      likedPosts = JSON.parse(storedLikedPosts);
    }

    if (isLiked) {
      likedPosts.push(post._id);
    } else {
      const index = likedPosts.indexOf(post._id);
      if (index > -1) {
        likedPosts.splice(index, 1);
      }
    }

    localStorage.setItem('likedPosts', JSON.stringify(likedPosts));
  }, [isLiked]);

    const convertDate = (date) => {
        const d = new Date(date);
        return d.toDateString();
    }


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

    const sendLike = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (isLiked) {
            setIsLiked(false)
            dispatch(removeLike(post._id))
        } else {
            setIsLiked(true)
            dispatch(addLike(post._id))
        }
        return dispatch(fetchPosts({ query }))
    }
    const {cart} = useSelector((state) => ({...state}));

    // const handlePostImageClick = () => {
    //     navigate(`/item/${post._id}`, { state: { post, postId: post._id } });
    // };

    const handlePostImageClick = () => (e) => {
        e.stopPropagation();
        navigate(`/item/${post._id}`)
        // navigate(`/item/${post._id}`, { state: { post, postId: post._id } });
    };

    let p = post.price
    return (
        <>
        <li className='post-container'>
            <div className='post-main-content'>
            <div id="titleandEdit">
                <span className='post-info-span'>
                </span>
             </div>
             <div className='divAroundImgLike'>
             <button className='buttonLinkImages' onClick={handlePostImageClick}>
                <img className='postImages' loading='lazy' src={post.imageUrls[0]} alt='post-image'/>
                <button className='likesButton' onClick={sendLike}>
                    {isLiked ? <img id="liked" src={unLikeImg} /> : <img id="liked" src={likeImg} /> }
                </button>
            </button>

            {/* {location.pathname !== `/item/${post._id}` && (
            )} */}
            {/* {location.pathname !== `/item/${post._id}` ?
                <Item post={post} postId={post._id} /> :
                console.log("not working")
            } */}
</div>
            </div>
            {/* <Item post={post} postId={post._id}/> */}
            <h1 className='post-body-text'>{post.body}</h1>
            <div id="thumbAndText">
                <p id ="receiptTitle">From: ${post.price}</p>
                {/* <p className='likesNum' >{post.likes.length} </p> */}
            </div>
            {/* <div className="divAroundCartReview">
                  {post?.price === "undefined" ? "": <a onClick={handleAddToCart} className='addToCart'>
                  <ShoppingCartOutlined className='addToCartButton'/>Add to Cartsss</a>}
                  <br/>
                  <button onClick={e => navigate(`/review/new/${post?._id}/${post?.author._id}`)} className="reviewButton">Leave a Review</button>
              </div> */}
        </li>
        </>
    )
}


export default PostIndexItem;
