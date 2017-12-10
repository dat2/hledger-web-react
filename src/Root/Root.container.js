import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Accounts from '../Accounts';

import Root from './Root.component';
import Actions from './Root.actions';

function mapStateToProps(state) {
  return {
    accounts: state.accounts
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchAccounts: Accounts.actions.fetchAccounts,
      loadTransactions: Actions.loadTransactions,
      invalidateTransactionsCache: Actions.invalidateTransactionsCache
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Root);
