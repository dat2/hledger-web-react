// @flow

import { createActions } from 'redux-actions';
import { parseFilter } from './filter';

export default createActions({ PARSE_FILTER: parseFilter });
