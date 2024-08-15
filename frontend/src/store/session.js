import jwtFetch from './jwt';

const API_URL = process.env.REACT_APP_API_URL;

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

// export const signup = user => startSession(user, 'http://localhost:3000/api/users/register');
export const signup = (user) => async (dispatch) => {
    try {
      const res = await jwtFetch(`${API_URL}/users/register`, {
        method: 'POST',
        body: JSON.stringify(user),
      });
      
      const data = await res.json();
      console.log(data, 'i am data')
      dispatch(receiveCurrentUser(data.user)); // Pass only the user object
      return { success: true };
    } catch (err) {
      let errorDetail;
      try {
        const res = await err.json();
        if (res.statusCode === 400) {
          dispatch(receiveErrors(res.errors));
          errorDetail = res.errors;
        }
      } catch (jsonError) {
        errorDetail = err.message;
      }
      return { success: false, error: errorDetail || 'An unexpected error occurred.' };
    }
  };


// export const login = user => startSession(user, `${API_URL}/users/login`);
export const login = (userData) => async (dispatch) => {
    try {
        await dispatch(startSession(userData, `${API_URL}/users/login`));
    } catch (error) {
        const res = await error.json();
        dispatch(receiveErrors(res.errors));
    }
};


const startSession = (userInfo, route) => async (dispatch) => {
    try {
        const res = await jwtFetch(route, {
            method: "POST",
            body: JSON.stringify(userInfo)
        });
    
        const { user, accessToken, refreshToken } = await res.json();
        localStorage.setItem('JWTtoken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('user', JSON.stringify(user)); // Persist user data
        return dispatch(receiveCurrentUser(user)); // Pass only the user object
    } catch (err) {
        try {
            const res = await err.json();
            if (res.statusCode === 400) {
                return dispatch(receiveErrors(res.errors));
            }
        } catch (jsonError) {
            console.error("Failed to parse error response:", jsonError);
            throw err;
        }
    }    
};


export const fetchCurrentUser = () => async dispatch => {
    const token = localStorage.getItem('JWTtoken');
    if (token) {
        try {
            const res = await jwtFetch("/api/users/current");
            const data = await res.json();
            dispatch(receiveCurrentUser(data.user));
        } catch (err) {
            console.error("Failed to fetch current user:", err);
            dispatch(logoutUser());
        }
    } else {
        dispatch(logoutUser());
    }
};



  export const logout = () => dispatch => {
    localStorage.removeItem('JWTtoken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');

    dispatch(logoutUser());
};

const initialState = {
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('JWTtoken') || null,
};

const sessionReducer = (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            localStorage.setItem('user', JSON.stringify(action.currentUser));
            localStorage.setItem('JWTtoken', action.currentUser.accessToken);
            return { ...state, user: action.currentUser };
        case RECEIVE_USER_LOGOUT:
            localStorage.removeItem('user');
            localStorage.removeItem('JWTtoken');
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
