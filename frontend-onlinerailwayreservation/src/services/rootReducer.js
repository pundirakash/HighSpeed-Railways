import {combineReducers} from 'redux';
import trainReducer from './train/trainReducer';
import authReducer from './auth/authReducer';
import regReducer from './register/regReducer';
import bookingReducer from './booking/bookingReducer';
import userReducer from './user/userReducer';

const rootReducer=combineReducers({
  train:trainReducer,
  auth:authReducer,
  register:regReducer,
  booking:bookingReducer,
  user:userReducer
});

export default rootReducer;
