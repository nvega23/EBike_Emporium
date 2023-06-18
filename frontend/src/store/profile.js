import jwtFetch from './jwt'

export const RECEIVE_USER_PROFILE = 'RECEIVE_USER_PROFILE'


const receiveUserProfile = (payload) => ({
    type: RECEIVE_USER_PROFILE,
    payload
})

export const getProfile = (userId) => (store) => {
    if ( store?.users[userId]) return store.users[userId];
    return null
}

export const fetchUserProfile = (userId) => async dispatch => {
    const res = await jwtFetch(`/api/users/${userId}`)

    if (res.ok) {
        const data = await res.json()
        return dispatch(receiveUserProfile(data))
    }
}

const profileReducer = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_USER_PROFILE:
            return { profile: action.payload }
            break;
        default:
            return state
            break;
    }
}

export default profileReducer;
