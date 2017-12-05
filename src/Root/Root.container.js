import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Root from './Root.component';
import Actions from './Root.actions';

function mapStateToProps(state) {
  return {
    accounts: state.root.accounts
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Root);
