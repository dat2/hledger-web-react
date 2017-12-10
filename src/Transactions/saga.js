// @flow

import { all, call, put, takeEvery } from 'redux-saga/effects';
import type { Saga } from 'redux-saga';
import localforage from 'localforage';

import { transformAmount } from '../Currency';
import type { HledgerAmount, Amount } from '../Currency';
import Actions from './actions';

export default function* transactionsSaga(): Saga<void> {
  yield all([
    takeEvery(Actions.loadTransactions, getTransactions),
    takeEvery(Actions.fetchTransactions, fetchTransactions),
    takeEvery(Actions.loadTransactionsSuccess, cacheTransactions)
  ]);
}

function* getTransactions(): Saga<void> {
  const cached = yield call(() => localforage.getItem('transactions'));
  if (cached) {
    yield put(
      Actions.loadTransactionsSuccess({ data: cached, isCached: true })
    );
  } else {
    yield* fetchTransactions();
  }
}

function* fetchTransactions(): Saga<void> {
  try {
    // just in case things are updated, we'll just dispatch it twice, and let things
    // like reselect prevent re-renders
    const response = yield call(fetch, '/api/v1/transactions');
    const json = yield call(() => response.json());
    const data = yield call(transformApiResponse, json);
    yield put(Actions.loadTransactionsSuccess({ data, isCached: false }));
  } catch (e) {
    yield put(Actions.loadTransactionsFailed(e));
  }
}

type HledgerTransaction = {
  tdate: string,
  tdescription: string,
  tpostings: Array<HledgerPosting>
};

type Transaction = {
  date: string,
  description: string,
  postings: Array<Posting>
};

type HledgerPosting = {
  paccount: string,
  pamount: Array<HledgerAmount>
};

type Posting = {
  account: string,
  amounts: Array<Amount>
};

function transformApiResponse(data) {
  return data.map(transformTransaction);
}

function transformTransaction(transaction: HledgerTransaction): Transaction {
  return {
    date: transaction.tdate,
    description: transaction.tdescription,
    postings: transaction.tpostings.map(transformPosting)
  };
}

function transformPosting(posting: HledgerPosting): Posting {
  return {
    account: posting.paccount,
    amounts: posting.pamount.map(transformAmount)
  };
}

function* cacheTransactions({ payload: { data } }): Saga<void> {
  yield call(() => localforage.setItem('transactions', data));
}
