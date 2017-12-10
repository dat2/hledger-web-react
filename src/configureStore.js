// @flow

import { combineReducers, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';

export default function configureStore(
  { reducers = {}, initialState = undefined, sagas = [] } = {}
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
