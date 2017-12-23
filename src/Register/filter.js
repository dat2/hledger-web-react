// @flow

import { compose, fromPairs, map, split, T } from 'ramda';
import { renameKeys } from 'ramda-adjunct';

import type { Transaction } from '../Transactions/types';
import type { FilterPairs, Filter, AmountFilter } from './types';

function parseAmountFilter(amountFilter: string): AmountFilter {
  if (amountFilter[0] === '>') {
    return { type: 'GT', amount: parseFloat(amountFilter.substring(1)) };
  } else if (amountFilter[0] === '<') {
    return { type: 'LT', amount: parseFloat(amountFilter.substring(1)) };
  } else if (amountFilter.length > 0) {
    return { type: 'EQ', amount: parseFloat(amountFilter) };
  } else {
    return { type: 'NA', amount: 0 };
  }
}

export function makeFilter(filters: FilterPairs): Filter {
  return {
    account: new RegExp(filters.account, 'i'),
    amount: parseAmountFilter(filters.amount),
    date: new RegExp(filters.date, 'i'),
    description: new RegExp(filters.description, 'i')
  };
}

const parseColonSeparated: string => FilterPairs = compose(
  renameKeys({ acct: 'account', desc: 'description' }),
  fromPairs,
  map(split(':')),
  split(/\s/)
);

export function parseFilter(filter: string): Filter {
  return makeFilter(parseColonSeparated(filter));
}

function getAmountFilterFunction({
  type,
  amount
}: AmountFilter): number => boolean {
  if (type === 'GT') {
    return a => a > amount;
  } else if (type === 'EQ') {
    return a => a === amount;
  } else if (type === 'LT') {
    return a => a < amount;
  } else {
    return T;
  }
}

export function applyFilter(
  transactions: Array<Transaction>,
  filter: Filter
): Array<Transaction> {
  const amountFilterFn = getAmountFilterFunction(filter.amount);
  return transactions
    .filter(t => t.postings.some(p => filter.account.test(p.account)))
    .filter(t => filter.description.test(t.description))
    .filter(t => filter.date.test(t.date))
    .filter(t =>
      t.postings.some(p =>
        p.amounts.some(amount => amountFilterFn(amount.quantity))
      )
    );
}
