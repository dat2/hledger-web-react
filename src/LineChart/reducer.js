// @flow

import { handleActions } from 'redux-actions';

import Actions from './actions';
import type { LineChartState } from './types';

const initialState: LineChartState = {
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
