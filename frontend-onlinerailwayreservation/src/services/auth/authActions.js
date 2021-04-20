import {LOGIN_REQUEST, LOGOUT_REQUEST, SUCCESS, FAILURE} from './authTypes';
import axios from 'axios';

export const authenticateUser = (userName, password) => {
  const credentials={
    userName:userName,
    password:password
  };

    return dispatch => {
        dispatch(loginRequest());
        axios.post("http://localhost:8083/user/authenticate",credentials)
        .then(response=>{
          let role=response.data.authority;
          localStorage.setItem('role',role);
          let token=response.data.jwt;
          localStorage.setItem('jwtToken',token);
          dispatch(success(true));
        })
        .catch(error=>{
          dispatch(failure());
        });
    };
};

const loginRequest = () => {
    return {
        type: LOGIN_REQUEST
    };
};

export const logoutUser = () => {
    return dispatch => {
        dispatch(logoutRequest());
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('role');
        dispatch(success(false));
    };

};

const logoutRequest = () => {
    return {
        type: LOGOUT_REQUEST
    };
};

const success = isLoggedIn => {
    return {
        type: SUCCESS,
        payload: isLoggedIn
    };
};

const failure = () => {
    return {
        type: FAILURE,
        payload: false
    };
};
