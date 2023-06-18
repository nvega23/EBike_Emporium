import { deletePost, fetchPosts} from '../../store/post';
import { NavLink } from "react-router-dom";

import {ShoppingCartOutlined} from "@ant-design/icons"
import _, { set } from "lodash"


import { useLocation } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import { addLike, removeLike } from '../../store/post';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
// import io from 'socket.io-client'

// const socket = io.connect("http://localhost:5000")


const PostIndexItem = ({ post, key1, updateSidebarContent }) => {

    const currentUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const userId = useSelector(state => state.session.user._id)
    const navigate = useNavigate()
    const [likeCount, setlikeCount] = useState(post.likes.length)


    const location = useLocation();
    const query = location.search;

    //const [isLiked, setIsLiked] = useState(false)

   //add websockets






    const [isLiked, setIsLiked] = useState(post.likes.map(like => like.user).includes(userId.toString()) || true)
   // const {cart} = useSelector((state) => ({...state}));



    const convertDate = (date) => {
        const d = new Date(date);
        return d.toDateString();
    }

    const handleClick = (post) => {
        dispatch(deletePost(post._id, key1))
    }

    const editDeleteButton = (post) => {
        if (currentUser._id === post.author._id){
            return(
                <>
                <div>
                    {/* <NavLink to ={{pathname: `/${post._id}/edit`}}><button className="EditDeleteButton">Edit</button></NavLink> */}
                    <button onClick={()=> handleClick(post)} className="EditDeleteButton">Delete</button>
                </div>
                </>
            )
        }
    }

    const sendLike = (e) => {
        e.preventDefault();
        // if (post.likes.map(like => like.user).includes(userId.toString())){
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



    const handleAddToCart = () => {
        let quantityChange = false
        let cart = []
        if (typeof window !== 'undefined') {
            if (localStorage.getItem('cart')){
                cart = JSON.parse(localStorage.getItem('cart'))
            }

            const postNew = post
            cart.forEach(food => {

                if (food.post._id == post._id){
                    quantityChange = true

                    food.quantity += 1
                }

            });
            // debugger
            // const quantity = quantityChange

            if(!quantityChange){

                cart.push({
                    post,
                    quantity: 1
                });

            }
            // let unique = _.uniqWith(cart, _.isEqual)
            localStorage.setItem('cart', JSON.stringify(cart));

            dispatch({
                type: "ADD_TO_CART",
                payload: cart,
            })
        }
    }






        let p = post.price


    return (

        <li className='post-container'>
            <div className='post-main-content'>


            <div id="titleandEdit">
                <span className='post-info-span'>
                    <Link to={`/profile/${post.author._id}`} id="profileLink">{post.author.username}</Link>
                    - {convertDate(post.createdAt)}</span>


                <p id ="receiptTitle">{post.reciepeName}</p>
                {editDeleteButton(post)}
             </div>
                <p className='post-body-text'>{post.body}</p>
                    <img className='images' loading='lazy' src={post.imageUrls[0]}></img>

            </div>



            <div id="thumbAndText">

                    <button onClick={e => navigate(`/review/new/${post._id}/${post.author._id}`)} className="reviewButton">Review</button>
                    {/* <button className='likesButton' onClick={e => post.likes.map(user => user.user).includes(userId.toString()) ? (dispatch(removeLike(post._id))): (dispatch(addLike(post._id)))}>
                        {post.likes.map(user => user.user).includes(userId.toString()) ? <i className="fa-regular fa-thumbs-down"></i>  : <i className="fa-regular fa-thumbs-up"></i> }
                    </button> */}


                <button className='likesButton' onClick={sendLike}>
                    {post.likes.map(user => user.user).includes(userId.toString()) ? <div id="liked"><i className="fa-regular fa-thumbs-up"></i></div> : <i className="fa-regular fa-thumbs-up"></i>}
                </button>




                {/* <button className='likesButton' onClick={e => post.likes.map(user => user.user).includes(userId.toString()) ? (dispatch(removeLike(post._id)))  : console.log("nothing") }>
                     <i className="fa-regular fa-thumbs-down"></i>
                </button>


                <button className='likesButton' onClick={e => !(post.likes.map(user => user.user).includes(userId.toString())) ? (dispatch(addLike(post._id))): console.log("no add")}>
                     <i className="fa-regular fa-thumbs-up"></i>
                </button> */}







                <div id="likesNumandText">
                    <p className='likesNum' >{post.likes.length} </p>
                    <p className='likesText'>Likes</p>
                </div>

            </div>

            {/* <div className='sidebar-toggle' onClick={()=>updateSidebarContent(post.body)}>
                Toggle Sidebar
            </div> */}


            {/* <a onClick={handleAddToCart} className='Add-to-cart'>
            <ShoppingCartOutlined className='Add-to-cart1'/>Add to Cart
            </a> */}
             <div className='price-Addtocart'>
                <p>Price: {p === "undefined" ? "N/A" : `$${post.price}`}</p>

                {post.price === "undefined" ? "": <a onClick={handleAddToCart} className='Add-to-cart'>
                <ShoppingCartOutlined className='Add-to-cart1'/>Add to Cart</a>}
            </div>




        </li>

    )
}


export default PostIndexItem;
