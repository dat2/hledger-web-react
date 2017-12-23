// @flow

import { put, takeEvery } from 'redux-saga/effects';
import { startOfMonth, format } from 'date-fns';
import {
  assoc,
  compose,
  map,
  reduceBy,
  takeWhile,
  prop,
  mapObjIndexed,
  scan,
  mergeWith,
  is,
  add,
  tail,
  values,
  merge,
  sum
} from 'ramda';
import type { Saga } from 'redux-saga';

import Transactions from '../Transactions';
import Actions from './actions';

import type { Transaction } from '../Transactions/types';
import type { DataPoint } from './types';

export default function* chartsSaga(): Saga<void> {
  yield takeEvery(
    Transactions.actions.loadTransactionsSuccess,
    computeLineChartData
  );
}

function* computeLineChartData({ payload: { data } }): Saga<void> {
  yield put(Actions.computeLineChartData(makeLineChartData(data)));
}

// take a list of transactions, pick out the postings, and group them by month
// [{postings:[], date}] -> {month:[postings]}
const groupPostingsByMonth = reduceBy(
  (acc, o) => acc.concat(o.postings),
  [],
  compose(date => format(date, 'YYYY-MM-DD'), startOfMonth, prop('date'))
);

// take an array of postings, group them by rootAccount
// {month:[{account, amounts}]} -> {month:{rootAccount:[amounts]}}
const groupByRootAccounts = map(
  reduceBy(
    (acc, o) => acc.concat(o.amounts),
    [],
    compose(takeWhile(c => c !== ':'), prop('account'))
  )
);

// take an object of {rootAccount:[amounts]} and sum the amounts
// {month:{rootAccount:[amounts]}} -> {month:{rootAccount:amount}}
const sumAmounts = map(map(compose(sum, map(prop('quantity')))));

const defaultRootAccounts = {
  assets: 0,
  equity: 0,
  expenses: 0,
  income: 0,
  liabilities: 0
};

// take an object of {rootAccount:amount} and insert 0 for missing accounts
// {month:{rootAccount:amount}} -> {month:{rootAccount:amount}}
const insertDefaults = map(merge(defaultRootAccounts));

// take an object of {month:{rootAccount:amount}} and insert month into the object
// {month:{rootAccount:amount}} -> [{rootAccount:amount, month}]
const unGroup = compose(
  values,
  mapObjIndexed((value, date) => assoc('month', date, value))
);

const makeIncomePositive = map(
  mapObjIndexed((value, key) => (key === 'income' ? Math.abs(value) : value))
);

// take an array of [{rootAccount:amount, month}] and add each account with the
// previous months total
// [{rootAccount:amount, month}] -> [{rootAccount:amount, month}]
// eg. [{assets:100, month: '2017-01-01'}, {assets:200, month:'2017-02-01'}, {assets:-100, month:'2017-03-01'}]
//  => [{assets:100, month: '2017-01-01'}, {assets:300, month:'2017-02-01'}, {assets:200, month:'2017-03-01'}]
const makeAccumulating = compose(
  tail,
  // the is(String) handles the 'month' key
  scan(
    mergeWith((a, b) => (is(String, b) ? b : add(a, b))),
    defaultRootAccounts
  )
);

// take a list of transactions, turn them into [{rootAccount:amount, month}]
// for the line chart to display
const makeLineChartData: (Array<Transaction>) => Array<DataPoint> = compose(
  makeAccumulating,
  makeIncomePositive,
  unGroup,
  insertDefaults,
  sumAmounts,
  groupByRootAccounts,
  groupPostingsByMonth
);
