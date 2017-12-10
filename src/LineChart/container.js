import { connect } from 'react-redux';

import Selectors from './selectors';
import Component from './component';

function mapStateToProps(state) {
  return {
    data: Selectors.lineChartData(state)
  };
}

export default connect(mapStateToProps)(Component);
