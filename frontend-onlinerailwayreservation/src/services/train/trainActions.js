import {SAVE_TRAIN_REQUEST,FETCH_TRAIN_REQUEST,UPDATE_TRAIN_REQUEST,TRAIN_SUCCESS,TRAIN_FAILURE,DELETE_TRAIN_REQUEST,QUERY_TRAIN_REQUEST} from './trainTypes';
import axios from 'axios';

export const saveTrain=train=>{
  return dispatch=>{
    dispatch(saveTrainRequest());
    let token=localStorage.jwtToken;
    axios.post("http://localhost:8082/trainApi/v1/addTrain",train,{ headers: {"Authorization" : `Bearer ${token}`} })
    .then(response=>{
      dispatch(trainSuccess(response.data));
    })
    .catch(error=>{
      dispatch(trainFailure(error.message));
    });
  };
};


const saveTrainRequest=()=>{
     return{
       type:SAVE_TRAIN_REQUEST
     }

}

const queryTrainRequest=()=>{
  return {
    type:QUERY_TRAIN_REQUEST
  }
}

export const queryTrain=(sourceStation,destinationStation,journeyDate)=>{
  const query={
    sourceStation:sourceStation,
    destinationStation:destinationStation,
    journeyDate:journeyDate
  }
  return dispatch=>{
    dispatch(queryTrainRequest());
    console.log(query);
    axios.post("http://localhost:8082/trainApi/v1/queryTrains",query)
    .then(response=>{
      console.log(response.data);
      dispatch(trainSuccess(response.data));
    })
    .catch(error=>{
      dispatch(trainFailure(error.message));
    });
  };
};

const fetchTrainRequest=()=>{
     return{
       type:FETCH_TRAIN_REQUEST
     }

}



export const fetchTrain=id=>{
  return dispatch=>{
    dispatch(fetchTrainRequest());
    axios.get("http://localhost:8082/trainApi/v1/findById/"+id)
    .then(response=>{
      dispatch(trainSuccess(response.data));
    })
    .catch(error=>{
      dispatch(trainFailure(error.message));
    });
  };
};

const updateTrainRequest=()=>{
     return{
       type:UPDATE_TRAIN_REQUEST
     }

}

export const updateTrain=train=>{
  return dispatch=>{
    dispatch(updateTrainRequest());
    let token=localStorage.jwtToken;
    axios.put("http://localhost:8082/trainApi/v1/updateTrain",train,{ headers: {"Authorization" : `Bearer ${token}`} })
    .then(response=>{
      dispatch(trainSuccess(response.data));
    })
    .catch(error=>{
      dispatch(trainFailure(error.message));
    });
  };
};

const deleteTrainRequest=()=>{
     return{
       type:DELETE_TRAIN_REQUEST
     }

}

export const deleteTrain=id=>{
  return dispatch=>{
    dispatch(deleteTrainRequest());
    let token=localStorage.jwtToken;
    axios.delete("http://localhost:8082/trainApi/v1/deleteTrain/"+id,{ headers: {"Authorization" : `Bearer ${token}`} })
    .then(response=>{
      dispatch(trainSuccess(response.data));
    })
    .catch(error=>{
      dispatch(trainFailure(error.message));
    });
  };
};

const trainSuccess=train=>{
      return{
        type:TRAIN_SUCCESS,
        payload:train
      }
}

const trainFailure=error=>{
      return{
        type:TRAIN_FAILURE,
        payload:error
      }
}
