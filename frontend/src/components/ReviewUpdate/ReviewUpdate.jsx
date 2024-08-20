import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { clearReviewErrors, fetchReview, updateReview } from '../../store/review';
import StarReview from '../ReviewIndexItem/StarReview'; // Import the StarReview component
import './ReviewUpdate.css';

function ReviewUpdate() {
    const { reviewId, userId } = useParams();
    const review = useSelector(state => state.review[reviewId] || {});
    const [title, setTitle] = useState(review.title || '');
    const [body, setBody] = useState(review.body || '');
    const [rating, setRating] = useState(review.rating || 0); // Initialize rating with default value
    const errors = useSelector(state => state.errors.review);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClick = (e) => {
        e.preventDefault();
        dispatch(updateReview(title, body, rating, reviewId));
        if (!errors) {
            navigate(`/profile/${userId}`);
        }
    };

    useEffect(() => {
        dispatch(fetchReview(reviewId));
    }, [dispatch, reviewId]);

    useEffect(() => {
        return () => {
            dispatch(clearReviewErrors());
        };
    }, [dispatch]);

    return (
        <div className='reviewUpdate'>
            <form className="reviewForm" onSubmit={handleClick}>
                <div className='reviewInputs'>
                    <div className="errors">{errors?.title}</div>
                    <input
                        className='reviewStyleInputs'
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Title"
                    />

                    <div className="errors">{errors?.body}</div>
                    <textarea
                        className='reviewStyleInputs'
                        type="text"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        placeholder="Body"
                        id='review-body'
                    />

                    <div className="errors">{errors?.rating}</div>
                    <div className="ratingInput">
                        <StarReview rating={rating} setRating={setRating} />
                    </div>

                    <input 
                        type='submit'
                        className='updateReviewButton'
                        value="Update!"
                        disabled={!body || !title || !rating}
                    />
                </div>
            </form>
        </div>
    );
}

export default ReviewUpdate;
