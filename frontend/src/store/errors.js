import { sessionErrorReducer } from './session'
import { combineReducers } from 'redux'
import { reviewErrorReducer } from './review'
import { postErrorReducer } from './post'

export default combineReducers({
    session: sessionErrorReducer,
    review: reviewErrorReducer,
    post: postErrorReducer
})
