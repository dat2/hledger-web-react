// @flow

import { connect } from 'react-redux';

import selectors from './selectors';
import component from './component';

function mapStateToProps(state) {
  return {
    accounts: selectors.allAccounts(state)
  };
}

export default connect(mapStateToProps)(component);
