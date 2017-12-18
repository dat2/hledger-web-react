// @flow

import { handleActions } from 'redux-actions';

import Actions from './actions';

const initialState = {
  query: ''
};

export default handleActions(
  {
    [Actions.setQuery]: (state, action) => ({
      ...state,
      query: action.payload
    })
  },
  initialState
);
