import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { clearReviewErrors, composeReview } from '../../store/review';
import './CreateReview.css';
import StarReview from '../ReviewIndexItem/StarReview';

function CreateReviews() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [rating, setRating] = useState(0); // Changed default to 0
    const errors = useSelector(state => state.errors.review);
    const { postId, userId } = useParams();

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await dispatch(composeReview(title, body, rating, postId, userId));
            if (!errors) {
                console.log("Review submitted successfully");
            }
        } catch (error) {
            console.error("Error submitting review:", error);
        }
    };

    const handleBackToItem = () => {
        navigate(`/item/${postId}`);
    };

    useEffect(() => {
        dispatch(clearReviewErrors());
    }, [dispatch]);

    return (
        <>
            <form className="reviewForm" onSubmit={handleClick}>
                <div className='reviewInputs'>
                    <div className="errors">{errors?.title}</div>
                    <input
                        className='reviewStyleInputs'
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="title"
                        id='review-body'
                    />

                    <div className="errors">{errors?.body}</div>
                    <textarea
                        className='reviewStyleInputs'
                        type="text"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        placeholder="body"
                        id='review-body'
                    />

                    <div className="errors">{errors?.rating}</div>
                    <div className="ratingInput">
                        <StarReview rating={rating} setRating={setRating} />
                    </div>

                    <input
                        type='submit'
                        className='createReviewButton'
                        value="Review"
                        disabled={!body || !title || !rating}
                    />
                </div>
            </form>
            <button className="backToItemButton" onClick={handleBackToItem}>
                Back to Item
            </button>
        </>
    );
}

export default CreateReviews;
