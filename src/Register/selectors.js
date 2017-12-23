// @flow

import { createSelector } from 'reselect';
import * as R from 'ramda';

import Transactions from '../Transactions';
import { applyFilter } from './filter';

export const key = 'register';

const localState = R.prop(key);

const filter = R.compose(R.prop('filter'), localState);

const transactions = createSelector(
  Transactions.selectors.transactions,
  filter,
  applyFilter
);

export default {
  localState,
  transactions,
  filter
};
