// @flow

import { createActions } from 'redux-actions';

export default createActions(
  { SET_QUERY: e => e.target.value },
  { namespace: '/REGISTER/' }
);
