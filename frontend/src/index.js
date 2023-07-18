import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import '@fortawesome/fontawesome-free/css/all.css';
import App from './App';
import configureStore from './store/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

let store = configureStore({})

function Root() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        < App />
      </BrowserRouter>
    </Provider>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);
