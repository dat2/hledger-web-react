// @flow

import { compose, prop } from 'ramda';

import type { ReduxState } from '../types';
import type { LineChartState, DataPoint } from './types';

const localState: ReduxState => LineChartState = prop('lineChart');

const lineChartData: ReduxState => Array<DataPoint> = compose(
  prop('data'),
  localState
);

export default {
  localState,
  lineChartData
};
