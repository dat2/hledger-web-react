// @flow

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styled from 'styled-components';

const accountType = PropTypes.object;

type AccountsViewProps = {
  // TODO: change type
  accounts: Array<{ +name: string | number }>
};

class AccountsView extends Component<AccountsViewProps> {
  static propTypes = {
    accounts: PropTypes.arrayOf(accountType).isRequired
  };

  render() {
    return (
      <div>
        {this.props.accounts.map(account => (
          <AccountRow account={account} key={account.name} />
        ))}
      </div>
    );
  }
}

const Row = styled.div`
  display: flex;
  justify-content: space-between;
`;

const List = styled.ul`
  list-style: none;
  padding-left: 10px;
  cursor: ${props => (props.hasChildren ? 'pointer' : 'default')};
`;

const Item = styled.li`
  display: ${props => (props.hidden ? 'none' : 'block')};
`;

const Quantity = styled.span`
  color: ${props => (props.negative ? 'red' : 'inherit')};
`;

type AccountRowProps = {
  // TODO: change type
  account: any
};

type AccountRowState = {
  hidden: boolean
};

class AccountRow extends Component<AccountRowProps, AccountRowState> {
  static propTypes = {
    account: accountType.isRequired
  };

  state = {
    hidden: false
  };

  toggleHidden = event => {
    event.preventDefault();
    event.stopPropagation();
    this.setState(({ hidden }) => ({ hidden: !hidden }));
  };

  render() {
    const { name, quantities, children } = this.props.account;

    return (
      <List onClick={this.toggleHidden} hasChildren={children.length > 0}>
        <li>
          <Row>
            <span>{name}</span>
            <span>
              {quantities.map((quantity, index) => (
                <Quantity key={index} negative={quantity.quantity < 0}>
                  {quantity.format()}
                </Quantity>
              ))}
            </span>
          </Row>
        </li>
        <Item hidden={this.state.hidden}>
          {children.map(account => (
            <AccountRow account={account} key={account.name} />
          ))}
        </Item>
      </List>
    );
  }
}

export default AccountsView;
