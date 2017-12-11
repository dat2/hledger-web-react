// @flow

import { handleActions } from 'redux-actions';

import Actions from './actions';

const initialState = {
  data: []
};

export default handleActions(
  {
    [Actions.computeExpensesChartData]: (state, action) => ({
      ...state,
      data: action.payload
    })
  },
  initialState
);
