import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'sanitize.css';

import configureStore from './configureStore';
import { RootContainer } from './Root';
import Accounts from './Accounts';
import registerServiceWorker from './registerServiceWorker';

const store = configureStore({
  reducers: { [Accounts.key]: Accounts.reducer },
  sagas: [Accounts.saga]
});

ReactDOM.render(
  <Provider store={store}>
    <RootContainer />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
