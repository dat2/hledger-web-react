// @flow

// 3rd-party imports

import { Column, Table } from 'react-virtualized';
import * as R from 'ramda';
import React from 'react';
import sizeMe from 'react-sizeme';
import { compose, withHandlers, withPropsOnChange, withState } from 'recompose';

// component
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

const renderAccounts = ({ cellData: { accounts, filter } }) =>
  accounts.map((account, index) => (
    <div key={`${account}-${index}`}>
      {highlight(filter, account)}
      <br />
    </div>
  ));

const highlightCell = filter => ({ cellData }) => highlight(filter, cellData);

const renderAmounts = ({ cellData }) =>
  cellData.map((amount, index) => (
    <div key={`${amount.quantity}-${index}`}>
      {new Currency(amount).format()}
      <br />
    </div>
  ));

const InnerRegister = ({
  size,
  transactions,
  getVisiblePostings,
  getAccountsCellData,
  getAmountsCellData,
  renderDate,
  renderDescription,
  value,
  onChange
}) => (
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
        cellDataGetter={getAccountsCellData}
        cellRenderer={renderAccounts}
        dataKey="postings"
        label="Accounts"
        width={size.width * 0.3}
      />
      <Column
        cellDataGetter={getAmountsCellData}
        cellRenderer={renderAmounts}
        dataKey="postings"
        label="Amounts"
        className="tr"
        headerClassName="tr"
        width={size.width * 0.2}
      />
    </Table>
  </div>
);

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
    getAccountsCellData: ({ dataKey, rowData }) => ({
      accounts: rowData[dataKey]
        .map(p => p.account)
        .filter(account => props.filter.account.test(account)),
      filter: props.filter.account
    }),
    getAmountsCellData: ({ dataKey, rowData }) =>
      R.flatten(
        rowData[dataKey]
          .filter(p => props.filter.account.test(p.account))
          .map(p => p.amounts)
      ),
    getVisiblePostings: transaction =>
      transaction.postings.filter(p => props.filter.account.test(p.account))
        .length,
    renderDate: highlightCell(props.filter.date),
    renderDescription: highlightCell(props.filter.description)
  })),
  sizeMe({ monitorHeight: true })
);

export default enhance(InnerRegister);
