// @flow

import type { Transaction } from '../Transactions/types';
import type { Amount } from '../Currency/types';

export type RegisterProps = {
  +transactions: Array<Transaction>,
  +filter: Filter,
  +parseFilter: string => void
};

export type FilterPairs = {
  +account?: string,
  +amount?: string,
  +date?: string,
  +description?: string
};

export type Filter = {
  +account: RegExp,
  +amount: AmountFilter,
  +date: RegExp,
  +description: RegExp
};

export type AmountFilter = {
  +type: 'GT' | 'EQ' | 'LT' | 'NA',
  +amount: number
};

export type RegisterState = {
  +filter: Filter
};
