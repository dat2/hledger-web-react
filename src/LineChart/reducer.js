import { handleActions } from 'redux-actions';

import Actions from './actions';

const initialState = {
  lineChartData: []
};

export default handleActions(
  {
    [Actions.computeLineChartData]: (state, action) => ({
      ...state,
      lineChartData: action.payload
    })
  },
  initialState
);
