import PropTypes from 'prop-types';
import React, { Component } from 'react';

import Accounts from '../Accounts';

class Root extends Component {
  static propTypes = {
    accounts: PropTypes.object.isRequired,
    fetchAccounts: PropTypes.func.isRequired,
    loadTransactions: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.fetchAccounts();
    this.props.loadTransactions();
  }

  render() {
    return (
      <div>
        <Accounts.Container />
      </div>
    );
  }
}

export default Root;
