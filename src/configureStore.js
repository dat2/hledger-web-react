// @flow

import { combineReducers, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import type { Saga } from 'redux-saga';
import logger from 'redux-logger';

import type { AccountsState } from './Accounts/reducer';

type ReducerKeys = 'accounts';

type LocalSagas = () => Saga<void>;

type StoreConfig = {
  reducers: { [ReducerKeys]: boolean },
  initialState?: void,
  sagas: Array<LocalSagas>
};

export type StoreState = {
  +accounts: AccountsState
};

export default function configureStore(
  { reducers = {}, initialState = undefined, sagas = [] }: StoreConfig = {}
) {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    combineReducers(reducers),
    initialState,
    composeWithDevTools(
      applyMiddleware(
        sagaMiddleware,
        process.env.NODE_ENV === 'development' ? logger : null
      )
    )
  );

  sagas.forEach(saga => {
    sagaMiddleware.run(saga);
  });

  return store;
}
