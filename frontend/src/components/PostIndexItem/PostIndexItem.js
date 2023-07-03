import './PostIndexItem.css';
import { deletePost} from '../../store/post';
import {ShoppingCartOutlined} from "@ant-design/icons"
// import _, { set } from "lodash"
// import { useLocation } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
// import { addLike, removeLike } from '../../store/post';
import { useDispatch, useSelector } from 'react-redux';
// import { useState } from 'react';
// import unLikeImg from '../../assets/red_heart.png'
// import likeImg from '../../assets/white_heart.png'

const PostIndexItem = ({ post, key1 }) => {
    const currentUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    // const userId = useSelector(state => state.session.user._id)
    const navigate = useNavigate()
    // const [likeCount, setlikeCount] = useState(post.likes.length)
    // const location = useLocation();
    // const query = location.search;
    // const [isLiked, setIsLiked] = useState(post.likes.map(like => like.user).includes(userId.toString()) || true)
    // const convertDate = (date) => {
    //     const d = new Date(date);
    //     return d.toDateString();
    // }

    const handleClick = (post) => {
        dispatch(deletePost(post._id, key1))
    }

    const editDeleteButton = (post) => {
        if (currentUser._id === post.author._id){
            return(
                <>
                <div>
                    <button onClick={()=> handleClick(post)} className="EditDeleteButton">Delete</button>
                </div>
                </>
            )
        }
    }
    // const sendLike = (e) => {
    //     e.preventDefault();
    //     if (isLiked) {
    //         setIsLiked(false)
    //         dispatch(removeLike(post._id))
    //     } else {
    //         setIsLiked(true)
    //         dispatch(addLike(post._id))
    //     }
    //     return dispatch(fetchPosts({ query }))
    // }
    // const {cart} = useSelector((state) => ({...state}));
    const handleAddToCart = () => {
        let quantityChange = false
        let cart = []
        if (typeof window !== 'undefined') {
            if (localStorage.getItem('cart')){
                cart = JSON.parse(localStorage.getItem('cart'))
            }
            // const postNew = post
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

    const handlePostImageClick = () => {
        navigate(`/item/${post._id}`, { state: { post, postId: post.id } });
        console.log(post, post._id, "I'm the post handler in postindexitem");
    };

    let p = post.price
    return (
        <>
        <li className='post-container'>
            <div className='post-main-content'>
            <div id="titleandEdit">
                <span className='post-info-span'>
                    {/* <Link to={`/profile/${post.author._id}`} id="profileLink">{post.author.username}</Link> */}
                    {/* - {convertDate(post.createdAt)} */}
                </span>
                {editDeleteButton(post)}
             </div>
                <div className='divAroundImgLike'>
                {/* <button className='likesButton' onClick={sendLike}>
                    {post.likes.map(user => user.user).includes(userId.toString()) ? <div id="liked"><img src={unLikeImg}/></div> : <div id="liked"><img src={likeImg}/></div>}
                </button> */}
                    {/* <Link to={`/profile/${post.author._id}`}> */}
                <button className='buttonLinkImages' onClick={handlePostImageClick}>
                    <img className='images' loading='lazy' src={post.imageUrls[0]} alt='post-image'/>
                </button>
                </div>
            </div>
            <h1 className='post-body-text'>{post.body}</h1>
            <div id="thumbAndText">
                <p id ="receiptTitle">{post.reciepeName}</p>

                {/* <div id="likesNumandText">
                    <p className='likesNum' >{post.likes.length} </p>
                    <p className='likesText'>Likes</p>
                </div> */}
            </div>
             <div className='price-Addtocart'>
                <p className='priceForItem'>Price: {p === "undefined" ? "N/A" : `$${post.price}`}</p>
                {post.price === "undefined" ? "": <a onClick={handleAddToCart} className='Add-to-cart'>
                <ShoppingCartOutlined className='Add-to-cart1'/>Add to Cart</a>}
                <button onClick={e => navigate(`/review/new/${post._id}/${post.author._id}`)} className="reviewButton">Leave a Review</button>
            </div>
        </li>
        </>
    )
}


export default PostIndexItem;
