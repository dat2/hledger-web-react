// @flow

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Accounts from '../Accounts';
import Transactions from '../Transactions';

import component from './component';

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchAccounts: Accounts.actions.fetchAccounts,
      loadTransactions: Transactions.actions.loadTransactions,
      invalidateTransactionsCache:
        Transactions.actions.invalidateTransactionsCache
    },
    dispatch
  );
}

export default connect(undefined, mapDispatchToProps)(component);
