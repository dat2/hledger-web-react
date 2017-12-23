// @flow

import { compose, prop } from 'ramda';

import type { ReduxState } from '../types';
import type { TransactionsState, Transaction } from './types';

const localState: ReduxState => TransactionsState = prop('transactions');

const transactions: ReduxState => Array<Transaction> = compose(
  prop('data'),
  localState
);

export default {
  localState,
  transactions
};
