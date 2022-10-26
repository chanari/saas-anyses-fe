import { all } from 'redux-saga/effects';
import watcherUser from '../controllers/user.controller';

function* rootWatcher() {
  yield all([watcherUser()]);
}

export default rootWatcher;
