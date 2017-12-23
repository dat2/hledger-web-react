// @flow

import { compose, prop } from 'ramda';

import type { ReduxState } from '../types';
import type { AccountsState, Account } from './types';

const localState: ReduxState => AccountsState = prop('accounts');

const accounts: AccountsState => Array<Account> = prop('accounts');

const allAccounts = compose(accounts, localState);

export default {
  localState,
  allAccounts
};
