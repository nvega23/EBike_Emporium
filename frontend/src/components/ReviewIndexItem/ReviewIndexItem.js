import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteReview } from '../../store/review';
import { fetchUserProfile } from '../../store/profile';
import StarReview from './StarReview.js';

function ReviewIndexItem({review, key}) {
    const currentUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { userId } = useParams()
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
    }

    const handleDelete = (e) => {
        e.preventDefault()
        dispatch(deleteReview(review.id, userId, userId))
    }

    const handleClick = (e) => {
        e.preventDefault()
        navigate(`/review/update/${review.id}/${userId}`)
    }

    useEffect(() => {
        if (!reviewer) {
          dispatch(fetchUserProfile(review.reviewer));
        }
        if (!reviewee) {
          dispatch(fetchUserProfile(review.reviewee));
        }
      }, [dispatch, reviewer, review.reviewer, reviewee, review.reviewee]);

  return (
      <div className='post-container'>
          <div className='post-main-content'>
              <span className='post-info-span'>
                  {convertDate(review.postedAt)}
              </span>
              <br />
              <h1>{review.reviewer !== currentUser.id ? <h1>{review?.reviewer.username}</h1> : <div></div>}</h1>
              {/* <h1>{review.reviewee?.username}</h1> */}
              <h1 className='review-title'>
                <StarReview rating={review.rating} />
                {review.title}
              </h1>
              <div className='review-body'>
                <hr/>
                {review?.imageUrls}
                {review.body}
              </div>
              <br/>
              <div className='review-rating'>Rating: {review.rating}</div>
              <br/>
              <br/>
              <div className='divAroundReviewButton'>
                {review.reviewer === currentUser._id ?  <button  className='reviewButton' onClick={handleDelete}>Delete</button> : <div></div> }
                {review.reviewer === currentUser._id ? <button onClick={handleClick} className="reviewButton" >edit</button> : <></>}
              </div>
          </div>
          <br />
      </div>
  )
}

export default ReviewIndexItem
