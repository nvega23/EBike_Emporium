// import jwtFetch from './jwt';
// import { RECEIVE_USER_LOGOUT } from './session';

// const RECEIVE_PRODUCTS = "products/RECEIVE_PRODUCTS";
// const RECEIVE_USER_PRODUCTS = "products/RECEIVE_USER_PRODUCTS";
// const RECEIVE_NEW_PRODUCT = "products/RECEIVE_NEW_PRODUCT";
// const RECEIVE_PRODUCT_ERRORS = "products/RECEIVE_PRODUCT_ERRORS";
// const CLEAR_PRODUCT_ERRORS = "products/CLEAR_PRODUCT_ERRORS";

// const receiveProducts = products => ({
//   type: RECEIVE_PRODUCTS,
//   products
// });

// const receiveUserProduct = Product => ({
//   type: RECEIVE_USER_PRODUCTS,
//   Product
// });

// const receiveNewProduct = product => ({
//   type: RECEIVE_NEW_PRODUCT,
//   product
// });

// const receiveErrors = errors => ({
//   type: RECEIVE_PRODUCT_ERRORS,
//   errors
// });

// export const clearProductErrors = errors => ({
//     type: CLEAR_PRODUCT_ERRORS,
//     errors
// });

// export const fetchProducts = () => async dispatch => {
//     try {
//       const res = await jwtFetch ('/api/products');
//       const products = await res.json();
//       dispatch(receiveProducts(products));
//     } catch (err) {
//       const resBody = await err.json();
//       if (resBody.statusCode === 400) {
//         dispatch(receiveErrors(resBody.errors));
//       }
//     }
// };

// export const fetchUserProducts = id => async dispatch => {
//     try {
//       const res = await jwtFetch(`/api/products/user/${id}`);
//       const product = await res.json();
//       dispatch(receiveUserProduct(product));
//     } catch(err) {
//       const resBody = await err.json();
//       if (resBody.statusCode === 400) {
//         return dispatch(receiveErrors(resBody.errors));
//       }
//     }
// };

// export const composeProduct = data => async dispatch => {
//     try {
//       const res = await jwtFetch('/api/products/', {
//         method: 'POST',
//         body: JSON.stringify(data)
//       });
//       const product = await res.json();
//       dispatch(receiveNewProduct(product));
//     } catch(err) {
//       const resBody = await err.json();
//       if (resBody.statusCode === 400) {
//         return dispatch(receiveErrors(resBody.errors));
//       }
//     }
// };

// const nullErrors = null;

// export const productErrorsReducer = (state = nullErrors, action) => {
//   switch(action.type) {
//     case RECEIVE_PRODUCT_ERRORS:
//       return action.errors;
//     case RECEIVE_NEW_PRODUCT:
//     case CLEAR_PRODUCT_ERRORS:
//       return nullErrors;
//     default:
//       return state;
//   }
// };

// const productsReducer = (state = { all: {}, user: {}, new: undefined }, action) => {
//     switch(action.type) {
//       case RECEIVE_PRODUCTS:
//         return { ...state, all: action.products, new: undefined};
//       case RECEIVE_USER_PRODUCTS:
//         return { ...state, user: action.products, new: undefined};
//       case RECEIVE_NEW_PRODUCT:
//         return { ...state, new: action.product};
//       case RECEIVE_USER_LOGOUT:
//         return { ...state, user: {}, new: undefined }
//       default:
//         return state;
//     };
// }

// export default productsReducer;
