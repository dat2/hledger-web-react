import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Transactions from '../Transactions';

import component from './component';

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      loadTransactions: Transactions.actions.loadTransactions
    },
    dispatch
  );
}

export default connect(undefined, mapDispatchToProps)(component);
