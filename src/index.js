import React from 'react';
import ReactDOM from 'react-dom';
import {Router} from 'react-router-dom'

import {Provider} from 'react-redux';
import App from './App';

import history from './history';

import {store, persistor} from './_src/redux/store';
import {PersistGate} from 'redux-persist/es/integration/react'


ReactDOM.render(
  <Provider store={store}>
    <PersistGate
      loading={null}
      persistor={persistor}>
      <Router history={history}>
        <App/>
      </Router>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

