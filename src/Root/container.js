import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Transactions from '../Transactions';

import component from './component';

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getTransactions: Transactions.actions.getTransactions,
    },
    dispatch
  );
}

export default connect(undefined, mapDispatchToProps)(component);
