import PropTypes from 'prop-types';
import React, { Component } from 'react';

import Accounts from '../Accounts';

class Root extends Component {
  static propTypes = {
    getTransactions: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.getTransactions();
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
