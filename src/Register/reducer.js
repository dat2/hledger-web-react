// @flow

import { handleActions } from 'redux-actions';

import Actions from './actions';
import { makeFilter } from './filter';
import type { RegisterState } from './types';

const initialState: RegisterState = {
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
