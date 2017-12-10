// @flow

// 3rd-party imports
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// local imports
import NotFound from '../NotFound';
import Dashboard from '../Dashboard';
import HomePage from '../HomePage';

type RootProps = {
  fetchAccounts: () => void,
  loadTransactions: () => void
};

class Root extends Component<RootProps> {
  componentDidMount() {
    this.props.fetchAccounts();
    this.props.loadTransactions();
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path={'/'} component={HomePage.Component} />
          <Route exact path={'/ui-proposal'} component={Dashboard.Component} />
          <Route component={NotFound.Component} />
        </Switch>
      </Router>
    );
  }
}

export default Root;
