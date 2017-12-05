import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'sanitize.css';

import { RootContainer, RootReducer, RootSaga } from './Root';
import configureStore from './configureStore';
import registerServiceWorker from './registerServiceWorker';

const store = configureStore({
  reducers: { root: RootReducer },
  sagas: [RootSaga]
});

ReactDOM.render(
  <Provider store={store}>
    <RootContainer />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
