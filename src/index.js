import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/styles.css';
import { Provider } from 'react-redux';
import store from './configs/redux/store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
