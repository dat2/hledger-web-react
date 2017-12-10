// 3rd-party imports

import 'normalize.css';
import 'sanitize.css';
import 'tachyons';

import system_ui from 'system-ui';
import { injectGlobal } from 'styled-components';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

// local imports

import configureStore from './configureStore';
import registerServiceWorker from './registerServiceWorker';

import Root from './Root';
import Accounts from './Accounts';
import Transactions from './Transactions';

// globals

injectGlobal`
  body {
    font-size: 16px;
    font-family: ${system_ui}, sans-serif;
  }
`;

if (process.env.NODE_ENV !== 'production') {
  // CSS debug outline
  // ref: http://tachyons.io/docs/debug/

  const DEBUG = false;
  if (DEBUG) {
    injectGlobal`
      * { outline: 1px solid gold; }
      `;
  }
}

// setup

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
