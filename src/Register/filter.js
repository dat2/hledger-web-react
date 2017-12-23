import * as R from 'ramda';
import * as RA from 'ramda-adjunct';
import { format, parse } from 'date-fns';

export function makeFilter({ account = '', date = '', description = '' } = {}) {
  return {
    account: new RegExp(account, 'i'),
    date: new RegExp(date, 'i'),
    description: new RegExp(description, 'i')
  };
}

const parseColonSeparated = R.compose(
  RA.renameKeys({ acct: 'account', desc: 'description' }),
  R.fromPairs,
  R.map(R.split(':')),
  R.split(/\s/)
);

export function parseFilter(filter) {
  return makeFilter(parseColonSeparated(filter));
}

export function applyFilter(transactions, filter) {
  return transactions
    .filter(t => t.postings.some(p => filter.account.test(p.account)))
    .filter(t => filter.description.test(t.description))
    .filter(t => filter.date.test(t.date));
}
