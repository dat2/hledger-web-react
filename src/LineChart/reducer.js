// @flow

import { handleActions } from 'redux-actions';

import Actions from './actions';

const initialState = {
  data: []
};

export default handleActions(
  {
    [Actions.computeLineChartData]: (state, action) => ({
      ...state,
      data: action.payload
    })
  },
  initialState
);
