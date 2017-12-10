// @flow

export const key = 'accounts';

const localState = state => state[key];

const allAccounts = accounts => accounts.accounts;

export default {
  localState,
  allAccounts: state => allAccounts(localState(state))
};
