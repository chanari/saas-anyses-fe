import { call, put, takeLatest } from 'redux-saga/effects';
import { callAPI } from './api';

interface IAction {
  type: String;
  payload: {
    data: Object;
  };
  setUser: (data: Object) => []; // arrow function
}
function* watcherUser() {
  yield takeLatest('GET_ALL_USER', watchGetAllUser);
}

function* watchGetAllUser(action: IAction) {
  const rs: Promise<any> = yield call(callAPI);

  //call back component
  action.setUser(rs);

  //save data in reducer
  yield put({ type: 'GET_ALL_USER_SUCCESS', data: rs });

  try {
  } catch (error) {}
}

export default watcherUser;
