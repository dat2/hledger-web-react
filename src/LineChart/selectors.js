// @flow

import * as R from 'ramda';

export const key = 'charts';

const localState = R.prop(key);

const lineChartData = R.compose(R.prop('lineChartData'), localState);

export default {
  localState,
  lineChartData
};
