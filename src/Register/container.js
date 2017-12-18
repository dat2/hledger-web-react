// @flow

import { connect } from 'react-redux';

import Transactions from '../Transactions';

import component from './component';

function mapStateToProps(state) {
  return {
    transactions: Transactions.selectors.transactions(state)
  };
}

export default connect(mapStateToProps)(component);
