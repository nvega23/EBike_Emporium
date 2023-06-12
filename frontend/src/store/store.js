import session from './session';
import { combineReducers } from 'redux';
import { sessionErrorsReducer } from './session';

const rootReducer = combineReducers({
    session
});

export default combineReducers({
  session: sessionErrorsReducer
});
