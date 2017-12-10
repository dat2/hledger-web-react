import { combineReducers, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';

export default function configureStore(
  { reducers = {}, initialState = undefined, sagas = [] } = {}
) {
  const sagaMiddleware = createSagaMiddleware();

  const middleware = [sagaMiddleware];
  if (process.env.NODE_ENV === 'development') {
    middleware.add(logger);
  }

  const store = createStore(
    combineReducers(reducers),
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
  );

  sagas.forEach(saga => {
    sagaMiddleware.run(saga);
  });

  return store;
}
