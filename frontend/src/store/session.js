import jwtFetch from './jwt';

const RECEIVE_CURRENT_USER = 'session/RECEIVE_CURRENT_USER';
const RECEIVE_SESSION_ERRORS = 'session/RECEIVE_SESSION_ERRORS';
const CLEAR_SESSION_ERRORS = 'session/CLEAR_SESSION_ERRORS';
const RECEIVE_USER_LOGOUT = 'session/RECEIVE_USER_LOGOUT';

// dispatch receiveCurrentUser when a user logs in
const receiveCurrentUser = (currentUser) => ({
    type: RECEIVE_CURRENT_USER,
    currentUser
});

// DISPATCH receiveCurrentErrors to show errors in frontend
const receiveErrors = errors => ({
    type: RECEIVE_SESSION_ERRORS,
    errors
});

const logoutUser = () => ({
    type: RECEIVE_USER_LOGOUT
});

// Dispatch clear session errors
export const clearSessionErrors = () => ({
    type: CLEAR_SESSION_ERRORS
});

export const signup = user => startSession(user, 'api/users/register');
export const login = user => startSession(user, 'api/users/login');

const startSession = (userInfo, route) => async (dispatch) => {
    try {
        const res = await jwtFetch(route, {
            method: "POST",
            body: JSON.stringify(userInfo)
        });

        const { user, accessToken, refreshToken } = await res.json();
        localStorage.setItem('JWTtoken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        return dispatch(receiveCurrentUser(user));
    } catch (err) {
        const res = await err.json();
        if (res.statusCode === 400) {
            return dispatch(receiveErrors(res.errors));
        }
        throw err; // This will ensure that the promise chain is correctly handled
    }
};

export const fetchCurrentUser = () => async dispatch => {
    try {
      const res = await jwtFetch("/api/users/current");
      if (res.ok) {
        const data = await res.json();
        return dispatch(receiveCurrentUser(data));
      }
    } catch (err) {
      console.error("Failed to fetch current user:", err);
      dispatch(logoutUser());
    }
  };

export const logout = () => dispatch => {
    localStorage.removeItem('jwtToken');
    dispatch(logoutUser());
};

const initialState = {
    user: JSON.parse(localStorage.getItem('user')) || undefined
  };
  
const sessionReducer = (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_CURRENT_USER:
        localStorage.setItem('user', JSON.stringify(action.currentUser));
        return { user: action.currentUser };
        case RECEIVE_USER_LOGOUT:
        localStorage.removeItem('user');
        localStorage.removeItem('JWTtoken');
        localStorage.removeItem('refreshToken');
        return initialState;
        default:
        return state;
    }
};

export default sessionReducer;
  

const nullErrors = null;

export const sessionErrorReducer = (state = nullErrors, action) => {
    switch (action.type) {
        case RECEIVE_SESSION_ERRORS:
            return action.errors;
        case RECEIVE_CURRENT_USER:
        case CLEAR_SESSION_ERRORS:
            return nullErrors;
        default:
            return state;
    }
};
