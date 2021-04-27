import React from 'react';
import {Row,Col,Container,Carousel,Button,Card} from 'react-bootstrap';
import QueryTrain from './Train/QueryTrain';
import Hills from '../assets/images/hills.jpg'
import CharDham from '../assets/images/charDham.jpg'
import Blanket from '../assets/images/blanket_pillow_eyeshade.jpg'
import Cancellation from '../assets/images/Cancellation-Assitance.jpg'
import Lounge from '../assets/images/ImgLounge.png'
import Buddhist from '../assets/images/Buddhist.jpg'
import Maharaja from '../assets/images/Maharaja.jpg'
import Mountains from '../assets/images/Mountains.jpg'

class Welcome extends React.Component{
  render(){
    return(
      <Container fluid style={{"padding":0}}>
      <Container fluid className="container-top" style={{"padding":0}}>
      <Container>

      <Row style={{"padding-top":30}}>
      <Col className="col-padding">
      <QueryTrain className="bg-dark text-white "/>
      </Col>
      <Col>
    <Carousel fade style={{"padding-top":45}} className="">
  <Carousel.Item>
    <img
      className="d-block w-100 rounded"
      src={Hills}
      alt="First slide"
    />
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100 rounded"
      src={CharDham}
      alt="Second slide"
    />
  </Carousel.Item>
</Carousel>
      </Col>
      </Row>
      </Container>
      </Container>
      <Container fluid className="container-middle" style={{"padding":0}}>
      <Container>
      <Row style={{"padding":50}}>
      <Col>
      <Carousel className="">
  <Carousel.Item interval={500}>
    <img
      className="d-block w-100 rounded"
      src={Blanket}
      alt="First slide"
    />
    <Carousel.Caption className="text-dark">
      <h3>Blanket and Pillow for you</h3>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item interval={500}>
    <img
      className="d-block w-100 rounded"
      src={Cancellation}
      alt="Second slide"
    />
    <Carousel.Caption className="text-dark">
      <h3>One Click Cancellation</h3>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item interval={500}>
    <img
      className="d-block w-100 rounded"
      src={Lounge}
      alt="Third slide"
    />
    <Carousel.Caption className="text-dark">
      <h3>Lounge for all customers</h3>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>
</Col>
<Col style={{"padding":0}}>
    <h1 style={{"padding-top":150}}>The Reason you should choose us</h1>

</Col>
</Row>
      </Container>
      </Container>
      <Container fluid className="container-middleb" style={{"padding":0}}>
      <Container className="text-center"  style={{"padding":0}}>

      <Row className="middleb-padding">
      <Col className="text-center" style={{"padding-top":80}}>
      <h1 style={{"padding-left":20}} >
      Explore our special offers
      </h1>
      </Col>
      <Col>
      <Card style={{ width: '16rem' }}>
  <Card.Img variant="top" src={Buddhist} />
  <Card.Body>
    <Card.Title>Buddhist Circuit Train</Card.Title>
    <Card.Text>
      Buddhist Train India will help you visit all these places up close for a truly religious experience.
    </Card.Text>
    <Button variant="secondary">Explore</Button>
  </Card.Body>
</Card>
</Col>
<Col>
<Card style={{ width: '16rem' }}>
  <Card.Img variant="top" src={Mountains} />
  <Card.Body>
    <Card.Title>Nilgiri Offer</Card.Title>
    <Card.Text>
      HighSpeed Railways offers Exclusive Rail tour packages, sight-seeing and meal for enchanting Nilgiri Mountains
    </Card.Text>
    <Button variant="secondary">Explore</Button>
  </Card.Body>
</Card>
</Col>
<Col>
<Card style={{ width: '16rem' }}>
  <Card.Img variant="top" src={Maharaja} />
  <Card.Body>
    <Card.Title>Maharaja's Express</Card.Title>
    <Card.Text>
      Redefining Luxury and Comfort, Maharaja takes you on a sojourn to the era of bygone stately splendour of princely states.
    </Card.Text>
    <Button variant="secondary">Explore</Button>
  </Card.Body>
</Card>
</Col>
      </Row>
      </Container>
      </Container>
      <Container fluid className="container-bottom" style={{"padding":0}}>
      <Container>
      <Row className="custom-padding" textAlign="center">
      <h3 class="big-heading">Worried about Planning? We Will Plan travel for you</h3>
      </Row>
      <Row className="row-padding" textAlign="center">
      <a href="mailto:name@email.com" className="btn btn-lg center btn-light">Contact Us</a>
      </Row>
      </Container>
      </Container>
      </Container>

    )
  }
}

export default Welcome;
