import React, { Component } from 'react';
import '../Style.css';
import {Card,Table} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList} from '@fortawesome/free-solid-svg-icons'
import {connect} from 'react-redux';
import {getBookingById} from '../../services/index'
import ReactLoading from 'react-loading'
import India from '../../assets/images/India.jpg'

class BookingStatus extends Component {

  constructor(props){
    super(props);
    this.state={
      bookings:'',
      isLoading:true
    };
  }

  componentDidMount(){
    const id=this.props.match.params.id;
    this.getBookingById(id);

  }

  getBookingById=(id)=>{
    this.props.getBookingById(id);
    setTimeout(()=>{
      let booking=this.props.bookingObject.booking;
      if(booking!=null){
          this.setState({
            bookings:booking,
            isLoading:false
          });
        }
    },500)
  }



  render() {
    const {bookings}=this.state;
    return (
      <div>
      {this.state.isLoading ? (
        <div>
            <ReactLoading type={"bars"} color={"white"} />
          </div>
        ) :(
      <Card className={"border borderless bg-light text-dark"}>
      <Card.Header><FontAwesomeIcon icon={faList} /> Booking Status</Card.Header>
      <Card.Body>
      <Table striped bordered hover variant="light">
  <thead>
    <tr>
      <th>Booking ID</th>
      <th>Status</th>
    </tr>
  </thead>
  <tbody>

      <tr key={bookings.id}>
      <td>{bookings.id}</td>
      <td>{bookings.status}</td>

      </tr>
  </tbody>
</Table>
      </Card.Body>
      <h1>Do you Know?</h1>
      <h2>"This website is purely made in India by an Indian"</h2>
      </Card>
    )
  }
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

    getBookingById:(id)=>dispatch(getBookingById(id))

  }

};

export default connect(mapStateToProps,mapDispatchToProps) (BookingStatus);
