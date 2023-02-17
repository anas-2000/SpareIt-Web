import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from './Redux/store'
// import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux/es';

ReactDOM.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>,
  <Provider store={store}>
      <App />
  </Provider>,
  document.getElementById('root')
);