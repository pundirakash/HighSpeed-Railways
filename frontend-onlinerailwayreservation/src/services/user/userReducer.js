import {GET_USER_REQUEST,UPDATE_USER_REQUEST,USER_SUCCESS,USER_FAILURE} from './userTypes';



const initialState={
  user:'',
  error:''
};

const reducer=(state=initialState,action)=>{
  switch(action.type){
    case GET_USER_REQUEST||UPDATE_USER_REQUEST:
    return{
      ...state
    };
    case USER_SUCCESS:
    return{
      user:action.payload,
      error:''
    };
    case USER_FAILURE:
    return{
      user:'',
      error:action.payload
    };
    default:
     return state;
    }
};


export default reducer;
