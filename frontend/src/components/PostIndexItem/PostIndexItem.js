import './PostIndexItem.css';
import { fetchPosts} from '../../store/post';
import {ShoppingCartOutlined} from "@ant-design/icons"
import _, { set } from "lodash"
import { useLocation } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import { addLike, removeLike } from '../../store/post';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import unLikeImg from '../../assets/red_heart.png'
import likeImg from '../../assets/white_heart.png'

const PostIndexItem = ({ post, key1 }) => {
    const currentUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const userId = useSelector(state => state.session.user._id)
    const navigate = useNavigate()
    const [likeCount, setlikeCount] = useState(post.likes.length)
    const location = useLocation();
    const query = location.search;
    const [isLiked, setIsLiked] = useState(post.likes.map(like => like.user).includes(userId.toString()) || true)
    const convertDate = (date) => {
        const d = new Date(date);
        return d.toDateString();
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

    const handlePostImageClick = (postId) => (e) => {
        e.stopPropagation();
        navigate(`/item/${postId}`, { state: { post, postId } });
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
                <button className='buttonLinkImages' onClick={handlePostImageClick(post._id)}>
                    <img className='postImages' loading='lazy' src={post.imageUrls[0]} alt='post-image'/>
                    <button className='likesButton' onClick={sendLike}>
                        {!isLiked ? <img id="liked" src={unLikeImg} /> : <img id="liked" src={likeImg} /> }
                    </button>
                </button>
                </div>
            </div>
            <h1 className='post-body-text'>{post.body}</h1>
            <div id="thumbAndText">
                <p id ="receiptTitle">From: ${post.price}</p>
                {/* <p className='likesNum' >{post.likes.length} </p> */}
            </div>
        </li>
        </>
    )
}


export default PostIndexItem;
