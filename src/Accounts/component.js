// @flow

import React, { Component } from 'react';
import styled from 'styled-components';
import { Currency } from '../Currency';
import type {
  AccountsViewProps,
  AccountRowProps,
  AccountRowState
} from './types';

const AccountsView = (props: AccountsViewProps) => (
  <div>
    {props.accounts.map(account => (
      <AccountRow account={account} key={account.name} />
    ))}
  </div>
);

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

class AccountRow extends Component<AccountRowProps, AccountRowState> {
  state = {
    hidden: false
  };

  toggleHidden = event => {
    event.preventDefault();
    event.stopPropagation();
    this.setState(({ hidden }) => ({ hidden: !hidden }));
  };

  render() {
    const { name, amounts, children } = this.props.account;

    return (
      <List onClick={this.toggleHidden} hasChildren={children.length > 0}>
        <li>
          <Row>
            <span>{name}</span>
            <span>
              {amounts.map((amount, index) => (
                <Quantity key={index} negative={amount.quantity < 0}>
                  {new Currency(amount).format()}
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
