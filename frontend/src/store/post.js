import jwtFetch from './jwt'

export const RECEIVE_POSTS = 'post/RECEIVE_POSTS';
export const RECEIVE_POST = 'post/RECEIVE_POST';
export const REMOVE_POST = 'post/REMOVE_POST';
export const UPDATE_POST = 'post/UPDATE_POST';
const RECEIVE_NEW_POST = "post/RECEIVE_NEW_POST"
const RECEIVE_POST_ERRORS = "post/RECEIVE_POST_ERRORS"
const UPDATE_LIKES = "post/UPDATE_LIKES"
const CLEAR_POST_ERRORS = 'post/CLEAR_POST_ERRORS'

const recievePosts = (posts) => ({
    type: RECEIVE_POSTS,
    posts
});

// const receivePost = (post) => ({
//     type: RECEIVE_POST,
//     post
// })

export const receivePost = payload => ({
    type: RECEIVE_POST,
    payload
})


const removePost = (postId, key) => ({
    type: REMOVE_POST,
    postId,
    key
});

const receiveErrors = errors => ({
    type: RECEIVE_POST_ERRORS,
    errors
});

export const clearPostErrors = () => ({
    type: CLEAR_POST_ERRORS
})

const receiveNewPost = post => ({
    type: RECEIVE_NEW_POST,
    post
});




export const getPost = (postId) => (store) => {
    if(store.post && store.post[postId]) return store.post[postId];
    return null;
}

export const deletePost = (postId, key) => async (dispatch) => {
    try {
        const res = await jwtFetch(`/api/post/${postId}`, {
          method: 'DELETE'
        })
        dispatch(removePost(postId, key))
      } catch(err) {
        const resBody = await err.json();
        return dispatch(receiveErrors(resBody.errors));
      }
}

export const updatePost = (body, images, postId) => async (dispatch) => {
    const formData = new FormData();
    formData.append("body", body);

    Array.from(images).forEach(image => formData.append("images", image));

    const res = await jwtFetch(`/api/post/${postId}`, {
        method: 'PATCH',
        body: formData
    });
        if(res.ok){

        } else{

        }
        const post = await res.json();
        dispatch(receiveNewPost(post));
}

export const fetchPosts = (options = {}) => async (dispatch) => {
    const { query = '' } = options;

    try {
        const res = await jwtFetch(`/api/post${query}`);
        const posts = await res.json();
        dispatch(recievePosts(posts));
    } catch (err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
            dispatch(receiveErrors(resBody.errors));
        }
    }
}

export const fetchPost = (postId) => async (dispatch) => {
    try{
        const res = await jwtFetch(`/api/post/${postId}`);
        const post = await res.json()
        dispatch(receivePost(post))
    } catch (err) {
        const newPost = await err.json();
        if (newPost.statusCode === 400){
        }
    }
}

export const searchPosts = () => async (dispatch) => {
    try {
        const res = await jwtFetch(`/api/post/search`);
        const results = await res.json();

    } catch (err) {
        //console.log(err)
    }
}

export const composePost = (body, images, bikeName, price, query) => async dispatch => {
    const formData = new FormData();
    formData.append("body", body);
    formData.append("bikeName", bikeName);
    formData.append("price", price);
    Array.from(images).forEach(image => formData.append("images", image))
   try{
       const res = await jwtFetch('/api/post/', {
           method: 'POST',
           body: formData
       });

       dispatch(fetchPosts({query}));
       dispatch(clearPostErrors())
       window.location.href = '/posts';
   } catch(err){
       const res = await err.json()

       if (res.statusCode === 400) {
           return dispatch(receiveErrors(res.errors))
       }
   }
}


export const fetchUserPosts = (userId) => async (dispatch) => {
    try {
        const res = await jwtFetch(`/api/post/user/${userId}`);
        const posts = await res.json();
        dispatch(recievePosts(posts));
    } catch (err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
            // dispatch(receiveErrors(resBody.errors)); todo
        }
    }

}



export const addLike = (id) => async dispatch => {
    try{
        const res = await jwtFetch(`/api/post/like/${id}`,{
            method: 'PUT'

        })
        dispatch({
            type: UPDATE_LIKES,
            payload: {id, likes: res.data}
        })
    } catch (err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
            return dispatch(receiveErrors(resBody.errors));
        }
    }

}


export const removeLike = (id) => async dispatch => {
    try {
        const res = await jwtFetch(`/api/post/unlike/${id}`, {
            method: 'PUT'

        })
        dispatch({
            type: UPDATE_LIKES,
            payload: { id, likes: res.data }
        })
    } catch (err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
            return dispatch(receiveErrors(resBody.errors));
        }
    }

}


const initialState = {}
export const postReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
      case RECEIVE_POSTS:
        // Update posts with likes for each post
        // modify state, ID be a key for item at that id, 0 => 3124123tf1we
        const postsWithLikes = action.posts.map((post) => {
          const likes = post.likes.map((like) => like.user);
          return { ...post, likes };
        });
        return { ...newState, ...postsWithLikes };
      case RECEIVE_POST:
        return {...newState, [action.payload.post]: action.payload.post}
      case REMOVE_POST:
        delete newState[action.key];
        return newState;
      case 'post/RECEIVE_POST_ERRORS':
        return state;
      case UPDATE_POST:
      case RECEIVE_NEW_POST:
        return { ...newState, [newState.length + 1]: { ...action.post } };
      case UPDATE_LIKES:
        const updatedPost = newState[action.payload.id];
        if (updatedPost) {
          updatedPost.likes = action.payload.likes;
        }
        return { ...newState };
      default:
        return state;
    }
  };


// export default postReducer;


const nullErrors = null;

export const postErrorReducer = (state = nullErrors, action) => {
    switch (action.type) {
        case RECEIVE_POST_ERRORS:
            return action.errors
            break;
        case CLEAR_POST_ERRORS:
            return nullErrors
            break;
        default:
            return state;
            break;
    }
}
