// @flow

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Accounts from '../Accounts';
import Transactions from '../Transactions';
import component from './component';
import type { RootProps } from './types';

function mapDispatchToProps(dispatch): RootProps {
  return bindActionCreators(
    {
      fetchAccounts: Accounts.actions.fetchAccounts,
      loadTransactions: Transactions.actions.loadTransactions
    },
    dispatch
  );
}

export default connect(undefined, mapDispatchToProps)(component);
