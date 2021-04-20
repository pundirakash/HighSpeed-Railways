import {SAVE_BOOKING_REQUEST,FETCH_BOOKING_REQUEST,BOOKING_SUCCESS,GET_LIST_REQUEST,GET_BOOKING,BOOKING_FAILURE,CANCEL_BOOKING_REQUEST} from './bookingTypes';
import axios from 'axios';


export const saveBooking=booking=>{
  return dispatch=>{
    dispatch(saveBookingRequest());
    let token=localStorage.jwtToken;
    axios.post("http://localhost:8081/bookingApi/v1/addBooking",booking,{ headers: {"Authorization" : `Bearer ${token}`} })
    .then(response=>{

      dispatch(bookingSuccess(response.data));
    })
    .catch(error=>{
      dispatch(bookingFailure(error.message));
    });
  };
};


const saveBookingRequest=()=>{
     return{
       type:SAVE_BOOKING_REQUEST
     }

}

export const getUserBookings=()=>{
  return dispatch=>{
    dispatch(fetchBookingRequest());
    let token=localStorage.jwtToken;
    axios.get("http://localhost:8083/user/getUserBookings",{ headers: {"Authorization" : `Bearer ${token}`} })
    .then(response=>{
      dispatch(bookingSuccess(response.data));
    })
    .catch(error=>{
      dispatch(bookingFailure(error.message));
    });
  };
};


const fetchBookingRequest=()=>{
  return{
    type:FETCH_BOOKING_REQUEST
  }
}

export const getBookingById=(id)=>{
  return dispatch=>{
    dispatch(getBooking());
    axios.get("http://localhost:8081/bookingApi/v1/getBooking/"+id)
    .then(response=>{
      dispatch(bookingSuccess(response.data));
    })
    .catch(error=>{
      dispatch(bookingFailure(error.message));
    });
  };
};

const getBooking=()=>{
  return{
    type:GET_BOOKING
  }
}



export const getAllBookings=()=>{
  return dispatch=>{
    dispatch(getListRequest());
    let token=localStorage.jwtToken;
    axios.get("http://localhost:8081/bookingApi/v1/allBookings",{ headers: {"Authorization" : `Bearer ${token}`} })
    .then(response=>{
      dispatch(bookingSuccess(response.data));
    })
    .catch(error=>{
      dispatch(bookingFailure(error.message));
    });
  };
};


const getListRequest=()=>{
  return{
    type:GET_LIST_REQUEST
  }
}




export const cancelBooking=id=>{
  return dispatch=>{
    dispatch(cancelBookingRequest());
    let token=localStorage.jwtToken;
    axios.get("http://localhost:8081/bookingApi/v1/cancelBooking/"+id,{ headers: {"Authorization" : `Bearer ${token}`} })
    .then(response=>{
      dispatch(bookingSuccess(response.data));
    })
    .catch(error=>{
      dispatch(bookingFailure(error.message));
    });
  };
};


const cancelBookingRequest=()=>{
  return{
    type:CANCEL_BOOKING_REQUEST
  }
}

const bookingSuccess=booking=>{
      return{
        type:BOOKING_SUCCESS,
        payload:booking
      }
}

const bookingFailure=error=>{
      return{
        type:BOOKING_FAILURE,
        payload:error
      }
}
