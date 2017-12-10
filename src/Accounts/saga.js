import { call, put, takeLatest } from 'redux-saga/effects';

import Actions from './actions';

export default function* accountsSaga() {
  yield takeLatest(Actions.fetchAccounts, fetchAccounts);
}

function* fetchAccounts() {
  try {
    const response = yield call(fetch, '/api/v1/accounts');
    const json = yield call(() => response.json());
    const accounts = yield call(transformApiResponse, json);
    yield put(Actions.fetchAccountsSuccess(accounts));
  } catch (e) {
    yield put(Actions.fetchAccountsFailed(e));
  }
}

function transformApiResponse(data) {
  return data.map(transformAccount);
}

function transformAccount(account) {
  return {
    name: account.aname,
    quantities: account.aibalance.map(transformBalance),
    children: account.asubs.map(transformAccount)
  };
}

function transformBalance(balance) {
  return {
    amount: balance.aquantity,
    formatter: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }),
    format() {
      return this.formatter.format(this.amount);
    }
  };
}
