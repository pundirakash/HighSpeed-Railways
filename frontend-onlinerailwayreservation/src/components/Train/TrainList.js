import React from 'react';
import '../Style.css'
import {Link} from 'react-router-dom';
import {Card,Table,ButtonGroup,Button,InputGroup,FormControl,Row} from 'react-bootstrap';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList,faEdit,faTrash,faStepBackward,faStepForward,faFastForward,faFastBackward} from '@fortawesome/free-solid-svg-icons'
import MyToast from "../MyToast";
import {connect} from 'react-redux';
import {deleteTrain} from '../../services/index'
import ReactLoading from 'react-loading'

class TrainList extends React.Component{

  constructor(props){
    super(props);
    this.state={
      trains:[],
      currentPage:1,
      trainsPerPage:5,
      isLoading:true
    };
  }

  componentDidMount(){
    this.getTrains();

  }

  changePage = event => {
        this.setState({
            [event.target.name]: parseInt(event.target.value)
        });
    };

  firstPage = () => {
        if(this.state.currentPage > 1) {
            this.setState({
                currentPage: 1
            });
        }
    };

    prevPage = () => {
        if(this.state.currentPage > 1) {
            this.setState({
                currentPage: this.state.currentPage - 1
            });
        }
    };

    lastPage = () => {
        if(this.state.currentPage < Math.ceil(this.state.trains.length / this.state.trainsPerPage)) {
            this.setState({
                currentPage: Math.ceil(this.state.trains.length / this.state.trainsPerPage)
            });
        }
    };

    nextPage = () => {
        if(this.state.currentPage < Math.ceil(this.state.trains.length / this.state.trainsPerPage)) {
            this.setState({
                currentPage: this.state.currentPage + 1
            });
        }
    };


  getTrains(){
    axios.get("http://localhost:8082/trainApi/v1/viewTrains")
    .then(response=>response.data)
    .then((data)=>{
      this.setState({trains:data,isLoading:false})
    });

  }



  deleteTrain=(id)=>{
    this.props.deleteTrain(id);
    setTimeout(()=>{
      if(this.props.trainObject!=null){
          this.setState({"show":true})
          setTimeout(()=>this.setState({"show":false}),3000);
          this.getTrains(this.state.currentPage);
        }else{
          this.setState({"show":false});
        }
    },1000);
  };

  render(){
    const {trains,currentPage,trainsPerPage}=this.state;
    const lastIndex=currentPage*trainsPerPage;
    const firstIndex=lastIndex-trainsPerPage;
    const currentTrains=trains.slice(firstIndex,lastIndex);
    const totalPages=Math.ceil(trains.length/trainsPerPage);


    return(
      <div>
      <div style={{"display":this.state.show?"block":"none"}}>
      <MyToast show={this.state.show}  message={"Train Deleted Successfully"} type={"danger"}/>
      </div>
      {this.state.isLoading ? (
        <Row allign="center">
            <ReactLoading type={"bars"} color={"white"}/>
          </Row>
        ) :(
      <Card className={"border borderless bg-light text-dark"}>
      <Card.Header><FontAwesomeIcon icon={faList} /> Train List</Card.Header>
      <Card.Body>
      <Table striped borderless hover responsive variant="light">
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
      <th>Status</th>
    </tr>
  </thead>
  <tbody>
  {trains.length===0 ?
    <tr allign="center">
    <td colSpan="10">{trains.length} Trains Available</td>
    </tr>:
    currentTrains.map((train)=>(
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
      <td>{train.status}</td>
      {localStorage.role==="[ROLE_ADMIN]"?
      <td>
      <ButtonGroup >
      <Link to={"edit/"+train.id} className="btn btn-sm btn-primary"><FontAwesomeIcon icon={faEdit} /></Link>{'  '}
      <Button size="sm" variant="danger" onClick={this.deleteTrain.bind(this,train.id)}><FontAwesomeIcon icon={faTrash} /></Button>
      </ButtonGroup>
      </td>:null
    }
      </tr>
    ))
  }
  </tbody>
</Table>

      </Card.Body>
      <Card.Footer>
      <div style={{"float":"left"}}>
      Showing Page {currentPage} of {totalPages}
      </div>
      <div style={{"float":"right"}}>
      <InputGroup size="sm">
      <InputGroup.Prepend>
      <Button type="button" variant="primary" disabled={currentPage===1?true:false} onClick={this.firstPage}>
       <FontAwesomeIcon icon={faFastBackward}/> First
      </Button>
      <Button type="button" variant="primary" disabled={currentPage===1?true:false} onClick={this.prevPage}>
       <FontAwesomeIcon icon={faStepBackward}/> Prev
      </Button>
      </InputGroup.Prepend>
      <FormControl  className={"page-num bg-primary"} name="currentPage" value={currentPage} onChange={this.changePage}/>
      <InputGroup.Append>
      <Button type="button" variant="primary" disabled={currentPage===totalPages?true:false} onClick={this.nextPage}>
       <FontAwesomeIcon icon={faStepForward}/> Next
      </Button>
      <Button type="button" variant="primary" disabled={currentPage===totalPages?true:false} onClick={this.lastPage}>
       <FontAwesomeIcon icon={faFastForward}/> Last
      </Button>
      </InputGroup.Append>
      </InputGroup>
      </div>


      </Card.Footer>
      </Card>
    )}
      </div>

    )
  }

}

const mapStateToProps=state=>{
  return{
    trainObject:state.train

  };

};

const mapDispatchToProps=dispatch=>{
  return{

    deleteTrain:(id)=>dispatch(deleteTrain(id))
  }

};


export default connect(mapStateToProps,mapDispatchToProps)(TrainList);
