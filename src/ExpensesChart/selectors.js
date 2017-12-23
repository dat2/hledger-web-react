// @flow

import { compose, prop } from 'ramda';

import type { ReduxState } from '../types';
import type { ExpensesChartState, DataPoint } from './types';

const localState: ReduxState => ExpensesChartState = prop('expensesChart');

const getData: ExpensesChartState => Array<DataPoint> = prop('data');

const expensesChartData = compose(getData, localState);

export default {
  localState,
  expensesChartData
};
