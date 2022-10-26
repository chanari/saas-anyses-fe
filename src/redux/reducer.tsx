import { combineReducers } from 'redux';
import UserReducer from '../models/UserReducer';

const rootReducer = combineReducers({
  UserReducer,
});

export default rootReducer;
