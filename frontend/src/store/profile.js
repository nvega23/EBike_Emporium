import jwtFetch from './jwt';

export const RECEIVE_USER_PROFILE = 'RECEIVE_USER_PROFILE';

const receiveUserProfile = (payload) => ({
  type: RECEIVE_USER_PROFILE,
  payload,
});

export const getProfile = (userId) => (store) => {
  return store?.profiles?.[userId] || null;
};

export const fetchUserProfile = (userId) => async (dispatch) => {
    try {
      const res = await jwtFetch(`/api/users/${userId}`);
      if (res.ok) {
        const data = await res.json();
        return dispatch(receiveUserProfile(data));
      }
    } catch (err) {
      console.error('Failed to fetch user profile:', err);
    }
  };
  

const profileReducer = (state = {}, action) => {
switch (action.type) {
    case RECEIVE_USER_PROFILE:
    return { ...state, [action.payload._id]: action.payload };
    default:
    return state;
}
};

export default profileReducer;
