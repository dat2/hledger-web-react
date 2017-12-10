import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'sanitize.css';

import configureStore from './configureStore';
import registerServiceWorker from './registerServiceWorker';

import Root from './Root';
import Accounts from './Accounts';
import Transactions from './Transactions';

const store = configureStore({
  reducers: { [Accounts.key]: Accounts.reducer },
  sagas: [Accounts.saga, Transactions.saga]
});

ReactDOM.render(
  <Provider store={store}>
    <Root.Container />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
