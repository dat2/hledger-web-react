import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Root from './Root.component';
import { fetchAccountNames } from './Root.actions';

function mapStateToProps(state) {
  return {
    accounts: state.root.accounts
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchAccountNames
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Root);
