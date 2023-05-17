import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
//import store from './Redux/store'
// import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux/es';
import { store, persistor } from "./Redux/store";
import { PersistGate } from 'redux-persist/integration/react'
import { disableReactDevTools } from '@fvilers/disable-react-devtools';


if(process.env.NODE_ENV === 'production'){
  disableReactDevTools();
}

ReactDOM.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>,
  <Provider store={store}>
      <App />
  </Provider>,
  document.getElementById('root')
);