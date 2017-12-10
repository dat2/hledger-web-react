// @flow

import { call, put, takeLatest } from 'redux-saga/effects';
import type { Saga } from 'redux-saga';

import { transformAmount } from '../Currency';
import type { HledgerAmount, Amount } from '../Currency';

import Actions from './actions';

type HledgerAccount = {
  aname: string,
  aibalance: Array<HledgerAmount>,
  asubs: Array<HledgerAccount>
};

export type Account = {
  name: string,
  amounts: Array<Amount>,
  children: Array<Account>
};

export default function* accountsSaga(): Saga<void> {
  yield takeLatest(Actions.fetchAccounts, fetchAccounts);
}

function* fetchAccounts(): Saga<void> {
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

function transformAccount(account: HledgerAccount) {
  return {
    name: account.aname,
    amounts: account.aibalance.map(transformAmount),
    children: account.asubs.map(transformAccount)
  };
}
