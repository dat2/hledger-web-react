// @flow

import * as R from 'ramda';

export const key = 'expensesChart';

const localState = R.prop(key);

const expensesChartData = R.compose(R.prop('data'), localState);

export default {
  localState,
  expensesChartData
};
