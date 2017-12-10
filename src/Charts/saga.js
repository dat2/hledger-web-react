import { put, takeEvery } from 'redux-saga/effects';
import moment from 'moment';
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
    month: moment(date)
      .startOf('month')
      .format('YYYY-MM-DD')
  }));

  const monthlyAccountData = addDefaultValues(
    flattenMonthlyAccounts(groupByMonth(monthlyTransactionAccounts))
  );

  const lineChartData = makeLineChartData(monthlyAccountData);

  yield put(Actions.computeLineChartData(lineChartData));
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

const putDateIntoObject = R.mapObjIndexed((obj, key) =>
  R.assoc('date', key, obj)
);

const makeLineChartData = R.compose(
  R.map(R.tail),
  R.toPairs,
  putDateIntoObject
);
