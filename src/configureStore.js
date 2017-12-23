// @flow

import { combineReducers, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';

import Accounts from './Accounts';
import Transactions from './Transactions';
import LineChart from './LineChart';
import ExpensesChart from './ExpensesChart';
import Register from './Register';
import type { ReduxState } from './types';

const reducer: (ReduxState, any) => ReduxState = combineReducers({
  accounts: Accounts.reducer,
  lineChart: LineChart.reducer,
  expensesChart: ExpensesChart.reducer,
  transactions: Transactions.reducer,
  register: Register.reducer
});

const sagas = [
  Accounts.saga,
  Transactions.saga,
  LineChart.saga,
  ExpensesChart.saga
];

export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware();

  const middleware = [sagaMiddleware];
  if (process.env.NODE_ENV === 'development') {
    middleware.push(logger);
  }

  const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(...middleware))
  );

  sagas.forEach(saga => {
    sagaMiddleware.run(saga);
  });

  return store;
}
