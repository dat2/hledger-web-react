import { createActions } from 'redux-actions';

export default createActions(
  'LOAD_TRANSACTIONS',
  'FETCH_TRANSACTIONS',
  'LOAD_TRANSACTIONS_SUCCESS',
  'LOAD_TRANSACTIONS_FAILED',
  { namespace: '/TRANSACTIONS/' }
);
