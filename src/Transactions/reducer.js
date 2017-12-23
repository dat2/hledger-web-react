// @flow

import { handleActions } from 'redux-actions';

import Actions from './actions';
import type { TransactionsState } from './types';

const initialState: TransactionsState = {
  data: []
};

export default handleActions(
  {
    [Actions.loadTransactionsSuccess]: (state, action) => ({
      ...state,
      data: action.payload.data
    })
  },
  initialState
);
