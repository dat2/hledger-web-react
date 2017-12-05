import { call, put, takeEvery } from 'redux-saga/effects';
import * as Actions from './Root.actions';

export default function* rootSaga() {
  yield takeEvery(Actions.fetchAccountNames, fetchAccountNames);
}

console.log(process.env);

function* fetchAccountNames() {
  try {
    const response = yield call(fetch, '/api/v1/accountnames');
    const json = yield call(() => response.json());
    yield put(Actions.fetchAccountNamesSuccess(json));
  } catch (e) {
    yield put(Actions.fetchAccountNamesFailed(e));
  }
}
