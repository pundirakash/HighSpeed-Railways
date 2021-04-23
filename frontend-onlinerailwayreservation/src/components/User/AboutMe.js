import React, { Component } from 'react'
import {Jumbotron,Container} from 'react-bootstrap';

class AboutMe extends Component {
  render() {
    return (
      <Jumbotron fluid>
  <Container>
    <h1>About Developer</h1>
    <p>
      Hello, My name is Akash Pundir. I am a Full Stack Web Developer
    </p>
  </Container>
</Jumbotron>
    );
  }
}
export default AboutMe
