// @flow

import * as R from 'ramda';

export const key = 'transactions';

const localState = R.prop(key);

const transactions = R.compose(R.prop('data'), localState);

export default {
  localState,
  transactions
};
