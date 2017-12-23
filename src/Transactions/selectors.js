// @flow

import { compose, prop } from 'ramda';

export const key = 'transactions';

const localState = prop(key);

const transactions = compose(prop('data'), localState);

export default {
  localState,
  transactions
};
