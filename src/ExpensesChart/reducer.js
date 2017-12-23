// @flow

import { handleActions } from 'redux-actions';

import Actions from './actions';
import type { ExpensesChartState } from './types';

const initialState: ExpensesChartState = {
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
