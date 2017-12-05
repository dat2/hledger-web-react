import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Root extends Component {
  static propTypes = {
    accounts: PropTypes.object.isRequired,
    fetchAccountNames: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.fetchAccountNames();
  }

  render() {
    return <pre>{ JSON.stringify(this.props.accounts, null, 4) }</pre>;
  }
}

export default Root;
