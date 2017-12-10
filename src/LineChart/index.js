import actions from './actions';
import reducer from './reducer';
import saga from './saga';
import selectors, { key } from './selectors';
import Container from './container';

export default {
  actions,
  Container,
  key,
  reducer,
  saga,
  selectors
};
