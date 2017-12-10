import { handleActions } from 'redux-actions';

import Actions from './actions';

const initialState = {
  accounts: [],
  error: null
};

export default handleActions(
  {
    [Actions.fetchAccountsSuccess]: (state, action) => ({
      ...state,
      accounts: action.payload,
      error: null
    }),
    [Actions.fetchAccountsFailed]: (state, action) => ({
      ...state,
      accounts: [],
      error: action.payload
    })
  },
  initialState
);
