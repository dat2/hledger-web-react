import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Root extends Component {
  static propTypes = {
    accounts: PropTypes.object.isRequired,
    fetchAccounts: PropTypes.func.isRequired,
    loadTransactions: PropTypes.func.isRequired,
    invalidateTransactionsCache: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.fetchAccounts();
    this.props.loadTransactions();
  }

  render() {
    return (
      <div>
        <button onClick={() => this.props.invalidateTransactionsCache()}>
          Invalidate
        </button>
        <pre>{JSON.stringify(this.props.accounts, null, 4)}</pre>
      </div>
    );
  }
}

export default Root;
