// @flow

// 3rd-party imports

import 'normalize.css';
import 'sanitize.css';
import 'tachyons';
import 'react-virtualized/styles.css';

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
import LineChart from './LineChart';
import ExpensesChart from './ExpensesChart';
import Register from './Register';

// globals

injectGlobal`
  body {
    font-size: 16px;
    font-family: ${system_ui}, sans-serif;
  }

  html,
  body,
  #root {
    height: 100%;
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
  reducers: {
    [Accounts.key]: Accounts.reducer,
    [LineChart.key]: LineChart.reducer,
    [ExpensesChart.key]: ExpensesChart.reducer,
    [Transactions.key]: Transactions.reducer,
    [Register.key]: Register.reducer
  },
  sagas: [Accounts.saga, Transactions.saga, LineChart.saga, ExpensesChart.saga]
});

const root_mount = document.getElementById('root');

if (root_mount) {
  ReactDOM.render(
    <Provider store={store}>
      <Root.Container />
    </Provider>,
    root_mount
  );
} else {
  if (process.env.NODE_ENV !== 'production') {
    throw Error('Cannot find DOM element with id: root');
  }
}

registerServiceWorker();
