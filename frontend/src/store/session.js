import jwtFetch from './jwt';

const RECEIVE_CURRENT_USER = "session/RECEIVE_CURRENT_USER";
const RECEIVE_SESSION_ERRORS = "session/RECEIVE_SESSION_ERRORS";
const CLEAR_SESSION_ERRORS = "session/CLEAR_SESSION_ERRORS";
export const RECEIVE_USER_LOGOUT = "session/RECEIVE_USER_LOGOUT";
export const signup = user => startSession(user, 'api/users/register');
export const login = user => startSession(user, 'api/users/login');

// Dispatch receiveCurrentUser when a user logs in.
const receiveCurrentUser = currentUser => ({
  type: RECEIVE_CURRENT_USER,
  currentUser
});

// Dispatch getCurrentUser to receive the current user
export const getCurrentUser = () => async dispatch => {
  const res = await jwtFetch('/api/users/current');
  const user = await res.json();
  return dispatch(receiveCurrentUser(user));
};

// Dispatch receiveErrors to show authentication errors on the frontend.
const receiveErrors = errors => ({
  type: RECEIVE_SESSION_ERRORS,
  errors
});

// Dispatch logoutUser to clear the session user when a user logs out.
const logoutUser = () => ({
  type: RECEIVE_USER_LOGOUT
});

// Dispatch clearSessionErrors to clear any session errors.
export const clearSessionErrors = () => ({
  type: CLEAR_SESSION_ERRORS
});

const startSession = (userInfo, route) => async dispatch => {
    try {
      const res = await jwtFetch(route, {
        method: "POST",
        body: JSON.stringify(userInfo)
      });
      const { user, token } = await res.json();
      localStorage.setItem('jwtToken', token);
      return dispatch(receiveCurrentUser(user));
    } catch(err) {
      const res = await err.json();
      if (res.statusCode === 400) {
        return dispatch(receiveErrors(res.errors));
      }
    }
};

export const logout = () => dispatch => {
    localStorage.removeItem('jwtToken');
    dispatch(logoutUser());
};


const initialState = {
    user: undefined
};

const nullErrors = null;

const sessionReducer = (state = nullErrors, action) => {
    switch (action.type) {
      case RECEIVE_SESSION_ERRORS:
        return action.errors
      case RECEIVE_CURRENT_USER:
      case RECEIVE_USER_LOGOUT:
        return nullErrors;
      default:
        return state;
    }
};

export default sessionReducer;
