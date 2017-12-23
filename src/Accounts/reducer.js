// @flow

import { handleActions } from 'redux-actions';

import Actions from './actions';
import type { AccountsState } from './types';

const initialState: AccountsState = {
  accounts: [],
  error: null
};

export default handleActions(
  {
    [String(Actions.fetchAccountsSuccess)]: (state: AccountsState, action) => ({
      ...state,
      accounts: action.payload,
      error: null
    }),
    [String(Actions.fetchAccountsFailed)]: (state: AccountsState, action) => ({
      ...state,
      accounts: [],
      error: action.payload
    })
  },
  initialState
);
