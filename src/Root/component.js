// @flow

// 3rd-party imports

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// local imports

import NotFound from '../NotFound';
import Dashboard from '../Dashboard';
import Accounts from '../Accounts';

type Props = {
  // TODO: change this type
  accounts: any,
  fetchAccounts: () => void,
  loadTransactions: () => void
};

class Root extends Component<Props> {
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
      <Router>
        <Switch>
          <Route exact path={'/'} component={Accounts.Container} />
          <Route exact path={'/ui-proposal'} component={Dashboard.Component} />
          <Route component={NotFound.Component} />
        </Switch>
      </Router>
    );
  }
}

export default Root;
