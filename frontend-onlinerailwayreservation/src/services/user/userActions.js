import {GET_USER_REQUEST,UPDATE_USER_REQUEST,USER_SUCCESS,USER_FAILURE} from './userTypes';
import axios from 'axios';


export const getUser=()=>{
  return dispatch=>{
    dispatch(getUserRequest());
    let token=localStorage.jwtToken;
    axios.get("http://localhost:8083/user/getUser",{ headers: {"Authorization" : `Bearer ${token}`} })
    .then(response=>{
      dispatch(userSuccess(response.data));
    })
    .catch(error=>{
      dispatch(userFailure(error.message));
    });
  };
};


const getUserRequest=()=>{
  return{
    type:GET_USER_REQUEST
  }
}

export const updateUser=(user)=>{
  return dispatch=>{
    dispatch(updateUserRequest());
    let token=localStorage.jwtToken;
    axios.put("http://localhost:8083/user/updateUser",user,{ headers: {"Authorization" : `Bearer ${token}`} })
    .then(response=>{
      dispatch(userSuccess(response.data));
    })
    .catch(error=>{
      dispatch(userFailure(error.message));
    });
  };
};


const updateUserRequest=()=>{
  return{
    type:UPDATE_USER_REQUEST
  }
}

const userSuccess=user=>{
      return{
        type:USER_SUCCESS,
        payload:user
      }
}

const userFailure=error=>{
      return{
        type:USER_FAILURE,
        payload:error
      }
}
