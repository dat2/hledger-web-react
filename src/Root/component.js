// @flow

// 3rd-party imports
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { lifecycle } from 'recompose';

// local imports
import NotFound from '../NotFound';
import Dashboard from '../Dashboard';
import HomePage from '../HomePage';

const Root = () => (
  <Router>
    <Switch>
      <Route path="/" component={HomePage.Component} />
      <Route exact path="/ui-proposal" component={Dashboard.Component} />
      <Route component={NotFound.Component} />
    </Switch>
  </Router>
);

const enhance = lifecycle({
  componentDidMount() {
    this.props.fetchAccounts();
    this.props.loadTransactions();
  }
});

export default enhance(Root);
