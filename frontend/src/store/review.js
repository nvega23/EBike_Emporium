import jwtFetch from './jwt'

const RECEIVE_NEW_REVIEW = "review/RECEIVE_NEW_REVIEW"
const RECEIVE_REVIEW_ERRORS = 'review/RECEIVE_REVIEW_ERRORS'
export const REMOVE_REVIEW = 'review/REMOVE_REVIEW';
const CLEAR_REVIEW_ERRORS = 'review/CLEAR_REVIEW_ERRORS'
const RECEIVE_USERS_REVIEW = "RECEIVE_USERS_REVIEW"

const receiveErrors = errors => ({
    type: RECEIVE_REVIEW_ERRORS,
    errors
})


export const clearReviewErrors = () => ({
    type: CLEAR_REVIEW_ERRORS
})


export const getUserReviews = (reviews) => ({
    type: RECEIVE_USERS_REVIEW,
    reviews

})

const removeReview = (reviewId ) => ({
    type: REMOVE_REVIEW,
    reviewId

});

const receiveNewReview = (reviews) => ({
    type: RECEIVE_NEW_REVIEW,
    reviews
});



export const deleteReview = (id, key, userId) => async dispatch => {
    try {
        const res = await jwtFetch(`/api/reviews/${id}`, {
          method: 'DELETE'
        })
        dispatch(removeReview(id, key))
      } catch(err) {
        const resBody = await err.json();
        return dispatch(receiveErrors(resBody.errors));
      }
}

export const updateReview = (title, body, rating, reviewId) => async dispatch => {

    try{
        const res = await jwtFetch(`/api/reviews/${reviewId}`, {
            method: 'PATCH',
            body: JSON.stringify({
                title: title,
                body: body,
                rating: rating
            })
        })
    } catch (err) {
        const res = await err.json()

        if (res.statusCode === 400) {
            return dispatch(receiveErrors(res.errors))
        }

    }
}


export const composeReview = (title, body, rating, postId, userId) => async dispatch => {

    const formData = new FormData();
    formData.append("title", title);
    formData.append("body", body);
    formData.append('rating', rating);


    try {
        const res = await jwtFetch(`/api/reviews/${postId}/${userId}`, {
            method: 'POST',
            body: JSON.stringify({
                title: title,
                body: body,
                rating: rating,

            })
        });

        const reviews = await res.json();
        dispatch(receiveNewReview(reviews));
        dispatch(clearReviewErrors())


        window.location.href = '/posts';
    } catch (err) {

        const res = await err.json()

        if (res.statusCode === 400) {
            return dispatch(receiveErrors(res.errors))
        }

    }
}


export const fetchUsersReview = (userId) => async (dispatch) =>  {

    const res = await jwtFetch(`/api/reviews/user/${userId}`)


    if(res.ok){
        const reviews = await res.json()
        return dispatch(receiveNewReview(reviews))
    }

}


export const fetchPostReviews = (postId) => async (dispatch) =>{

    const res = await jwtFetch(`api/reviews/post/${postId}`)

    if(res.ok){
        const reviews = await res.json()
        return dispatch(receiveNewReview(reviews))
    }
}

export const fetchReview = (reviewId) => async (dispatch) => {
    const res = await jwtFetch(`/api/reviews/review/${reviewId}`)

    if(res.ok){
        const review = await res.json()
        return dispatch(receiveNewReview(review))
    } else{
    }
}

const initialState = {}
const reviewReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case RECEIVE_NEW_REVIEW:
            return {...state, ...action.reviews };
        case RECEIVE_USERS_REVIEW:
            return {...state, ...action.reviews}
        case REMOVE_REVIEW:
            delete newState[action.key];
            return newState;
        default:
            return state;

    }
}

export default reviewReducer;

const nullErrors = null;

export const reviewErrorReducer = (state = nullErrors, action) => {
    switch (action.type) {
        case RECEIVE_REVIEW_ERRORS:
            return action.errors
            break;
        case CLEAR_REVIEW_ERRORS:
            return nullErrors
            break;
        default:
            return state;
            break;
    }
}
