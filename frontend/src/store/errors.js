import { combineReducers } from 'redux';
import { clearSessionErrors } from './session';
import { productErrorsReducer } from './products';

export default combineReducers({
  session: clearSessionErrors,
  products: productErrorsReducer
});
