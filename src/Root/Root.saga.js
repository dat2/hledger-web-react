import { all, call, put, takeEvery } from 'redux-saga/effects';
import localforage from 'localforage';

import Actions from './Root.actions';

export default function* rootSaga() {
  yield all([
    takeEvery(Actions.fetchAccountNames, fetchAccountNames),
    takeEvery(Actions.fetchTransactions, fetchTransactions)
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

function* fetchTransactions() {
  try {
    // fetch from cache
    const cached = yield call(() => localforage.getItem('transactions'));
    if (cached) {
      yield put(
        Actions.fetchTransactionsSuccess({ data: cached, isCached: true })
      );
    }

    // just in case things are updated, we'll just dispatch it twice, and let things
    // like reselect prevent re-renders
    const response = yield call(fetch, '/api/v1/transactions');
    const data = yield call(() => response.json());
    yield put(Actions.fetchTransactionsSuccess({ data, isCached: false }));

    // cache it
    yield call(() => localforage.setItem('transactions', data));
  } catch (e) {
    yield put(Actions.fetchTransactionsFailed(e));
  }
}
