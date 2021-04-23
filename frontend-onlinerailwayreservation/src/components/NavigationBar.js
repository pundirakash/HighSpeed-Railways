import React, {Component} from 'react';
import "./Style.css"
import {connect} from 'react-redux';
import {Navbar,Nav,NavDropdown,Form,FormControl} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUserPlus, faSignInAlt, faSignOutAlt,faSubway,faUser,faSearch} from '@fortawesome/free-solid-svg-icons';
import {logoutUser} from '../services/index';


class NavigationBar extends Component {
  constructor(){
    super();
    this.state={
      id:''
    }
  }

  valueChange=event=>{
    this.setState({
      [event.target.name]:event.target.value
    }

    )
  };

    logout = () => {
        this.props.logoutUser();
    };

    render() {
      const {id}=this.state
        const guestLinks = (
            <>
                <div className="mr-auto"></div>
                <Nav className="navbar-right">
                    <Link to={"/register"} className="nav-link"><FontAwesomeIcon icon={faUserPlus} /> Register</Link>
                    <Link to={"/login"} className="nav-link"><FontAwesomeIcon icon={faSignInAlt} /> Login</Link>
                </Nav>
            </>
        );
        const adminLinks = (
            <>
                <Nav className="mr-auto">
                    <Link to={"/addTrain"} className="nav-link">Add Train</Link>
                    <Link to={"/trainList"} className="nav-link">Train List</Link>
                    <Link to={"/allBookings"} className="nav-link">Booking List</Link>
                </Nav>
                <Nav>
                <NavDropdown title=<FontAwesomeIcon icon={faUser}/> className="">
                <Link to={"/userProfile"} className="nav-link text-dark">Profile</Link>
                <NavDropdown.Divider />
                <Link to={"/aboutUs"} className="nav-link text-dark">About Us</Link>
                </NavDropdown>
                </Nav>
                <Nav className="navbar-right">
                    <Link to={"/logout"} className="nav-link" onClick={this.logout}><FontAwesomeIcon icon={faSignOutAlt} /> Logout</Link>
                </Nav>
            </>
        );

        const userLinks = (
            <>
                <Nav className="mr-auto" style={{"padding-left":20}}>
                    <Link to={"/trainList"} className="nav-link">Train List</Link>
                    <Link to={"/bookingList"} className="nav-link">My Bookings</Link>
                </Nav>
                <Nav>
                <NavDropdown title=<FontAwesomeIcon icon={faUser}/> className="">
                <Link to={"/userProfile"} className="nav-link text-dark">Profile</Link>
                <NavDropdown.Divider />
                <Link to={"/aboutUs"} className="nav-link text-dark">About Us</Link>
                </NavDropdown>
                </Nav>
                <Nav className="navbar-right">
                    <Link to={"/logout"} className="nav-link" onClick={this.logout}><FontAwesomeIcon icon={faSignOutAlt} /> Logout</Link>
                </Nav>
            </>
        );

        return (

            <Navbar variant="dark" className="nav-style ">
                <Link to={""} className="navbar-brand" style={{"font-weight": "bold"}}><FontAwesomeIcon icon={faSubway}/>   HighSpeed Railways
                </Link>
                <Nav>
                <Form inline style={{"padding-left":15}}>
                <FormControl type="number" placeholder="Check Booking Status" value={id} name="id" className=" mr-sm-2" onChange={this.valueChange}/>
                <Link to={"/getStatus/"+id} className="text-light"><FontAwesomeIcon icon={faSearch}/></Link>
                </Form>
                </Nav>
                {this.props.auth.isLoggedIn ? localStorage.role==="[ROLE_ADMIN]"?adminLinks:userLinks: guestLinks}
            </Navbar>
        );
    };
};

const mapStateToProps = state => {
    return {
        auth: state.auth
    };
};

const mapDispatchToProps = dispatch => {
    return {
        logoutUser: () => dispatch(logoutUser())
    };
};

export default connect(mapStateToProps,mapDispatchToProps) (NavigationBar);
