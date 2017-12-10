import { put, takeEvery } from 'redux-saga/effects';
import startOfMonth from 'date-fns/start_of_month';
import format from 'date-fns/format';
import * as R from 'ramda';

import Transactions from '../Transactions';

import Actions from './actions';

export default function* chartsSaga() {
  yield takeEvery(
    Transactions.actions.loadTransactionsSuccess,
    computeLineChartData
  );
}

function* computeLineChartData({ payload: { data } }) {
  yield put(Actions.computeLineChartData(makeLineChartData(data)));
}

// take a list of transactions, pick out the postings, and group them by month
// [{postings:[], date}] -> {month:[postings]}
const groupPostingsByMonth = R.reduceBy(
  (acc, o) => acc.concat(o.postings),
  [],
  R.compose(date => format(date, 'YYYY-MM-DD'), startOfMonth, R.prop('date'))
);

// take an array of postings, group them by rootAccount
// {month:[{account, amounts}]} -> {month:{rootAccount:[amounts]}}
const groupByRootAccounts = R.map(
  R.reduceBy(
    (acc, o) => acc.concat(o.amounts),
    [],
    R.compose(R.takeWhile(c => c !== ':'), R.prop('account'))
  )
);

// take an object of {rootAccount:[amounts]} and sum the amounts
// {month:{rootAccount:[amounts]}} -> {month:{rootAccount:amount}}
const sumAmounts = R.map(R.map(R.compose(R.sum, R.map(Number))));

const defaultRootAccounts = {
  assets: 0,
  equity: 0,
  expenses: 0,
  income: 0,
  liabilities: 0
};

// take an object of {rootAccount:amount} and insert 0 for missing accounts
// {month:{rootAccount:amount}} -> {month:{rootAccount:amount}}
const insertDefaults = R.map(R.merge(defaultRootAccounts));

// take an object of {month:{rootAccount:amount}} and insert month into the object
// {month:{rootAccount:amount}} -> [{rootAccount:amount, month}]
const unGroup = R.compose(
  R.values,
  R.mapObjIndexed((value, date) => R.assoc('month', date, value))
);

// take an array of [{rootAccount:amount, month}] and add each account with the
// previous months total
// [{rootAccount:amount, month}] -> [{rootAccount:amount, month}]
// eg. [{assets:100, month: '2017-01-01'}, {assets:200, month:'2017-02-01'}, {assets:-100, month:'2017-03-01'}]
//  => [{assets:100, month: '2017-01-01'}, {assets:300, month:'2017-02-01'}, {assets:200, month:'2017-03-01'}]
const makeAccumulating = R.compose(
  R.tail,
  // the R.is(String) handles the 'month' key
  R.scan(
    R.mergeWith((a, b) => (R.is(String, b) ? b : R.add(a, b))),
    defaultRootAccounts
  )
);

// take a list of transactions, turn them into [{rootAccount:amount, month}]
// for the line chart to display
const makeLineChartData = R.compose(
  makeAccumulating,
  unGroup,
  insertDefaults,
  sumAmounts,
  groupByRootAccounts,
  groupPostingsByMonth
);
