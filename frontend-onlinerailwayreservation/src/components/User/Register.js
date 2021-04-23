import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Row, Col, Card, Form, InputGroup, FormControl, Button,Container} from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faEnvelope, faLock, faUndo, faUserPlus, faUser} from "@fortawesome/free-solid-svg-icons";
import {registerUser} from '../../services/index';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = this.initialState;
    }

    initialState = {
        userName:'', email:'', password:''
    };

    registerUser = () => {
            this.props.registerUser(this.state.userName, this.state.email,this.state.password);
            setTimeout(() => {
                if(this.props.register.isRegistered) {
                    return this.props.history.push("/login");
                } else {
                    this.resetRegisterForm();
                }
            }, 2000);
        };






    userChange = event => {
        this.setState({
            [event.target.name] : event.target.value
        });
    };

    resetRegisterForm = () => {
        this.setState(() => this.initialState);
    };

    render() {
        const {userName, email, password} = this.state;

        return (
          <Container fluid className="bg-light border">
            <Row className="justify-content-md-center" style={{"padding-top":50}}>
                <Col xs={5}>
                    <Card className={"border borderless bg-light text-dark"}>
                        <Card.Header>
                            <FontAwesomeIcon icon={faUserPlus}/> Register
                        </Card.Header>
                        <Card.Body>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text><FontAwesomeIcon icon={faUser}/></InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl autoComplete="off" type="text" name="userName" value={userName} onChange={this.userChange}
                                            className={"bg-light text-dark"} placeholder="Enter Name"/>
                                    </InputGroup>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text><FontAwesomeIcon icon={faEnvelope}/></InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl required autoComplete="off" type="text" name="email" value={email} onChange={this.userChange}
                                            className={"bg-light text-dark"} placeholder="Enter Email Address"/>
                                    </InputGroup>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text><FontAwesomeIcon icon={faLock}/></InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl required autoComplete="off" type="password" name="password" value={password} onChange={this.userChange}
                                            className={"bg-light text-dark"} placeholder="Enter Password"/>
                                    </InputGroup>
                                </Form.Group>
                            </Form.Row>
                        </Card.Body>
                        <Card.Footer style={{"text-align":"right"}}>
                            <Button size="sm" type="button" variant="primary" onClick={this.registerUser}
                                disabled={this.state.email.length === 0 || this.state.password.length === 0}>
                                <FontAwesomeIcon icon={faUserPlus}/> Register
                            </Button>{' '}
                            <Button size="sm" type="button" variant="warning" onClick={this.resetRegisterForm}>
                                <FontAwesomeIcon icon={faUndo}/> Reset
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
        register:state.register
    }
};

const mapDispatchToProps = dispatch => {
    return {
        registerUser: (userName,email, password) => dispatch(registerUser(userName,email, password))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
