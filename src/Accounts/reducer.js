// @flow

import { handleActions } from 'redux-actions';

import Actions from './actions';

export type AccountsState = {
  +accounts: Array<any>,
  +error?: any
};

const initialState: AccountsState = {
  accounts: [],
  error: null
};

export default handleActions(
  {
    [Actions.fetchAccountsSuccess]: (state: AccountsState, action) => ({
      ...state,
      accounts: action.payload,
      error: null
    }),
    [Actions.fetchAccountsFailed]: (state: AccountsState, action) => ({
      ...state,
      accounts: [],
      error: action.payload
    })
  },
  initialState
);
