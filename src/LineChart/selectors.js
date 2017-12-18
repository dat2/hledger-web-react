// @flow

import * as R from 'ramda';

export const key = 'lineChart';

const localState = R.prop(key);

const lineChartData = R.compose(R.prop('data'), localState);

export default {
  localState,
  lineChartData
};
