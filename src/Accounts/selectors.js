import * as R from 'ramda';

export const key = 'accounts';

const localState = R.prop(key);

const allAccounts = R.compose(R.prop('accounts'), localState);

export default {
  localState,
  allAccounts
};
