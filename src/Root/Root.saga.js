import { all, call, put, takeEvery } from 'redux-saga/effects';
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
    const response = yield call(fetch, '/api/v1/transactions');
    const json = yield call(() => response.json());
    yield put(Actions.fetchTransactionsSuccess(json));
  } catch (e) {
    yield put(Actions.fetchTransactionsFailed(e));
  }
}
