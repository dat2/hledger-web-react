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
  const monthlyTransactionAccounts = data.map(({ date, postings }) => ({
    accounts: flattenPostingsToRootAccounts(groupByRootAccount(postings)),
    month: format(startOfMonth(date), 'YYYY-MM-DD')
  }));

  const monthlyAccountData = addDefaultValues(
    flattenMonthlyAccounts(groupByMonth(monthlyTransactionAccounts))
  );

  const lineChartData = makeLineChartData(monthlyAccountData);

  const accumulated = accumulateLineChartData(lineChartData);

  yield put(Actions.computeLineChartData(accumulated));
}

const groupByRootAccount = R.groupBy(
  R.compose(R.takeWhile(c => c !== ':'), R.prop('account'))
);

const sumPostingAmounts = R.compose(
  R.sum,
  R.map(R.compose(Number, R.prop('amounts')))
);

const flattenPostingsToRootAccounts = R.map(sumPostingAmounts);

const groupByMonth = R.groupBy(R.prop('month'));

const flattenMonthlyAccounts = R.map(
  R.compose(R.reduce(R.mergeWith(R.add), {}), R.map(R.prop('accounts')))
);

const defaultRootAccounts = {
  assets: 0,
  equity: 0,
  expenses: 0,
  income: 0,
  liabilities: 0
};

const addDefaultValues = R.map(R.merge(defaultRootAccounts));

const putDateIntoObject = R.mapObjIndexed((obj, value) =>
  R.assoc('date', value, obj)
);

const makeLineChartData = R.compose(
  R.map(R.head),
  R.map(R.tail),
  R.toPairs,
  putDateIntoObject
);

const accumulateLineChartData = R.compose(
  R.tail,
  R.scan(
    R.mergeWith((a, b) => (R.is(String, b) ? b : R.add(a, b))),
    defaultRootAccounts
  )
);
