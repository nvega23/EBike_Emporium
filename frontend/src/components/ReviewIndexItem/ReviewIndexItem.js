import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteReview } from '../../store/review';

function ReviewIndexItem({review, key}) {
    const currentUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const navigate = useNavigate()
    // const reviewer = useSelector(state => Object.values(state.review))
    const { userId } = useParams()
    // const location = useLocation()

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

  return (
      <div className='post-container'>
          <div className='post-main-content'>
              <span className='post-info-span'>
                  {convertDate(review.postedAt)}</span>
              <br />
              <h1>{review.reviewer !== currentUser.id ? <h1>{review?.reviewer}</h1> : <div></div>}</h1>
              {/* the review ID is the ID from the user who made it.
              but i need to grab the reviewers name */}
              <h1 className='review-title'>{review.title}</h1>
              <div className='review-body'>Comment:<hr/>{review.body}</div>
              <br/>
              <div className='review-rating'>Rating: {review.rating}</div>
              <br/>
              <br/>
              {review.reviewer === currentUser._id ?  <button  className='reviewButton' onClick={handleDelete}>Delete</button> : <div></div> }
              {review.reviewer === currentUser._id ? <button onClick={handleClick} className="reviewButton" >edit</button> : <></>}
          </div>
          <br />
      </div>
  )
}

export default ReviewIndexItem
