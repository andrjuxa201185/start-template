import {all, fork, setContext} from 'redux-saga/effects';
import authSaga from '../auth/authSaga';
import userProfileSaga from '../userProfile/userProfileSaga';

export default function* root(dispatch) {
  yield setContext({dispatch});
  yield all([
    ...authSaga,
    ...userProfileSaga,
  ].map(saga => fork(saga, dispatch)));
}
