// @flow

// 3rd-party imports

import { Column, Table } from 'react-virtualized';
import * as R from 'ramda';
import React from 'react';
import sizeMe from 'react-sizeme';
import { compose, withHandlers, withPropsOnChange, withState } from 'recompose';

// component
import type { RegisterProps } from './types';
import { Currency } from '../Currency';

function highlight(filter, string) {
  const match = string.match(filter);
  if (match === null) {
    return <span key="-1">{string}</span>;
  } else {
    return [
      <span key="0">{string.substring(0, match.index)}</span>,
      <span className="b" key="1">
        {match[0]}
      </span>,
      <span key="2">{string.substring(match.index + match[0].length)}</span>
    ];
  }
}

const AccountsList = filter => ({ cellData }) =>
  cellData
    .map(p => p.account)
    .filter(account => filter.account.test(account))
    .map((account, index) => (
      <div key={`${account}-${index}`}>
        {highlight(filter.account, account)}
        <br />
      </div>
    ));

const highlightCell = filter => ({ cellData }) => highlight(filter, cellData);

const AmountsList = filter => ({ cellData }) =>
  R.flatten(
    cellData.filter(p => filter.account.test(p.account)).map(p => p.amounts)
  ).map((amount, index) => (
    <div key={`${amount.quantity}-${index}`}>
      {new Currency(amount).format()}
      <br />
    </div>
  ));

const Register = ({
  size,
  transactions,
  getVisiblePostings,
  renderAccounts,
  renderAmounts,
  renderDate,
  renderDescription,
  value,
  onChange
}: RegisterProps) => {
  return (
    <div className="w-100 h-100">
      <input className="w-100" onChange={onChange} value={value} />
      <Table
        headerHeight={30}
        height={size.height}
        rowClassName={({ index }) => (index === -1 ? '' : 'stripe-dark')}
        rowCount={transactions.length}
        rowGetter={({ index }) => transactions[index]}
        rowHeight={({ index }) => getVisiblePostings(transactions[index]) * 20}
        width={size.width}
      >
        <Column
          cellRenderer={renderDate}
          dataKey="date"
          label="Date"
          width={size.width * 0.1}
        />
        <Column
          cellRenderer={renderDescription}
          dataKey="description"
          label="Description"
          width={size.width * 0.4}
        />
        <Column
          cellRenderer={renderAccounts}
          dataKey="postings"
          label="Accounts"
          width={size.width * 0.3}
        />
        <Column
          cellRenderer={renderAmounts}
          className="tr"
          dataKey="postings"
          headerClassName="tr"
          label="Amounts"
          width={size.width * 0.2}
        />
      </Table>
    </div>
  );
};

const enhance = compose(
  withState('value', 'setValue', ''),
  withHandlers({
    onChange: props => e => {
      const value = e.target.value;
      props.setValue(value);
      props.parseFilter(value);
    }
  }),
  withPropsOnChange(['filter'], props => ({
    renderAccounts: AccountsList(props.filter),
    renderAmounts: AmountsList(props.filter),
    renderDate: highlightCell(props.filter.date),
    renderDescription: highlightCell(props.filter.description),
    getVisiblePostings: transaction =>
      transaction.postings.filter(p => props.filter.account.test(p.account))
        .length
  })),
  sizeMe({ monitorHeight: true })
);

export default enhance(Register);
