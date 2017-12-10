import { takeEvery } from 'redux-saga/effects';

import Transactions from '../Transactions';

export default function* chartsSaga() {
  yield takeEvery(Transactions.actions.loadTransactionsSuccess, computeChartData);
}

function* computeChartData({ payload }) {
}
