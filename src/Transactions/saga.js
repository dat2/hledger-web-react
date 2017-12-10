import { all, call, put, takeEvery } from 'redux-saga/effects';
import localforage from 'localforage';

import Actions from './actions';

export default function* transactionsSaga() {
  yield all([
    takeEvery(Actions.loadTransactionsFromCache, loadTransactionsFromCache),
    takeEvery(Actions.loadTransactionsFromCacheFailed, fetchTransactions),
    takeEvery(Actions.fetchTransactions, fetchTransactions),
    takeEvery(Actions.loadTransactionsSuccess, cacheTransactions),
    takeEvery(Actions.invalidateTransactionsCache, invalidateTransactionsCache)
  ]);
}

function* loadTransactionsFromCache() {
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

function* invalidateTransactionsCache() {
  yield call(() => localforage.removeItem('transactions'));
}
