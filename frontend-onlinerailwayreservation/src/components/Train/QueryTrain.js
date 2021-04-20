import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {Card,Form,Col,Alert} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import "../Style.css"

class QueryTrain extends Component {

  constructor(props){
    super(props);
    this.state=this.initialState;
    this.queryChange=this.queryChange.bind(this);
  }


  initialState={
    sourceStation:'NDLS',destinationStation:'SEC',journeyDate:''
  }



  queryChange=event=>{
    this.setState({
      [event.target.name]:event.target.value
    }

    )
  };
  render() {

    const {sourceStation,destinationStation,journeyDate}=this.state;

    return (
      <div>
      <Col>
      {sourceStation===destinationStation?<Alert variant="warning">Source and destination station can't be same</Alert>:null}
      <Card className={"card-style card-light"}>
      <Card.Header className="text-left"><FontAwesomeIcon icon={faSearch}/> Plan Your Travel</Card.Header>

      <Form>
      <Card.Body>





      <Form.Group as={Col} controlId="formGridSource">
      <Form.Label>Source Station</Form.Label>
      <Form.Control required autoComplete="off" type="text" value={sourceStation} onChange={this.queryChange} name="sourceStation" className={"bg-light text-dark"} as="select" >
      <option value="NDLS" name={sourceStation}>NDLS- New Delhi</option>
      <option value="KGP" name={sourceStation}>KGP- Kharagpur</option>
      <option value="SBC" name={sourceStation}>SBC- Bangalore City</option>
      <option value="SEC" name={sourceStation}>SEC- Secunderabad</option>
      <option value="UMB" name={sourceStation}>UMB- Ambala Cantt</option>
      </Form.Control>
      </Form.Group>

      <Form.Group as={Col} controlId="formGridDestination">
      <Form.Label>Destination Station</Form.Label>
      <Form.Control required autoComplete="off" type="text" value={destinationStation} onChange={this.queryChange} name="destinationStation" className={"bg-light text-dark"} as="select">
      <option value="SEC" name={destinationStation}>SEC- Secunderabad</option>
      <option value="NDLS" name={destinationStation}>NDLS- New Delhi</option>
      <option value="KGP" name={destinationStation}>KGP- Kharagpur</option>
      <option value="SBC" name={destinationStation}>SBC- Bangalore City</option>
      <option value="UMB" name={destinationStation}>UMB- Ambala Cantt</option>
      </Form.Control>
      </Form.Group>
      <Form.Group as={Col} controlId="formGridDate">
      <Form.Label>Journey Date</Form.Label>
      <Form.Control required autoComplete="off" type="Date" value={journeyDate} onChange={this.queryChange} name="journeyDate" className={"bg-light text-dark"} placeholder="Enter journeyDate" />
      </Form.Group>

      </Card.Body>
      <Card.Footer style={{textAlign:"right"}}>
      {journeyDate==="" && sourceStation===destinationStation? <Link to={"queryTrain/"+sourceStation+"/"+destinationStation+"/"+journeyDate} className="btn btn-primary btn-lg disabled">Search</Link>:
      <Link to={"queryTrain/"+sourceStation+"/"+destinationStation+"/"+journeyDate} className="btn btn-primary btn-lg">Search</Link>}
      </Card.Footer>
      </Form>
      </Card>


      </Col>


      </div>
    );
  }
}





export default QueryTrain;
