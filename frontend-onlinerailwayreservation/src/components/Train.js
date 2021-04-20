import React from 'react';
import {Card,Form,Button,Col} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave,faPlusSquare,faUndo,faList,faEdit } from '@fortawesome/free-solid-svg-icons'
import MyToast from "./MyToast";
import {connect} from 'react-redux';
import {saveTrain,fetchTrain,updateTrain} from '../services/index'

class Train extends React.Component{

  constructor(props){
    super(props);
    this.state=this.initialState;
    this.state.show=false;
    this.trainChange=this.trainChange.bind(this);
    this.submitTrain=this.submitTrain.bind(this);
  }

  initialState={
    id:'',name:'',trainId:'',sourceStation:'',destinationStation:'',fare:'',capacity:'',journeyDate:'',arrives:'',departs:'',status:'active'
  }

  componentDidMount(){
    const id=this.props.match.params.id;
    if(id){
      this.findById(id);

    }
  }

  findById=(id)=>{
    this.props.fetchTrain(id);

    setTimeout(()=>{
      let train=this.props.trainObject.train;
      if(train!=null){
          this.setState({
            id:train.id,
            name:train.name,
            trainId:train.trainId,
            sourceStation:train.sourceStation,
            destinationStation:train.destinationStation,
            fare:train.fare,
            capacity:train.capacity,
            journeyDate:train.journeyDate,
            arrives:train.arrives,
            departs:train.departs,
            status:train.status

          });
        }
    },1000)
  }

  resetTrain=()=>{
    this.setState(()=>this.initialState);
  }

  submitTrain=event=>{
    event.preventDefault();
    const train={
      id:this.state.id,
      name:this.state.name,
      trainId:this.state.trainId,
      sourceStation:this.state.sourceStation,
      destinationStation:this.state.destinationStation,
      fare:this.state.fare,
      capacity:this.state.capacity,
      journeyDate:this.state.journeyDate,
      arrives:this.state.arrives,
      departs:this.state.departs,
      status:this.state.status

    };
    this.props.saveTrain(train);
    setTimeout(()=>{
    if(this.props.saveTrainObject.train!=null){
          this.setState({"show":true,"method":"post"})
          setTimeout(()=>this.setState({"show":false}),3000)
        }else{
          this.setState({"show":false});
        }
    },2000)
    this.setState(this.initialState);
  };

  updateTrain=event=>{
    event.preventDefault();

    const train={
      id:this.state.id,
      name:this.state.name,
      trainId:this.state.trainId,
      sourceStation:this.state.sourceStation,
      destinationStation:this.state.destinationStation,
      fare:this.state.fare,
      capacity:this.state.capacity,
      journeyDate:this.state.journeyDate,
      arrives:this.state.arrives,
      departs:this.state.departs,
      status:this.state.status

    };
    this.props.updateTrain(train);
    setTimeout(()=>{
      if(this.props.updateTrainObject.train!=null){
         this.setState({"show":true,"method":"put"})
         setTimeout(()=>this.setState({"show":false}),2000)
         setTimeout(()=>this.trainList(),1000)
       }else{
         this.setState({"show":false});
       }

    },2000)

    this.setState(this.initialState);

  }

  trainChange=event=>{
    this.setState({
      [event.target.name]:event.target.value
    }

    )
  };

  trainList=()=>{
    return this.props.history.push("/trainList");
  };

