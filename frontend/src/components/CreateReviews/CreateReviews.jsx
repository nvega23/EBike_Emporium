import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, igate, useParams } from 'react-router-dom'
import { clearReviewErrors, composeReview } from '../../store/review'

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
    // return () => {
      dispatch(clearReviewErrors());
    //};
  }, [dispatch]);


  return (
    <>

        <div>Create Review</div>


        <form  className = "review-form" onSubmit={handleClick}>

            <div className='review-inputs'>


                <div className='inner-div'>
                <div className="errors">{errors?.title}</div>
                <input
                className='review-style-inputs'
                type="text"
                value={title}
                onChange={(e)=> setTitle(e.target.value)}
                placeholder= "title"
                />
                      <label> Title </label>
                  </div>

                <div className="errors">{errors?.body}</div>
                <input
                    className='review-style-inputs'
                    type="text"
                    value={body}
                    onChange={(e)=> setBody(e.target.value)}
                    placeholder="body"
                    id='review-body'
                />
                  <label> Body </label>


                 <div className="errors">{errors?.rating}</div>
                <input
                    type="text"
                    className='review-style-inputs'
                    value={rating}
                    onChange={(e)=> setRating(e.target.value)}
                    placeholder="rating"
                    required
                />
                  <label> Rating </label>


              <input type='submit'
                    className='review-style-inputs'
                  value="Review"
                  disabled={!body || !title || !rating}
              />

              </div>

        </form>
    </>
  )
}

export default CreateReviews
