import React, { Component } from 'react';
import '../Style.css';
import {Link} from 'react-router-dom';
import {Card,Table,Container,Col,Row} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList} from '@fortawesome/free-solid-svg-icons'
import {connect} from 'react-redux';
import {queryTrain} from '../../services/index'
import ReactLoading from 'react-loading'




class QueryTrainList extends Component {

  constructor(props){
    super(props);
    this.state={
      trains:[],
      isLoading:true
    };
  }

  componentDidMount(){
    const sourceStation=this.props.match.params.sourceStation;
    const destinationStation=this.props.match.params.destinationStation;
    const journeyDate=this.props.match.params.journeyDate;

      this.queryTrain(sourceStation,destinationStation,journeyDate);
  }

  queryTrain=(sourceStation,destinationStation,journeyDate)=>{
    this.props.queryTrain(sourceStation,destinationStation,journeyDate);
    setTimeout(()=>{
      let train=this.props.trainObject.train;
      if(train!=null){
          this.setState({
            trains:train,
            isLoading:false
          });
        }
    },1000)
  }


  render() {
    const {trains}=this.state;
    return (
      <div>
      {this.state.isLoading ? (
        <Row allign="center">
            <ReactLoading type={"bars"} color={"white"}/>
          </Row>
        ) :(
      <Card className={"bg-light text-dark"}>
      <Card.Header><FontAwesomeIcon icon={faList} /> Train List</Card.Header>
      <Card.Body>
      <Table striped borderless responsive hover variant="light">
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
  {trains.length===0 ?
    <tr allign="center">
    <td colSpan="8">{trains.length} Trains Available</td>
    </tr>:
    trains.map((train)=>(
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

      <Link to={localStorage.role==="[ROLE_USER]"?"/bookTicket/"+train.id:"/login"} className="btn btn-primary">Book</Link>

      </tr>
    ))
  }
  </tbody>
</Table>
<br/>
<h2>Do you Know?</h2>
<h1>"We book almost 1 lakh tickets daily"</h1>
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
    trainObject:state.train

  };

};

const mapDispatchToProps=dispatch=>{
  return{

    queryTrain:(sourceStation,destinationStation,jounreyDate)=>dispatch(queryTrain(sourceStation,destinationStation,jounreyDate))
  }

};



export default connect(mapStateToProps,mapDispatchToProps)(QueryTrainList);
