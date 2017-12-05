import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Root extends Component {
  static propTypes = {
    fetchAccountNames: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.fetchAccountNames();
  }

  render() {
    return <div>Hello World</div>;
  }
}

export default Root;
