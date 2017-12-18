// @flow

// 3rd-party imports

import { Column, Table } from 'react-virtualized';
import * as R from 'ramda';
import React from 'react';
import sizeMe from 'react-sizeme';

// component
import type { RegisterProps } from './types';
import { Currency } from '../Currency';

const AccountsList = ({ cellData }) =>
  cellData.map(p => p.account).map((account, index) => (
    <div key={`${account}-${index}`}>
      {account}
      <br />
    </div>
  ));

const AmountsList = ({ cellData }) =>
  R.flatten(cellData.map(p => p.amounts)).map((amount, index) => (
    <div key={`${amount.quantity}-${index}`}>
      {new Currency(amount).format()}
      <br />
    </div>
  ));

const Register = ({ size, transactions }: RegisterProps) => {
  return (
    <div className="w-100 h-100 overflow-auto">
      <Table
        headerHeight={30}
        height={size.height}
        rowClassName={({ index }) => (index === -1 ? '' : 'stripe-dark')}
        rowCount={transactions.length}
        rowGetter={({ index }) => transactions[index]}
        rowHeight={({ index }) => transactions[index].postings.length * 20}
        width={size.width}
      >
        <Column dataKey="date" label="Date" width={size.width * 0.1} />
        <Column
          dataKey="description"
          label="Description"
          width={size.width * 0.4}
        />
        <Column
          cellRenderer={AccountsList}
          dataKey="postings"
          label="Accounts"
          width={size.width * 0.3}
        />
        <Column
          cellRenderer={AmountsList}
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

export default sizeMe({ monitorHeight: true })(Register);
