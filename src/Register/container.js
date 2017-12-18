// @flow

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Actions from './actions';
import selectors from './selectors';
import component from './component';

function mapStateToProps(state) {
  return {
    transactions: selectors.transactions(state),
    query: selectors.query(state)
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      setQuery: Actions.setQuery
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(component);
