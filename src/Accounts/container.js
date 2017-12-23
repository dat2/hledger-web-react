// @flow

import { connect } from 'react-redux';

import selectors from './selectors';
import component from './component';
import type { RootProps } from './types';
import type { ReduxState } from '../types';

function mapStateToProps(state: ReduxState): RootProps {
  return {
    accounts: selectors.allAccounts(state)
  };
}

export default connect(mapStateToProps)(component);
