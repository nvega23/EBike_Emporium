import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { deleteReview } from '../../store/review';
import { fetchUserProfile } from '../../store/profile';
import StarReview from './StarReview.js';
import './reviewIndexItem.css';

function ReviewIndexItem({ review, key }) {
  const currentUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); // Get current URL location
  const { userId } = useParams();

  const reviewer = useSelector((state) => {
    const profile = state.profile[review.reviewer];
    return profile ? profile.username : '';
  });

  const reviewee = useSelector((state) => {
    const profile = state.profile[review.reviewee];
    return profile ? profile.username : '';
  });

  const convertDate = (date) => {
    const d = new Date(date);
    return d.toDateString();
  };

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteReview(review.id, userId, userId));
    window.location.reload();
  };

  const handleClick = (e) => {
    e.preventDefault();
    navigate(`/review/update/${review.id}/${userId}`);
  };

  useEffect(() => {
    if (!reviewer) {
      dispatch(fetchUserProfile(review.reviewer));
    }
    if (!reviewee) {
      dispatch(fetchUserProfile(review.reviewee));
    }
  }, [dispatch, reviewer, review.reviewer, reviewee, review.reviewee]);

  // Check if the current URL matches the specific edit URL
  const isEditable = location.pathname === `/review/update/${review.id}/${userId}`;

  return (
    <div className='reviewContainer'>
      <div className='reviewContent'>
        <h1>{review.reviewer !== currentUser?.id ? <h1>{review?.reviewer.username}</h1> : <div></div>}</h1>
        <div className="containerAroundTimeStar">
          <h1>{review.title}</h1>
          <h5 className='reviewInfoSpan'>
            {convertDate(review.postedAt)}
          </h5>
          <h1 className='reviewTitle'>
            <StarReview rating={review.rating} editable={!isEditable} />
          </h1>
        </div>
        <div className='reviewBody'>
          {review?.imageUrls}
          {review.body}
        </div>
        <br/>
        <div className='divAroundReviewButton'>
          {review.reviewer === currentUser?._id ?  <button  className='reviewButtonDelete' onClick={handleDelete}>Delete</button> : <div></div> }
          {review.reviewer === currentUser?._id ? <button onClick={handleClick} className="reviewButtonEditDelete" >Edit</button> : <></>}
        </div>
      </div>
      <br />
    </div>
  );
}

export default ReviewIndexItem;
