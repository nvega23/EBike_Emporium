import jwtFetch from './jwt';

export const RECEIVE_POSTS = 'post/RECEIVE_POSTS';
export const RECEIVE_POST = 'post/RECEIVE_POST';
export const REMOVE_POST = 'post/REMOVE_POST';
export const UPDATE_POST = 'post/UPDATE_POST';
const RECEIVE_NEW_POST = "post/RECEIVE_NEW_POST";
const RECEIVE_POST_ERRORS = "post/RECEIVE_POST_ERRORS";
const UPDATE_LIKES = "post/UPDATE_LIKES";
const CLEAR_POST_ERRORS = 'post/CLEAR_POST_ERRORS';

const receivePosts = (posts) => ({
  type: RECEIVE_POSTS,
  posts
});

export const receivePost = (post) => ({
  type: RECEIVE_POST,
  post
});

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
});

const receiveNewPost = post => ({
  type: RECEIVE_NEW_POST,
  post
});

export const getPost = (postId) => (store) => {
  if (store.post && store.post[postId]) return store.post[postId];
  return null;
};

export const deletePost = (postId, key) => async (dispatch) => {
  try {
    await jwtFetch(`/api/posts/${postId}`, {
      method: 'DELETE'
    });
    dispatch(removePost(postId, key));
  } catch (err) {
    const resBody = await err.json();
    return dispatch(receiveErrors(resBody.errors));
  }
};

export const updatePost = (body, images, postId) => async (dispatch) => {
  const formData = new FormData();
  formData.append("body", body);

  Array.from(images).forEach(image => formData.append("images", image));

  const res = await jwtFetch(`/api/posts/${postId}`, {
    method: 'PATCH',
    body: formData
  });

  const post = await res.json();
  dispatch(receiveNewPost(post));
};

export const fetchPosts = (options = {}) => async (dispatch) => {
  const { query = '' } = options;

  try {
    const res = await jwtFetch(`/api/posts${query}`);
    const posts = await res.json();
    dispatch(receivePosts(posts));
  } catch (err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      dispatch(receiveErrors(resBody.errors));
    }
  }
};

export const fetchPost = (postId) => async dispatch => {
  try {
    const res = await jwtFetch(`/api/posts/${postId}`);
    if (res.ok) {
      const post = await res.json();
      dispatch(receivePost(post));
    }
  } catch (err) {
    console.error('Failed to fetch post:', err);
  }
};

export const fetchUserPosts = (userId) => async (dispatch) => {
  try {
    const res = await jwtFetch(`/api/posts/user/${userId}`);
    const posts = await res.json();
    dispatch(receivePosts(posts));
  } catch (err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      // dispatch(receiveErrors(resBody.errors)); todo
    }
  }
};

export const addLike = (id) => async dispatch => {
  try {
    const res = await jwtFetch(`/api/posts/like/${id}`, {
      method: 'PUT'
    });
    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data }
    });
  } catch (err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      return dispatch(receiveErrors(resBody.errors));
    }
  }
};

export const removeLike = (id) => async dispatch => {
  try {
    const res = await jwtFetch(`/api/posts/unlike/${id}`, {
      method: 'PUT'
    });
    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data }
    });
  } catch (err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      return dispatch(receiveErrors(resBody.errors));
    }
  }
};

export const composePost = (body, images, bikeName, price, query) => async dispatch => {
  const formData = new FormData();
  formData.append("body", body);
  formData.append("bikeName", bikeName);
  formData.append("price", price);
  Array.from(images).forEach(image => formData.append("images", image));
  
  try {
    const res = await jwtFetch('/api/posts/', {
      method: 'POST',
      body: formData
    });
    
    const post = await res.json();
    dispatch(receiveNewPost(post));
    dispatch(fetchPosts({ query }));
    dispatch(clearPostErrors());
    window.location.href = '/posts';
  } catch (err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      return dispatch(receiveErrors(resBody.errors));
    }
  }
};

const initialState = {};
export const postReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case RECEIVE_POSTS:
      const postsObj = {};
      action.posts.forEach(post => {
        postsObj[post._id] = post;
      });
      return { ...newState, ...postsObj };
    case RECEIVE_POST:
      return { ...newState, [action.post._id]: action.post };
    case REMOVE_POST:
      delete newState[action.postId];
      return newState;
    case RECEIVE_NEW_POST:
      return { ...newState, [action.post._id]: action.post };
    case UPDATE_LIKES:
      if (newState[action.payload.id]) {
        newState[action.payload.id].likes = action.payload.likes;
      }
      return newState;
    default:
      return state;
  }
};

const nullErrors = null;

export const postErrorReducer = (state = nullErrors, action) => {
  switch (action.type) {
    case RECEIVE_POST_ERRORS:
      return action.errors;
    case CLEAR_POST_ERRORS:
      return nullErrors;
    default:
      return state;
  }
};
