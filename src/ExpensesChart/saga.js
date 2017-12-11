// @flow

import { put, takeEvery } from 'redux-saga/effects';
import type { Saga } from 'redux-saga';

import isAfter from 'date-fns/is_after';
import isBefore from 'date-fns/is_before';
import isEqual from 'date-fns/is_equal';
import startOfMonth from 'date-fns/start_of_month';
import endOfMonth from 'date-fns/end_of_month';
import addDays from 'date-fns/add_days';
import subDays from 'date-fns/sub_days';
import subMonths from 'date-fns/sub_months';
import format from 'date-fns/format';

import * as R from 'ramda';

import Transactions from '../Transactions';
import type { Transaction } from '../Transactions/types';

const gte = R.curry((a, b) => isAfter(a, b) || isEqual(a, b));
const lte = R.curry((a, b) => isBefore(a, b) || isEqual(a, b));

function* dayRangeGenerator(startDate, endDate) {
  let currentDate = startDate;
  while (isBefore(currentDate, endDate)) {
    yield currentDate;
    currentDate = addDays(currentDate, 1);
  }
}

const dayRange = (...args) => Array.from(dayRangeGenerator(...args));

export default function* expensesSaga(): Saga<void> {
  yield takeEvery(
    Transactions.actions.loadTransactionsSuccess,
    computeExpensesChartData
  );
}

function* computeExpensesChartData({ payload: { data } }): Saga<void> {
  const expensesChartData = makeExpensesChartData(data);
  console.log(expensesChartData);
}

// take a transaction {date} and return true if start <= date <= end
const isDateWithinRange = (start, end) =>
  R.compose(R.both(lte(start), gte(end)), R.prop('date'));

// take a transaction {postings:[{account}]}, and return true if any one of
// the postings starts with 'expenses'
const isExpense = R.compose(
  R.any(R.compose(R.startsWith('expenses'), R.prop('account'))),
  R.prop('postings')
);

const filterRelevantTransactions = (start, end) =>
  R.filter(R.both(isDateWithinRange(start, end), isExpense));

// convert [{date, postings:[{account, amounts:[{quantity}]}]}] into
// [{date, expenses}]
const convertToChartData = defaults =>
  R.compose(
    // pick out the objects
    R.values,
    // put the keys into the object
    R.mapObjIndexed((expenses, date) => ({ expenses, date })),
    // make sure every day has at least 0
    R.merge(defaults),
    // pick out the sum of the quantities
    R.map(
      R.compose(
        R.sum,
        R.map(R.map(R.prop('quantity'))),
        R.map(R.prop('amounts'))
      )
    ),
    // filter transactions to just expenses
    R.map(R.filter(R.compose(R.startsWith('expenses'), R.prop('account')))),
    // group by date
    R.reduceBy((acc, o) => acc.concat(o.postings), [], R.prop('date'))
  );

// partition the transactions into [currentMonth, previousMonth]
const partitionToMonths = start =>
  R.partition(R.compose(d => isAfter(start, d), R.prop('date')));

const makeExpensesChartData = data => {
  const previousMonthStart = startOfMonth(subMonths(new Date(), 1));
  const previousMonthEnd = endOfMonth(subMonths(new Date(), 1));
  const currentMonthStart = startOfMonth(new Date());
  const currentMonthEnd = endOfMonth(new Date());

  const defaults = R.mergeAll(
    R.map(
      date => ({ [format(date, 'YYYY-MM-DD')]: 0 }),
      dayRange(previousMonthStart, currentMonthEnd)
    )
  );

  return R.compose(
    partitionToMonths(currentMonthStart),
    convertToChartData(defaults),
    filterRelevantTransactions(previousMonthStart, currentMonthEnd)
  )(data);
};
