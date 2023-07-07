import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { clearReviewErrors, composeReview } from '../../store/review'
import './CreateReview.css'

function CreateReviews() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [rating, setRating] = useState('')
    const errors = useSelector(state => state.errors.review);
    const {postId, userId} = useParams()

    const handleClick = (e) => {
        e.preventDefault()

        dispatch(composeReview(title, body, rating, postId, userId))

        if(!errors){
          // setBody("")
          // setRating("")
          // setTitle("")
          console.log("none")
          // navigate.push('/posts')
        }
    }

  useEffect(() => {
      dispatch(clearReviewErrors());
  }, [dispatch]);


  return (
    <>
        {/* <div>Create Review</div> */}
        <form  className = "reviewForm" onSubmit={handleClick}>
            <div className='reviewInputs'>
                <div className="errors">{errors?.title}</div>
                <input
                  className='reviewStyleInputs'
                  type="text"
                  value={title}
                  onChange={(e)=> setTitle(e.target.value)}
                  placeholder= "title"
                  id='review-body'
                />

                <div className="errors">{errors?.body}</div>
                <input
                    className='reviewStyleInputs'
                    type="text"
                    value={body}
                    onChange={(e)=> setBody(e.target.value)}
                    placeholder="body"
                    id='review-body'
                />
                  {/* <label> Body </label> */}


                 <div className="errors">{errors?.rating}</div>
                <input
                    type="text"
                    className='reviewStyleInputs'
                    value={rating}
                    onChange={(e)=> setRating(e.target.value)}
                    placeholder="rating"
                    required
                />
                  {/* <label> Rating </label> */}


              <input type='submit'
                  className='createReviewButton'
                  value="Review"
                  disabled={!body || !title || !rating}
              />

              </div>

        </form>
    </>
  )
}

export default CreateReviews
