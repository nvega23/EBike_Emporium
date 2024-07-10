import React from 'react';
import { createRoot } from 'react-dom/client';
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
        <App />
      </BrowserRouter>
    </Provider>
  );
}

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
