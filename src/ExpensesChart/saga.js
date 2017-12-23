// @flow

import { put, takeEvery } from 'redux-saga/effects';
import type { Saga } from 'redux-saga';

import {
  isAfter,
  isBefore,
  isEqual,
  startOfMonth,
  endOfMonth,
  addDays,
  subMonths,
  format
} from 'date-fns';

import {
  curry,
  compose,
  both,
  startsWith,
  any,
  prop,
  filter,
  values,
  mapObjIndexed,
  sum,
  map,
  merge,
  reduceBy,
  partition,
  zipWith,
  tail,
  scan,
  mergeWith,
  is,
  add,
  mergeAll,
  apply
} from 'ramda';

import Transactions from '../Transactions';
import type { Transaction } from '../Transactions/types';
import Actions from './actions';

export default function* expensesSaga(): Saga<void> {
  yield takeEvery(
    Transactions.actions.loadTransactionsSuccess,
    computeExpensesChartData
  );
}

function* computeExpensesChartData({ payload: { data } }): Saga<void> {
  yield put(Actions.computeExpensesChartData(makeExpensesChartData(data)));
}

const gte = curry(
  (a: Date, b: Date): boolean => isAfter(a, b) || isEqual(a, b)
);
const lte = curry(
  (a: Date, b: Date): boolean => isBefore(a, b) || isEqual(a, b)
);

function* dayRangeGenerator(startDate, endDate) {
  let currentDate = startDate;
  while (isBefore(currentDate, endDate)) {
    yield currentDate;
    currentDate = addDays(currentDate, 1);
  }
}

const dayRange = (...args) => Array.from(dayRangeGenerator(...args));

// take a transaction {date} and return true if start <= date <= end
const isDateWithinRange = (start: Date, end: Date): boolean =>
  compose(both(lte(start), gte(end)), prop('date'));

// take a transaction {postings:[{account}]}, and return true if any one of
// the postings starts with 'expenses'
const isExpense: Transaction => boolean = compose(
  any(compose(startsWith('expenses'), prop('account'))),
  prop('postings')
);

const filterRelevantTransactions = (start: Date, end: Date): boolean =>
  filter(both(isDateWithinRange(start, end), isExpense));

// convert [{date, postings:[{account, amounts:[{quantity}]}]}] into
// [{date, expenses}]
const convertToChartData = defaults =>
  compose(
    // pick out the objects
    values,
    // put the keys into the object
    mapObjIndexed((expenses, date) => ({ expenses, date })),
    // make sure every day has at least 0
    merge(defaults),
    // pick out the sum of the quantities
    map(compose(sum, map(map(prop('quantity'))), map(prop('amounts')))),
    // filter transactions to just expenses
    map(filter(compose(startsWith('expenses'), prop('account')))),
    // group by date
    reduceBy((acc, o) => acc.concat(o.postings), [], prop('date'))
  );

// partition the transactions into [currentMonth, previousMonth]
const partitionToMonths = start =>
  partition(compose(d => gte(d, start), prop('date')));

// turn [[{expenses, date}], [{expenses,date}]] => [{currentExpenses, currentDate, previousExpenses, previousDate}]
const zipToOneObj = zipWith((current, previous) => ({
  currentExpenses: current.expenses,
  currentDate: current.date,
  previousExpenses: previous.expenses,
  previousDate: previous.date
}));

//
const makeAccumulating = (currentMonthStart, previousMonthStart) =>
  compose(
    tail,
    // the is(String) handles the 'month' key
    scan(mergeWith((a, b) => (is(String, b) ? b : add(a, b))), {
      currentExpenses: 0,
      currentDate: currentMonthStart,
      previousExpenses: 0,
      previousDate: previousMonthStart
    })
  );

const makeExpensesChartData = data => {
  const previousMonthStart = startOfMonth(subMonths(new Date(), 1));
  const currentMonthStart = startOfMonth(new Date());
  const currentMonthEnd = endOfMonth(new Date());

  const defaults = mergeAll(
    map(
      date => ({ [format(date, 'YYYY-MM-DD')]: 0 }),
      dayRange(previousMonthStart, currentMonthEnd)
    )
  );

  return compose(
    makeAccumulating(
      format(currentMonthStart, 'YYYY-MM-DD'),
      format(previousMonthStart, 'YYYY-MM-DD')
    ),
    apply(zipToOneObj),
    partitionToMonths(currentMonthStart),
    convertToChartData(defaults),
    filterRelevantTransactions(previousMonthStart, currentMonthEnd)
  )(data);
};