  render()
  {

    const {name,trainId,sourceStation,destinationStation,fare,capacity,journeyDate,arrives,departs,status}=this.state;
    return(
      <div>
      <div style={{"display":this.state.show?"block":"none"}}>
      <MyToast show={this.state.show} message={this.state.method==="post"?"Train Saved Successfully":"Train Updated Successfully"} type={"success"}/>
      </div>
      <Card className={"border borderless bg-light text-dark"}>
      <Card.Header> <FontAwesomeIcon icon={this.state.id ? faEdit:faPlusSquare}/> {this.state.id ? "Update Train":"Add New Train"}</Card.Header>

      <Form onReset={this.resetTrain} onSubmit={this.state.id?this.updateTrain:this.submitTrain} id="train">
      <Card.Body>

      <Form.Row>



      <Form.Group as={Col} controlId="formGridName">
      <Form.Label>Train Name</Form.Label>
      <Form.Control required autoComplete="off" type="text" value={name} onChange={this.trainChange} name="name" className={"bg-light text-dark"} placeholder="Enter Train Name" />
      </Form.Group>

      </Form.Row>




      <Form.Row>

      <Form.Group as={Col} controlId="formGridTrainNo">
      <Form.Label>Train No</Form.Label>
      <Form.Control required autoComplete="off" type="text" value={trainId} onChange={this.trainChange} name="trainId" className={"bg-light text-dark"} placeholder="Enter Train Number" />
      </Form.Group>

      <Form.Group as={Col} controlId="formGridSource">
      <Form.Label>Source</Form.Label>
      <Form.Control required autoComplete="off" type="text" value={sourceStation} onChange={this.trainChange} name="sourceStation" className={"bg-light text-dark"} placeholder="Enter Source Station" />
      </Form.Group>

      <Form.Group as={Col} controlId="formGridDestination">
      <Form.Label>Destination</Form.Label>
      <Form.Control required autoComplete="off" type="text" value={destinationStation} onChange={this.trainChange} name="destinationStation" className={"bg-light text-dark"} placeholder="Enter Destination Station" />
      </Form.Group>

      <Form.Group as={Col} controlId="formGridFare">
      <Form.Label>Fare</Form.Label>
      <Form.Control required autoComplete="off" type="number" value={fare} onChange={this.trainChange} name="fare" className={"bg-light text-dark"} placeholder="Enter Train Fare" />
      </Form.Group>

      </Form.Row>

      <Form.Row>

      <Form.Group as={Col} controlId="formGridCapacity">
      <Form.Label>Capacity</Form.Label>
      <Form.Control required autoComplete="off" type="number" name="capacity" value={capacity} onChange={this.trainChange} className={"bg-light text-dark"} placeholder="Enter Train Capacity" />
      </Form.Group>

      <Form.Group as={Col} controlId="formGridJourneyDate">
      <Form.Label>Journey Date</Form.Label>
      <Form.Control required autoComplete="off" type="date" name="journeyDate" value={journeyDate} onChange={this.trainChange} className={"bg-light text-dark"} placeholder="Enter Journey Date" />
      </Form.Group>

      <Form.Group as={Col} controlId="formGridArrives">
      <Form.Label>Arrives</Form.Label>
      <Form.Control required autoComplete="off" type="text" name="arrives" value={arrives} onChange={this.trainChange} className={"bg-light text-dark"} placeholder="Enter Arrival Time" />
      </Form.Group>

      <Form.Group as={Col} controlId="formGridDeparts">
      <Form.Label>Departs</Form.Label>
      <Form.Control required autoComplete="off" type="text" name="departs" value={departs} onChange={this.trainChange} className={"bg-light text-dark"} placeholder="Enter Departure Time" />
      </Form.Group>

      </Form.Row>


      </Card.Body>
      <Card.Footer style={{textAlign:"right"}}>
      <Button size="lg" variant="primary"  type="submit">
      <FontAwesomeIcon icon={faSave}/> {this.state.id ? "Update" : "Save"}
      </Button>  <Button size="lg" variant="warning"  type="reset">
      <FontAwesomeIcon icon={faUndo}/> Reset
      </Button>{' '}<Button size="lg" variant="secondary"  type="button" onClick={this.trainList.bind()}>
      <FontAwesomeIcon icon={faList}/> Train List
      </Button>
      </Card.Footer>
      </Form>
      </Card>
      </div>



    )
  }

};

const mapStateToProps=state=>{
  return{
    saveTrainObject:state.train,
    trainObject:state.train,
    updateTrainObject:state.train
  };

};

const mapDispatchToProps=dispatch=>{
  return{
    saveTrain:(train)=>dispatch(saveTrain(train)),
    fetchTrain:(id)=>dispatch(fetchTrain(id)),
    updateTrain:(train)=>dispatch(updateTrain(train))
  }

};


export default connect(mapStateToProps,mapDispatchToProps) (Train);
