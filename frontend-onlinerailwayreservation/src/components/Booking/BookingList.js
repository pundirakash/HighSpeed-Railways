import React, { Component } from 'react';
import '../Style.css';
import {Card,Table,ButtonGroup,Button,Row} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList,faWindowClose} from '@fortawesome/free-solid-svg-icons'
import MyToast from "../MyToast";
import {connect} from 'react-redux';
import {getUserBookings,cancelBooking} from '../../services/index'
import ReactLoading from 'react-loading'

class BookingList extends Component {

  constructor(props){
    super(props);
    this.state={
      bookings:[],
      isLoading:true
    };
  }

  componentDidMount(){
    this.getUserBookings();

  }

  getUserBookings=()=>{
    this.props.getUserBookings();
    setTimeout(()=>{
      let booking=this.props.bookingObject.booking;
      if(booking!=null){
          this.setState({
            bookings:booking,
            isLoading:false
          });
        }
    },2000)
  }

  cancelBooking=(id)=>{
    this.props.cancelBooking(id);
    setTimeout(()=>{
      if(this.props.bookingObject!=null){
          this.setState({"show":true})
          setTimeout(()=>this.setState({"show":false}),3000);
          this.getUserBookings();
        }else{
          this.setState({"show":false});
        }
    },1500);
  };

  render() {
    const {bookings}=this.state;
    return (
      <div>
      <div style={{"display":this.state.show?"block":"none"}}>
      <MyToast show={this.state.show}  message={"Booking Cancelled Successfully"} type={"danger"}/>
      </div>
      {this.state.isLoading ? (
        <Row allign="center">
            <ReactLoading type={"bars"} color={"white"}/>
          </Row>
        ) :(
      <Card className={"border borderless bg-light text-dark"}>
      <Card.Header><FontAwesomeIcon icon={faList} /> Bookings</Card.Header>
      <Card.Body>
      <Table striped bordered hover variant="light">
  <thead>
    <tr>
      <th>Booking ID</th>
      <th>Train No</th>
      <th>Source</th>
      <th>Destination</th>
      <th>Journey Date</th>
      <th>No of Passengers</th>
      <th>Status</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
  {bookings.length===0 ?
    <tr align="center">
    <td colSpan="8">{bookings.length} Bookings Available</td>
    </tr>:
    bookings.map((booking)=>(
      <tr key={booking.id}>
      <td>{booking.id}</td>
      <td>{booking.train.trainId}</td>
      <td>{booking.train.sourceStation}</td>
      <td>{booking.train.destinationStation}</td>
      <td>{booking.train.journeyDate}</td>
      <td>{booking.passengerList.length}</td>

      <td>{booking.status}</td>
      {booking.status!=="cancelled"?
      <td>
      <ButtonGroup >
      <Button size="sm" variant="danger" onClick={this.cancelBooking.bind(this,booking.id)}><FontAwesomeIcon icon={faWindowClose} /></Button>
      </ButtonGroup>
      </td>:null
    }
      </tr>
    ))
  }
  </tbody>
</Table>
      </Card.Body>
      </Card>
    )}
      </div>
    );
  }
}

const mapStateToProps=state=>{
  return{
    bookingObject:state.booking

  };

};

const mapDispatchToProps=dispatch=>{
  return{

    getUserBookings:()=>dispatch(getUserBookings()),
    cancelBooking:(id)=>dispatch(cancelBooking(id))

  }

};

export default connect(mapStateToProps,mapDispatchToProps) (BookingList);
