import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Actions from './actions';
import Selectors from './selectors';
import component from './component';

function mapStateToProps(state) {
  return {
    accounts: Selectors.allAccounts(state)
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchAccounts: Actions.fetchAccounts
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(component);
