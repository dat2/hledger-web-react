// @flow

import { createActions } from 'redux-actions';

export default createActions(
  'FETCH_ACCOUNTS',
  'FETCH_ACCOUNTS_SUCCESS',
  'FETCH_ACCOUNTS_FAILED',
  { namespace: '/ACCOUNTS/' }
);
