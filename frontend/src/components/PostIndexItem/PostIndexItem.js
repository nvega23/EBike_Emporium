import './PostIndexItem.css';
import { fetchPosts } from '../../store/post';
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { addLike, removeLike } from '../../store/post';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import unLikeImg from '../../assets/red_heart.png';
import likeImg from '../../assets/white_heart.png';

const PostIndexItem = ({ post, key1 }) => {
  const [animate, setAnimate] = useState(false);
  const currentUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const query = location.search;
  const [isRevealed, setIsRevealed] = useState(false);
  const containerRef = useRef(null);

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

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1,
    };

    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        setIsRevealed(true);
        observer.unobserve(entry.target);
      }
    }, options);

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [isLiked, post?._id]);

  const sendLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isLiked) {
      setIsLiked(false);
      dispatch(removeLike(post._id));
    } else {
      setIsLiked(true);
      dispatch(addLike(post._id));
    }
    return dispatch(fetchPosts({ query }));
  };

  const handlePostImageClick = (e) => {
    e.stopPropagation();
    setAnimate(true);
    navigate(`/item/${post._id}`, { state: { post, postId: post.id } });
  };

  const fallbackImage = 'path/to/fallback/image.jpg';

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
              <img
                className={`postImages ${animate && isRevealed ? 'animate__animated animate__slideInUp' : ''}`}
                loading='lazy'
                src={post?.imageUrls?.[0] || null}
                alt='post-image'
              />
              <button className='likesButton' onClick={sendLike}>
                {isLiked ? <img id="liked" src={unLikeImg} alt="Unlike" /> : <img id="liked" src={likeImg} alt="Like" />}
              </button>
            </Link>
          </div>
        </div>
        <h1 className='post-body-text'>{post?.body}</h1>
        <div id="thumbAndText">
          <p id="receiptTitle">From: ${post?.price}</p>
        </div>
      </li>
    </>
  );
};

export default PostIndexItem;
