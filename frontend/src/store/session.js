import jwtFetch from './jwt'


const RECEIVE_CURRENT_USER = 'session/RECEIVE_CURRENT_USER'
const RECEIVE_SESSION_ERRORS = 'session/RECEIVE_SESSION_ERRORS'
const CLEAR_SESSION_ERRORS = 'session/CLEAR_SESSION_ERRORS'
const RECEIVE_USER_LOGOUT = 'session/RECEIVE_USER_LOGOUT'


//dispatch receiveCurrentUser when a user logs in
const receiveCurrentUser = (currentUser) => ({
    type: RECEIVE_CURRENT_USER,
    currentUser
})


//DISPATCH receiveCurrentErrors to show errors in frontend
const receiveErrors = errors => ({
    type: RECEIVE_SESSION_ERRORS,
    errors
})


const logoutUser = () => ({
    type: RECEIVE_USER_LOGOUT
})

//Dispatch clear session errors
export const clearSessionErrors = () => ({
    type: CLEAR_SESSION_ERRORS
})


export const signup = user => startSession(user, 'api/users/register')
export const login = user => startSession(user, 'api/users/login')

const startSession = (userInfo, route) => async (dispatch) => {
    try {
        const res = await jwtFetch(route, {
            method: "POST",
            body: JSON.stringify(userInfo)
        })

        const { user, token } = await res.json();
        localStorage.setItem('jwtToken', token);
        return dispatch(receiveCurrentUser(user));
    } catch (err) {
        const res = await err.json()
        if (res.statusCode === 400) {
            return dispatch(receiveErrors(res.errors))
        }

    }
}

export const fetchCurrentUser = () => async dispatch => {
    const res = await jwtFetch("/api/users/current")

    if(res.ok){
        const data = await res.json()
        return dispatch(receiveCurrentUser(data))

    }
}

export const logout = () => dispatch => {
    localStorage.removeItem('jwtToken');
    dispatch(logoutUser())

}

const initialState = {
    user: undefined
}

const sessionReducer = (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            return { user: action.currentUser }
            break;
        case RECEIVE_USER_LOGOUT:
            return initialState
            break;

        default:
            return state
            break;
    }
}

export default sessionReducer;

const nullErrors = null;

export const sessionErrorReducer = (state = nullErrors, action) => {
    switch (action.type) {
        case RECEIVE_SESSION_ERRORS:
            return action.errors
            break;
        case RECEIVE_CURRENT_USER:
        case CLEAR_SESSION_ERRORS:
            return nullErrors
            break;
        default:
            return state;
            break;
    }
}
