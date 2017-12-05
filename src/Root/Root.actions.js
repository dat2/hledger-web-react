import { createActions } from 'redux-actions';

const {
  fetchAccountNames,
  fetchAccountNamesSuccess,
  fetchAccountNamesFailed
} = createActions(
  'FETCH_ACCOUNT_NAMES',
  'FETCH_ACCOUNT_NAMES_SUCCESS',
  'FETCH_ACCOUNT_NAMES_FAILED',
  { namespace: '/ROOT/' }
);

export { fetchAccountNames, fetchAccountNamesSuccess, fetchAccountNamesFailed };
