// @flow

import type { StoreState } from '../configureStore';

export const key = 'accounts';

const localState = (state: StoreState) => state[key];

const allAccounts = accounts => accounts.accounts;

export default {
  localState,
  allAccounts: (state: StoreState) => allAccounts(localState(state))
};
