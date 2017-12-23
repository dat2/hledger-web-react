// @flow

import { connect } from 'react-redux';

import selectors from './selectors';
import component from './component';
import type { ReduxState } from '../types';
import type { LineChartProps } from './types';

function mapStateToProps(state: ReduxState): LineChartProps {
  return {
    data: selectors.lineChartData(state)
  };
}

export default connect(mapStateToProps)(component);
