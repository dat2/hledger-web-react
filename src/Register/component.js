// @flow

// 3rd-party imports

import React from 'react';
import * as R from 'ramda';

// component
import type { RegisterProps } from './types';
import { Currency } from '../Currency';

const AccountsList = ({ accounts }) =>
  accounts.map((account, index) => (
    <div key={`${account}-${index}`}>
      {account}
      <br />
    </div>
  ));

const AmountsList = ({ amounts }) =>
  amounts.map((amount, index) => (
    <div key={`${amount.quantity}-${index}`}>
      {new Currency(amount).format()}
      <br />
    </div>
  ));

const RegisterRow = ({ date, description, postings }) => (
  <tr className="stripe-dark">
    <td className="tl">{date}</td>
    <td className="tl mw6">{description}</td>
    <td className="tl">
      <AccountsList accounts={postings.map(p => p.account)} />
    </td>
    <td className="tr">
      <AmountsList amounts={R.flatten(postings.map(p => p.amounts))} />
    </td>
  </tr>
);

const Register = ({ transactions }: RegisterProps) => {
  return (
    <div className="w-100 h-100 overflow-auto">
      <table className="w-100 overflow-auto">
        <thead>
          <tr className="bb b--black-20">
            <th className="tl">Date</th>
            <th className="tl">Description</th>
            <th className="tl">Accounts</th>
            <th className="tr">Amount</th>
          </tr>
        </thead>
        <tbody className="lh-copy">
          {transactions.map((transaction, index) => (
            <RegisterRow key={index} {...transaction} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Register;
