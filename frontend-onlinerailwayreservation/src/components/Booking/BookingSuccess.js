import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle} from '@fortawesome/free-solid-svg-icons'
import QR from '../../assets/images/mailus.png'
import {Link} from 'react-router-dom';
import '../Style.css'
import {Jumbotron} from 'react-bootstrap';

class BookingSuccess extends Component {
  render() {
    return (
      <Jumbotron>
      <h1><FontAwesomeIcon color="green" icon={faCheckCircle} /> Success</h1>
  <h2 className="booking-success">
    Your booking was Successful. Go to my bookings to see all of your bookings.
  </h2>
  <br/>

    <Link to={"bookingList"} className="btn btn-lg btn-primary">My Bookings</Link>
  <br/>
  <br/>
  <p>Scan QR code for any query</p>
  <img src={QR} alt="QR Code"/>
</Jumbotron>
    );
  }
}
export default BookingSuccess;
