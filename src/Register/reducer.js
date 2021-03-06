// @flow

import { handleActions } from 'redux-actions';

import Actions from './actions';
import { makeFilter } from './filter';

const initialState = {
  filter: makeFilter({ account: '', amount: '', date: '', description: '' })
};

export default handleActions(
  {
    [Actions.parseFilter]: (state, action) => ({
      ...state,
      filter: action.payload
    })
  },
  initialState
);
