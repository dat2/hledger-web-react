// @flow

import * as R from 'ramda';

export const key = 'accounts';

const localState = R.prop(key);

const allAccounts = R.prop('accounts');

export default {
  localState,
  allAccounts: R.compose(allAccounts, localState)
};
