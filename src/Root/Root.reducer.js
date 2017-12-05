import set from 'lodash.set';
import { handleActions } from 'redux-actions';

import Actions from './Root.actions';

const initialState = {
  accounts: {},
  error: null
};

function convertAccountNamesToMap(names) {
  return names.reduce((acc, name) => set(acc, name.split(':'), {}), {});
}

export default handleActions(
  {
    [Actions.fetchAccountNamesSuccess]: (state, action) => ({
      ...state,
      accounts: convertAccountNamesToMap(action.payload)
    }),
    [Actions.fetchAccountNamesFailed]: (state, action) => ({
      ...state,
      error: action.payload
    })
  },
  initialState
);
