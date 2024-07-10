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

  useEffect(() => {
    if (userId) {
    //   console.log(`Fetching profile for userId: ${userId}`);
      dispatch(fetchUserProfile(userId));
      dispatch(fetchUserPosts(userId));
      dispatch(fetchUsersReview(userId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    // console.log('currentProfileUser:', currentProfileUser);
  }, [currentProfileUser]);

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
    profileContent = (
      <div className='profileContainer'>
        <h1 id="ProfilePostsTitle">{posts.length ? '' : 'This user does not have any posts.'}</h1>
        <div className='profilePostsProfilePage'>
          {posts.map((post, i) => (
            <div className="containerAroundUserPosts">
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
  }
  return (
    <div id="outer">
      <div className='profileNameContainer'>
        <h1 id="ProfileUsername">{capitalizedUsername}</h1>
        <div id='user-button-group'>
          <div id='divAroundReviewButton' className='user-button-group-button' onClick={() => setContentState('reviews')}>Reviews</div>
          <div className='user-button-group-button' onClick={() => setContentState('posts')}>Posts</div>
        </div>
        {profileContent}
      </div>
    </div>
  );
}

export default Profile;
