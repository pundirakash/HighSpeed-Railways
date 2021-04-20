import {SAVE_TRAIN_REQUEST,FETCH_TRAIN_REQUEST,UPDATE_TRAIN_REQUEST,TRAIN_SUCCESS,TRAIN_FAILURE,DELETE_TRAIN_REQUEST,QUERY_TRAIN_REQUEST} from './trainTypes';


const initialState={
  train:'',
  error:''
};

const reducer=(state=initialState,action)=>{
  switch(action.type){
    case SAVE_TRAIN_REQUEST ||FETCH_TRAIN_REQUEST||UPDATE_TRAIN_REQUEST||DELETE_TRAIN_REQUEST||QUERY_TRAIN_REQUEST:
    return{
      ...state
    };
    case TRAIN_SUCCESS:
    return{
      train:action.payload,
      error:''
    };
    case TRAIN_FAILURE:
    return{
      train:'',
      error:action.payload
    };
    default:
     return state;
    }
};


export default reducer;
