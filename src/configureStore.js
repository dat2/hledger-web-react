import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

export default function configureStore(
  { reducer = x => x, initialState = undefined, sagas = [] } = {}
) {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(sagaMiddleware))
  );

  sagas.forEach(saga => {
    sagaMiddleware.run(saga);
  });

  return store;
}
