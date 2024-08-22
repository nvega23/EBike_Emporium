import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchUserPosts, deletePost } from '../../store/post';
import { fetchUserProfile } from '../../store/profile';
import { fetchUsersReview } from '../../store/review';
import PostIndexItem from '../PostIndexItem/PostIndexItem';
import ReviewIndexItem from '../ReviewIndexItem/ReviewIndexItem';
import './Profile.css';

function Profile({ key1 }) {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const currentProfileUser = useSelector(state => state?.profile?.[userId]);
  const posts = Object.values(useSelector(state => state?.post || {}));
  const reviews = Object.values(useSelector(state => state?.review || {}));
  const [contentState, setContentState] = useState('reviews');
  const [likedPosts, setLikedPosts] = useState([]);

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserProfile(userId));
      dispatch(fetchUserPosts(userId));
      dispatch(fetchUsersReview(userId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    const likedPostsFromStorage = JSON.parse(localStorage.getItem('likedPosts')) || [];
    const userLikedPosts = posts.filter(post => likedPostsFromStorage.includes(post._id));
    if (JSON.stringify(userLikedPosts) !== JSON.stringify(likedPosts)) {
      setLikedPosts(userLikedPosts);
    }
  }, [posts]);
  

  const handleClick = (post) => {
    if (post && post._id) {
      dispatch(deletePost(post._id, key1));
    }
  };

  const editDeleteButton = (post) => {
    if (!currentProfileUser || !post || !post.author) {
      return null;
    }

    if (currentProfileUser._id === post.author._id) {
      return (
        <div>
          <button onClick={() => handleClick(post)} className="EditDeleteButton">Delete</button>
        </div>
      );
    }

    return null;
  };

  const capitalizedUsername = currentProfileUser?.username
    ? currentProfileUser.username.charAt(0).toUpperCase() + currentProfileUser.username.slice(1).toLowerCase()
    : '';

  let profileContent;
  if (contentState === 'posts') {
    const userPosts = posts.filter(post => post.author._id === userId);
    profileContent = (
      <div className='profileContainer'>
        <h1 id="ProfilePostsTitle">{userPosts.length ? '' : <h1 className='noPosts'>This user does not have any posts</h1>}</h1>
        <div className='profilePostsProfilePage'>
          {userPosts.map((post, i) => (
            <div className="containerAroundUserPosts" key={`container-${i}`}>
              <React.Fragment key={`post-fragment-${i}`}>
                <div className='editDeleteButtonProfilePage'>
                  {editDeleteButton(post)}
                </div>
                <div className='PostIndexItemProfilePage'>
                  <PostIndexItem key={`post-${i}`} post={post} />
                </div>
              </React.Fragment>
            </div>
          ))}
        </div>
      </div>
    );
  } else if (contentState === 'reviews') {
    profileContent = (
      <div className='profileContainerReviews'>
        <h1 id="ProfilePostsTitle">{reviews.length ? '' : <h1 className='reviewText'>This user does not have any reviews</h1>}</h1>
        <div className='reviewDivs'>
          {reviews.map((review, i) => review.rating ? (
            <ReviewIndexItem key={`review-${i}`} review={review} />
          ) : null)}
        </div>
      </div>
    );
  } else if (contentState === 'likedPosts') {
    profileContent = (
      <div className='profileContainer'>
        <h1 id="ProfilePostsTitle">{likedPosts.length ? '' : <h1 className="noLikes">This user hasn't liked any posts yet</h1>}</h1>
        <div className='profilePostsProfilePage'>
          {likedPosts.map((post, i) => (
            <div className="containerAroundUserPosts" key={`container-liked-${i}`}>
              <React.Fragment key={`liked-post-fragment-${i}`}>
                <div className='PostIndexItemProfilePage'>
                  <PostIndexItem key={`liked-post-${i}`} post={post} />
                </div>
              </React.Fragment>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div id="outer">
      <div className='profileNameContainer'>
        <h1 id="ProfileUsername">{capitalizedUsername}</h1>
        <div id='user-button-group'>
          <div id='divAroundReviewButton' className='user-button-group-button' onClick={() => setContentState('reviews')}>Reviews</div>
          <div className='user-button-group-button' onClick={() => setContentState('posts')}>Posts</div>
          <div className='user-button-group-button' onClick={() => setContentState('likedPosts')}>Liked Posts</div>
        </div>
        {profileContent}
      </div>
    </div>
  );
}

export default Profile;
