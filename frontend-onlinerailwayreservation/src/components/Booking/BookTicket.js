import React, { Component } from 'react'
import '../Style.css';
import {Card,Table,Form,Col,Button} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare,faTicketAlt } from '@fortawesome/free-solid-svg-icons'
import {fetchTrain,saveBooking} from '../../services/index'
import {connect} from 'react-redux';
import Axios from 'axios'
import ReactLoading from 'react-loading'

class BookTicket extends Component {

  constructor(props){
    super(props);
    this.state=this.initialState;
    this.razorPayPaymentHandler=this.razorPayPaymentHandler.bind(this);
    this.submitPassenger=this.submitPassenger.bind(this);
  }


initialState={
  booking:'',train:'',passengerList:[],name:'',age:'',gender:'Male',fare:'',isLoading:true
}

componentDidMount(){
  const id=this.props.match.params.id;
  this.findById(id);

}



async razorPayPaymentHandler() {
  const {fare}=this.state;
  const headers = {
  'Content-Type': 'application/json'
}
var info = {
    'fare': fare
}

    const API_URL = `http://localhost:5000/razorpay/`
    const orderUrl = `${API_URL}order`;
    const response = await Axios.post(orderUrl,info,{headers:headers});
    const { data } = response;
    console.log("App -> razorPayPaymentHandler -> data", data)

    const options = {
      key: 'rzp_test_4FTgef17GFDcJ8',
      name: "HIGHSPEED RAILWAYS",
      description: "Please pay due amount to complete your booking",
      order_id: data.id,
      handler: async (response) => {
        try {
         const paymentId = response.razorpay_payment_id;
         const url = `${API_URL}capture/${paymentId}`;
         const captureResponse = await Axios.post(url,info,{headers:headers})
         const successObj = JSON.parse(captureResponse.data)
         const captured = successObj.captured;
         console.log("App -> razorPayPaymentHandler -> captured", successObj)
         if(captured){
             console.log('success')
             this.bookTicket();
         }

        } catch (err) {
          console.log(err);
        }
      },
      theme: {
        color: "#686CFD",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  }




findById=(id)=>{
  this.props.fetchTrain(id);

  setTimeout(()=>{
    let train=this.props.trainObject.train;
    if(train!=null){
        this.setState({
          train:train,
          passengerList:[],
          isLoading:false
        });
      }
  },1000)
}

submitPassenger=event=>{
  event.preventDefault();
  const passenger={
    name:this.state.name,
    age:this.state.age,
    gender:this.state.gender

  };
  this.setState(state => {
      const passengerList = [...state.passengerList, passenger];
      const fare=this.state.train.fare*passengerList.length

      return {
        passengerList,
        fare
      };
    });
};

bookTicket=()=>{
  const booking={
    train:this.state.train,
    passengerList:this.state.passengerList
  }
  this.setState({
      booking:booking
    });

  this.props.saveBooking(booking);
  setTimeout(()=>{
    if(this.props.bookingObject.booking!=null){
       setTimeout(()=>this.homePage(),1000)
     }else{
       console.log("Something went Wrong");
     }

  },2000)

  this.setState(this.initialState);
}

homePage=()=>{
  return this.props.history.push("/bookingSuccess");
};

passengerChange=event=>{
  this.setState({
    [event.target.name]:event.target.value
  }

  )
};


  render() {
    const {train,passengerList,name,age,gender,fare}=this.state;
    return (
      <div>
      {this.state.isLoading ? (
        <div>
            <ReactLoading type={"bars"} color={"white"} />
          </div>
        ) :(
      <Card className={"border border-dark bg-light text-dark"}>
      <Card.Header className="">Complete your booking</Card.Header>
      <Card.Body>
      <Table striped bordered hover variant="light">
  <thead>
    <tr>
      <th>Name</th>
      <th>Train No</th>
      <th>Source</th>
      <th>Destination</th>
      <th>Fare</th>
      <th>Remaining Seats</th>
      <th>Journey Date</th>
      <th>Arrives</th>
      <th>Departs</th>
    </tr>
  </thead>
  <tbody>


      <tr key={train.id}>
      <td>{train.name}</td>
      <td>{train.trainId}</td>
      <td>{train.sourceStation}</td>
      <td>{train.destinationStation}</td>
      <td>{train.fare}</td>
      <td>{train.capacity}</td>
      <td>{train.journeyDate}</td>
      <td>{train.arrives}</td>
      <td>{train.departs}</td>
      </tr>
  </tbody>
</Table>
<Form onReset={this.resetTrain} onSubmit={this.submitPassenger} id="train">

<Form.Row>



<Form.Group as={Col} controlId="formGridName">
<Form.Label>Passenger Name</Form.Label>
<Form.Control required autoComplete="off" type="text" value={name}  onChange={this.passengerChange} name="name" className={"bg-light text-dark"} placeholder="Enter Passenger Name" />
</Form.Group>

<Form.Group as={Col} controlId="formGridTrainNo">
<Form.Label>Age</Form.Label>
<Form.Control required autoComplete="off" type="number" value={age}  onChange={this.passengerChange} name="age" className={"bg-light text-dark"} placeholder="Enter Age" />
</Form.Group>

<Form.Group as={Col} controlId="formGridTrainNo">
<Form.Label>Gender</Form.Label>
<Form.Control required autoComplete="off" type="text" value={gender} name="gender"  onChange={this.passengerChange} className={"bg-light text-dark"} as="select">
<option value="Male" name="gender">Male</option>
<option value="Female" name="gender">Female</option>
</Form.Control>
</Form.Group>


</Form.Row>
{passengerList.length<6?
<Button size="sm" className="btn"  type="submit">
<FontAwesomeIcon icon={faPlusSquare}/> Add Passenger </Button>:
<Button size="sm" className="btn"  type="submit" disabled>
<FontAwesomeIcon icon={faPlusSquare}/> Add Passenger </Button>
}
</Form>
<br/>
{/*Passenger List*/}
<Table striped bordered hover variant="light">
<thead>
<tr>
<th>Name</th>
<th>Age</th>
<th>Gender</th>
</tr>
</thead>
<tbody>
{passengerList.length===0?
<tr align="center">
<td colSpan="3">{passengerList.length} Passengers Added</td>
</tr>:
passengerList.map((passenger)=>(
<tr>
<td>{passenger.name}</td>
<td>{passenger.age}</td>
<td>{passenger.gender}</td>
</tr>
))
}
</tbody>
</Table>

<Card.Footer style={{textAlign:"right"}}>
<Button size="lg" variant="primary"  type="submit" onClick={this.razorPayPaymentHandler} disabled={passengerList.length===0?true:false}>
<FontAwesomeIcon icon={faTicketAlt}/> Make Payment of ₹ {fare}
</Button>
</Card.Footer>


      </Card.Body>
      </Card>
    )
  }
      </div>
    );
  }
}

const mapStateToProps=state=>{
  return{
    trainObject:state.train,
    bookingObject:state.booking
  };

};

const mapDispatchToProps=dispatch=>{
  return{
    fetchTrain:(id)=>dispatch(fetchTrain(id)),
    saveBooking:(booking)=>dispatch(saveBooking(booking))
  }

};


export default connect(mapStateToProps,mapDispatchToProps) (BookTicket);
