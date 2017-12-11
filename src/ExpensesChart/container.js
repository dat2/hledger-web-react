// @flow

import { connect } from 'react-redux';

import selectors from './selectors';
import component from './component';

function mapStateToProps(state) {
  return {
    data: selectors.expensesChartData(state)
  };
}

export default connect(mapStateToProps)(component);
