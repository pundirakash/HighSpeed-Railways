import {SAVE_BOOKING_REQUEST,FETCH_BOOKING_REQUEST,BOOKING_SUCCESS,BOOKING_FAILURE,CANCEL_BOOKING_REQUEST,GET_LIST_REQUEST,GET_BOOKING}from './bookingTypes';

const initialState={
  booking:'',
  error:''
};

const reducer=(state=initialState,action)=>{
  switch(action.type){
    case SAVE_BOOKING_REQUEST||FETCH_BOOKING_REQUEST||CANCEL_BOOKING_REQUEST||GET_LIST_REQUEST||GET_BOOKING:
    return{
      ...state
    };
    case BOOKING_SUCCESS:
    return{
      booking:action.payload,
      error:''
    };
    case BOOKING_FAILURE:
    return{
      booking:'',
      error:action.payload
    };
    default:
     return state;
    }
};


export default reducer;
