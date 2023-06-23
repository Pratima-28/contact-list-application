import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';

import { legacy_createStore as createStore } from 'redux';
import { contacts } from './reducers';
import { Provider } from 'react-redux';

//creating store
const store = createStore(contacts);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
    <Provider store={store}>
          <App />
    </Provider>
  </React.StrictMode>
 
);

