// @flow

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Actions from './actions';
import selectors from './selectors';
import component from './component';

function mapStateToProps(state) {
  return {
    transactions: selectors.transactions(state),
    filter: selectors.filter(state)
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      parseFilter: Actions.parseFilter
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(component);
