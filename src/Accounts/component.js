// @flow

import React from 'react';
import cx from 'classnames';
import { compose, withHandlers, withState } from 'recompose';

import { Currency } from '../Currency';
import type { RootProps, NodeProps } from './types';

const Root = (props: RootProps) => (
  <div>
    {props.accounts.map(account => (
      <Node account={account} key={account.name} />
    ))}
  </div>
);

const InnerNode = ({
  account: { name, amounts, children },
  hidden,
  onClick
}: NodeProps) => (
  <ul className="list pl2">
    <li>
      <div
        className={cx('flex justify-between', { pointer: children.length > 0 })}
        onClick={onClick}
      >
        <span>{name}</span>
        <span>
          {amounts.map((amount, index) => (
            <span key={index} className={cx({ red: amount.quantity < 0 })}>
              {new Currency(amount).format()}
            </span>
          ))}
        </span>
      </div>
    </li>
    <li className={cx({ dn: hidden })}>
      {children.map(account => <Node account={account} key={account.name} />)}
    </li>
  </ul>
);

const enhance = compose(
  withState('hidden', 'setHidden', false),
  withHandlers({
    onClick: props => event => {
      event.preventDefault();
      event.stopPropagation();
      props.setHidden(!props.hidden);
    }
  })
);

const Node = enhance(InnerNode);

export default enhance(Root);
