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
    const location = useLocation();
    const query = location.search;

    const [isLiked, setIsLiked] = useState(() => {
        const storedLikedPosts = localStorage.getItem('likedPosts');
            if (storedLikedPosts) {
            const likedPosts = JSON.parse(storedLikedPosts);
            return likedPosts.includes(post?._id);
            }
        return false;
  });

  useEffect(() => {
    const storedLikedPosts = localStorage.getItem('likedPosts');
    let likedPosts = [];
    if (storedLikedPosts) {
      likedPosts = JSON.parse(storedLikedPosts);
    }

    if (isLiked) {
      likedPosts.push(post?._id);
    } else {
      const index = likedPosts.indexOf(post?._id);
      if (index > -1) {
        likedPosts.splice(index, 1);
      }
    }

    localStorage.setItem('likedPosts', JSON.stringify(likedPosts));
  }, [isLiked]);

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

    const handlePostImageClick = () => (e) => {
        e.stopPropagation();
        navigate(`/item/${post._id}`, { state: { post, postId: post.id } });
    };

    let p = post?.price
    return (
        <>
        <li className='post-container'>
            <div className='post-main-content'>
                <div id="titleandEdit">
                    <span className='post-info-span'>
                    </span>
                </div>
                <div className='divAroundImgLike'>
                    <Link to={`/item/${post?._id}`} className='buttonLinkImages' onClick={handlePostImageClick}>
                        <img className='postImages' loading='lazy' src={post?.imageUrls[0]} alt='post-image' />
                        <button className='likesButton' onClick={sendLike}>
                            {isLiked ? <img id="liked" src={unLikeImg} /> : <img id="liked" src={likeImg} />}
                        </button>
                    </Link>
                </div>
            </div>
            <h1 className='post-body-text'>{post?.body}</h1>
            <div id="thumbAndText">
                <p id ="receiptTitle">From: ${post?.price}</p>
            </div>
        </li>
        </>
    )
}


export default PostIndexItem;
