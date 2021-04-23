import React from 'react';
import {Card,Form,Button,Col,Row} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave,faEdit } from '@fortawesome/free-solid-svg-icons'
import MyToast from "../MyToast";
import {connect} from 'react-redux';
import {getUser,updateUser} from '../../services/index'
import ReactLoading from 'react-loading'

class UserProfile extends React.Component {

  constructor(){
    super();
    this.state={
      id:'',
      userName:'',
      email:'',
      password:'',
      isLoading:true
    }
    this.userChange=this.userChange.bind(this);
  }

componentDidMount() {
  this.getUser();
}

userChange=event=>{
  this.setState({
    [event.target.name]:event.target.value
  }

  )
};

getUser=()=>{
  this.props.getUser();
  setTimeout(()=>{
    let user=this.props.userObject.user;
    if(user!=null){
        this.setState({
          id:user.id,
          userName:user.userName,
          email:user.email,
          password:user.password,
          role:user.roles,
          isLoading:false

        });
      }
  },1000)

}

updateUser=event=>{
  event.preventDefault();

  const user={
    id:this.state.id,
    userName:this.state.userName,
    email:this.state.email,
    password:this.state.password,
    roles:this.state.role
  };
  this.props.updateUser(user);
  setTimeout(()=>{
    if(this.props.userObject.user!=null){
       this.setState({"show":true})
       setTimeout(()=>this.setState({"show":false}),2000)
     }else{
       this.setState({"show":false});
     }

  },2000)

  this.setState(this.initialState);

}

  render() {
    const {userName,email,password}=this.state;
    return (
      <div>
      <div style={{"display":this.state.show?"block":"none"}}>
      <MyToast show={this.state.show} message={"User Updated Successfully"} type={"success"}/>
      </div>
      {this.state.isLoading ? (
        <Row allign="center">
            <ReactLoading type={"bars"} color={"white"}/>
          </Row>
        ) :(
      <Card className={"border borderless bg-light text-dark"}>
      <Card.Header> <FontAwesomeIcon icon={faEdit}/> Update your Profile</Card.Header>

      <Form onSubmit={this.updateUser} id="user">
      <Card.Body>

      <Form.Row>



      <Form.Group as={Col} controlId="formGridName">
      <Form.Label>UserName</Form.Label>
      <Form.Control disabled required autoComplete="off" type="text" value={userName} onChange={this.userChange} name="userName" className={"bg-light text-dark"} placeholder="Enter new UserName" />
      </Form.Group>

      <Form.Group as={Col} controlId="formGridEmail">
      <Form.Label>Email</Form.Label>
      <Form.Control required autoComplete="off" type="text" value={email} onChange={this.userChange} name="email" className={"bg-light text-dark"} placeholder="Enter new EmailId" />
      </Form.Group>

      <Form.Group as={Col} controlId="formGridPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control disabled required autoComplete="off" type="password" value={password} onChange={this.userChange} name="password" className={"bg-light text-dark"} placeholder="Enter new Password" />
      </Form.Group>

      </Form.Row>
      </Card.Body>
      <Card.Footer style={{textAlign:"right"}}>
      <Button size="lg" variant="primary"  type="submit">
      <FontAwesomeIcon icon={faSave}/>Update
      </Button>

      </Card.Footer>
      <h2>Do you Know?</h2>
      <h1>"1 lakh+ users daily visit our website"</h1>
      </Form>
      </Card>
    )}
      </div>
    );
  }
}

const mapStateToProps=state=>{
  return{
    userObject:state.user
  };

};

const mapDispatchToProps=dispatch=>{
  return{
    getUser:()=>dispatch(getUser()),
    updateUser:(user)=>dispatch(updateUser(user))
  }

};

export default connect(mapStateToProps,mapDispatchToProps) (UserProfile);
