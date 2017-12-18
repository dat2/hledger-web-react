// @flow

import { createSelector } from 'reselect';
import * as R from 'ramda';

import Transactions from '../Transactions';

export const key = 'register';

const localState = R.prop(key);

const query = R.compose(R.prop('query'), localState);

const transactions = createSelector(
  Transactions.selectors.transactions,
  query,
  (transactions, query) =>
    transactions.filter(t =>
      t.postings.some(p =>
        p.account.toLowerCase().includes(query.toLowerCase())
      )
    )
);

export default {
  localState,
  transactions,
  query
};
