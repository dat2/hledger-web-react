// @flow

// 3rd-party imports
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// local imports
import NotFound from '../NotFound';
import Dashboard from '../Dashboard';
import Accounts from '../Accounts';
import LineChart from '../LineChart';
import ExpensesChart from '../ExpensesChart';

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
          <Route exact path={'/'} component={Accounts.Container} />
          <Route exact path={'/chart'} component={LineChart.Container} />
          <Route
            exact
            path={'/expenses-chart'}
            component={ExpensesChart.Container}
          />
          <Route exact path={'/ui-proposal'} component={Dashboard.Component} />
          <Route component={NotFound.Component} />
        </Switch>
      </Router>
    );
  }
}

export default Root;
