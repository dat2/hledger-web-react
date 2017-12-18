// @flow

// 3rd-party imports

import React from 'react';
import { Link, Redirect, Route, Switch } from 'react-router-dom';

import Accounts from '../Accounts';
import ExpensesChart from '../ExpensesChart';
import LineChart from '../LineChart';
import Register from '../Register';

const HomePage = () => {
  return (
    <div className="h-100 overflow-hidden flex flex-nowrap items-stretch">
      <div className="w-third pa2 overflow-y-scroll">
        <Accounts.Container />
      </div>
      <div className="w-two-thirds pa2">
        <div className="flex flex-column h-100 items-stretch">
          <nav className="w-100 pa3">
            <Link className="link dim dark-gray dib mr3" to="/net-worth">
              Total Net Worth
            </Link>
            <Link className="link dim dark-gray dib mr3" to="/expenses">
              Expenses
            </Link>
            <Link className="link dim dark-gray dib mr3" to="/register">
              Register
            </Link>
          </nav>
          <Switch>
            <Route exact path="/net-worth" component={LineChart.Container} />
            <Route path="/expenses" component={ExpensesChart.Container} />
            <Route path="/register" component={Register.Container} />
            <Redirect path="*" to="/net-worth" />
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
