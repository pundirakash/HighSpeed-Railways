import React from 'react';
import './Style.css'
import {Container} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook,faTwitter,faInstagram} from '@fortawesome/free-brands-svg-icons'

class Footer extends React.Component{
  render(){
    let fullyear=new Date().getFullYear();


    return(
      <footer className="bg-light">
      <Container fluid className="custom-padding">

      <FontAwesomeIcon className="social-icon" icon={faFacebook}/>
      <FontAwesomeIcon className="social-icon"  icon={faTwitter}/>
      <FontAwesomeIcon className="social-icon" icon={faInstagram}/>

      <div>© Copyright {fullyear} HighSpeed Railways</div>
      </Container>
      </footer>
    )
  }
}

export default Footer;
