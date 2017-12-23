// @flow

import { createSelector } from 'reselect';
import { compose, prop } from 'ramda';

import Transactions from '../Transactions';
import type { Transaction } from '../Transactions/types';
import type { ReduxState } from '../types';
import { applyFilter } from './filter';
import type { Filter, RegisterState } from './types';

const localState: ReduxState => RegisterState = prop('register');

const filter: ReduxState => Filter = compose(prop('filter'), localState);

const transactions: ReduxState => Array<Transaction> = createSelector(
  Transactions.selectors.transactions,
  filter,
  applyFilter
);

export default {
  localState,
  transactions,
  filter
};
