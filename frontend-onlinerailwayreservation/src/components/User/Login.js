import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Row, Col, Card, Form, InputGroup, FormControl, Button, Alert,Container} from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faSignInAlt, faEnvelope, faLock, faUndo} from "@fortawesome/free-solid-svg-icons";
import {authenticateUser} from '../../services/index';

class Login extends Component {

constructor(props){
  super(props);
  this.state=this.initialState
}

initialState={
  userName:'',password:'',error:''
};

validateUser = () => {
        this.props.authenticateUser(this.state.userName, this.state.password);
        setTimeout(() => {
            if(this.props.auth.isLoggedIn) {
                return this.props.history.push("/");
            } else {
                this.resetLoginForm();
                this.setState({"error":"Invalid UserName and password"});
            }
        }, 500);
    };

resetLoginForm = () => {
        this.setState(() => this.initialState);
    };

credentialChange = event => {
  this.setState({
    [event.target.name] : event.target.value
  });
};


  render() {
    const {userName,password,error}=this.state;
    return (
      <Container fluid className="bg-light">
      <Row className="justify-content-md-center" style={{"padding-top":100}}>
      <Col xs={5}>
       {error && <Alert variant="danger">{error}</Alert>}
      <Card className="border borderless bg-light text-dark">
      <Card.Header>
       <FontAwesomeIcon icon={faSignInAlt} /> Login
      </Card.Header>
      <Card.Body>
      <Form.Row>
      <Form.Group as={Col}>
       <InputGroup>
         <InputGroup.Prepend>
         <InputGroup.Text>
         <FontAwesomeIcon icon={faEnvelope} /></InputGroup.Text>
         </InputGroup.Prepend>
         <FormControl required autoComplete="off" type="text" name="userName" value={userName}
          onChange={this.credentialChange} className={"bg-light text-dark"} placeholder="Enter UserName"/>
       </InputGroup>
      </Form.Group>

      </Form.Row>
      <Form.Row>
      <Form.Group as={Col}>
       <InputGroup>
         <InputGroup.Prepend>
         <InputGroup.Text>
         <FontAwesomeIcon icon={faLock} /></InputGroup.Text>
         </InputGroup.Prepend>
         <FormControl required autoComplete="off" type="password" name="password" value={password}
          onChange={this.credentialChange} className={"bg-light text-dark"} placeholder="Enter Password"/>
       </InputGroup>
      </Form.Group>

      </Form.Row>

      </Card.Body>
      <Card.Footer style={{textAlign:"right"}}>
       <Button onClick={this.validateUser}
       size="sm" type="button" variant="primary" disabled={this.state.userName.length===0 || this.state.password.length===0}>
         <FontAwesomeIcon icon={faSignInAlt} />Login
       </Button> <Button onClick={this.resetLoginForm}
       size="sm" type="button" variant="warning" disabled={this.state.userName.length===0 && this.state.password.length===0 && this.state.error.length === 0}>
         <FontAwesomeIcon icon={faUndo} />Reset
       </Button>
      </Card.Footer>
      </Card>

      </Col>


      </Row>
      </Container>
    );
  }
}
const mapStateToProps = state => {
    return {
        auth:state.auth
    }
};

const mapDispatchToProps = dispatch => {
    return {
        authenticateUser: (userName, password) => dispatch(authenticateUser(userName, password))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
