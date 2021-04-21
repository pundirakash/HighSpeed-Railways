import './App.css';
import Welcome from './components/Welcome';
import Footer from './components/Footer'
import Train from './components/Train'
import TrainList from './components/TrainList'
import Login from './components/User/Login'
import Register from './components/User/Register'
import {Container,Row,Col} from 'react-bootstrap';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import QueryTrainList from './components/Train/QueryTrainList';
import BookTicket from './components/Booking/BookTicket';
import BookingList from './components/Booking/BookingList';
import UserProfile from './components/User/UserProfile';
import Bookings from './components/Booking/Bookings'
import BookingStatus from './components/Booking/BookingStatus';
import BookingSuccess from './components/Booking/BookingSuccess';
import NavigationBar from './components/NavigationBar';
function App() {


  return (
    <Container className="App container-top" fluid style={{"padding":0}}>

    <Router>

      <Container style={{"padding":0}}>
      <NavigationBar className="nav-style"/>
      </Container>
      <Container fluid style={{"padding":0}}>
      <Switch>
      <Route path="/" exact component={Welcome}/>
      <Route path="/addTrain" exact component={Train}/>
      <Route path="/edit/:id" exact component={Train}/>
      <Route path="/queryTrain/:sourceStation/:destinationStation/:journeyDate" exact component={QueryTrainList}/>
      <Route path="/trainList" exact component={TrainList}/>
      <Route path="/register" exact component={Register}/>
      <Route path="/login" exact component={Login}/>
      <Route path="/logout" exact component={Login}/>
      <Route path="/bookingList" exact component={BookingList}/>
      <Route path="/userProfile" exact component={UserProfile}/>
      <Route path="/bookTicket/:id" exact component={BookTicket}/>
      <Route path="/allBookings" exact component={Bookings}/>
      <Route path="/getStatus/:id" exact component={BookingStatus}/>
      <Route path="/bookingSuccess" exact component={BookingSuccess}/>
      </Switch>
      </Container>
      <Container fluid style={{"padding":0}}>
      <Footer/>
      </Container>
      </Router>

    </Container>
  );
}

export default App;
