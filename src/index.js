// 3rd-party imports

import 'normalize.css';
import 'sanitize.css';
import 'tachyons';

import system_ui from 'system-ui';

import { injectGlobal } from 'styled-components';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// local imports

import configureStore from './configureStore';
import registerServiceWorker from './registerServiceWorker';

import NotFound from './NotFound';
import Dashboard from './Dashboard';
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
    <Router>
      <Switch>
        <Route exact path={'/'} component={Root.Container} />
        <Route exact path={'/ui-proposal'} component={Dashboard.Container} />
        <Route component={NotFound.Container} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
