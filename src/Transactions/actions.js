// @flow

import { createActions } from 'redux-actions';

export default createActions(
  'LOAD_TRANSACTIONS',
  'LOAD_TRANSACTIONS_CACHE_MISS',
  'FETCH_TRANSACTIONS',
  'LOAD_TRANSACTIONS_SUCCESS',
  'LOAD_TRANSACTIONS_FAILED',
  'INVALIDATE_TRANSACTIONS_CACHE',
  { namespace: '/TRANSACTIONS/' }
);
