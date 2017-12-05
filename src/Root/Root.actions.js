import { createActions } from 'redux-actions';

export default createActions(
  'FETCH_ACCOUNT_NAMES',
  'FETCH_ACCOUNT_NAMES_SUCCESS',
  'FETCH_ACCOUNT_NAMES_FAILED',
  'FETCH_TRANSACTIONS',
  'FETCH_TRANSACTIONS_SUCCESS',
  'FETCH_TRANSACTIONS_FAILED',
  { namespace: '/ROOT/' }
);
