import { all, call, put, take, takeEvery } from 'redux-saga/effects';
import localforage from 'localforage';

import Actions from './Root.actions';

export default function* rootSaga() {
  yield all([
    takeEvery(Actions.fetchAccountNames, fetchAccountNames),
    takeEvery(Actions.loadTransactions, loadTransactions),
    takeEvery(Actions.loadTransactionsCacheMiss, fetchTransactions),
    takeEvery(Actions.fetchTransactions, fetchTransactions),
    takeEvery(Actions.loadTransactionsSuccess, cacheTransactions)
  ]);
}

function* fetchAccountNames() {
  try {
    const response = yield call(fetch, '/api/v1/accountnames');
    const json = yield call(() => response.json());
    yield put(Actions.fetchAccountNamesSuccess(json));
  } catch (e) {
    yield put(Actions.fetchAccountNamesFailed(e));
  }
}

function* loadTransactions() {
  yield take(Actions.fetchAccountNamesSuccess);

  // fetch from cache
  const cached = yield call(() => localforage.getItem('transactions'));
  if (cached) {
    yield put(
      Actions.loadTransactionsSuccess({ data: cached, isCached: true })
    );
  } else {
    yield put(Actions.loadTransactionsCacheMiss());
  }
}

function* fetchTransactions() {
  try {
    // just in case things are updated, we'll just dispatch it twice, and let things
    // like reselect prevent re-renders
    const response = yield call(fetch, '/api/v1/transactions');
    const data = yield call(() => response.json());
    yield put(Actions.loadTransactionsSuccess({ data, isCached: false }));
  } catch (e) {
    yield put(Actions.loadTransactionsFailed(e));
  }
}

function* cacheTransactions({ payload: { data } }) {
  yield call(() => localforage.setItem('transactions', data));
}
