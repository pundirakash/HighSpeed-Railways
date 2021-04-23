import React, { Component } from 'react';
import '../Style.css';
import {Card,Table} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList} from '@fortawesome/free-solid-svg-icons'
import {connect} from 'react-redux';
import {getAllBookings} from '../../services/index'

class Bookings extends Component {

  constructor(props){
    super(props);
    this.state={
      bookings:[]
    };
  }

  componentDidMount(){
    this.getAllBookings();

  }

  getAllBookings=()=>{
    this.props.getAllBookings();
    setTimeout(()=>{
      let booking=this.props.bookingObject.booking;
      if(booking!=null){
          this.setState({
            bookings:booking
          });
        }
    },1700)
  }



  render() {
    const {bookings}=this.state;
    return (
      <div>
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
      </tr>
    ))
  }
  </tbody>
</Table>
      </Card.Body>
      </Card>
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

    getAllBookings:()=>dispatch(getAllBookings())

  }

};

export default connect(mapStateToProps,mapDispatchToProps) (Bookings);
