// @flow

import { connect } from 'react-redux';

import selectors from './selectors';
import component from './component';

import type { ReduxState } from '../types';
import type { ExpensesChartProps } from './types';

function mapStateToProps(state: ReduxState): ExpensesChartProps {
  return {
    data: selectors.expensesChartData(state)
  };
}

export default connect(mapStateToProps)(component);
