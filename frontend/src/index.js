import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import '@fortawesome/fontawesome-free/css/all.css';
import App from './App';
import configureStore from './store/store';
import { Provider } from 'react-redux';
import { BrowserRouter, HashRouter } from 'react-router-dom';

let store = configureStore({})

function Root() {
  return (
    <Provider store={store}>
      <HashRouter>
        < App />
      </HashRouter>
    </Provider>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);
