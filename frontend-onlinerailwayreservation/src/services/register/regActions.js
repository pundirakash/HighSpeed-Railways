import {REG_REQUEST,SUCCESS, FAILURE} from './regTypes';
import axios from 'axios';

export const registerUser = (userName,email,password,) => {
  const details={
    userName:userName,
    email:email,
    password:password
  };

    return dispatch => {
        dispatch(regRequest());
        axios.post("http://localhost:8083/user/registerUser",details)
        .then(response=>{
          dispatch(success(true));
        })
        .catch(error=>{
          dispatch(failure());
        });
    };
};




const regRequest = () => {
    return {
        type: REG_REQUEST
    };
};

const success = isRegistered => {
    return {
        type: SUCCESS,
        payload: isRegistered
    };
};

const failure = () => {
    return {
        type: FAILURE,
        payload: false
    };
};
