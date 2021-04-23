import './App.css';
import Welcome from './components/Welcome';
import Footer from './components/Footer'
import Train from './components/Train/Train'
import TrainList from './components/Train/TrainList'
import Login from './components/User/Login'
import Register from './components/User/Register'
import {Container} from 'react-bootstrap';
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
      <Route path="/addTrain"  component={Train}/>
      <Route path="/edit/:id" component={Train}/>
      <Route path="/queryTrain/:sourceStation/:destinationStation/:journeyDate" component={QueryTrainList}/>
      <Route path="/trainList"  component={TrainList}/>
      <Route path="/register"  component={Register}/>
      <Route path="/login"  component={Login}/>
      <Route path="/logout"  component={Login}/>
      <Route path="/bookingList"  component={BookingList}/>
      <Route path="/userProfile"  component={UserProfile}/>
      <Route path="/bookTicket/:id" component={BookTicket}/>
      <Route path="/allBookings"  component={Bookings}/>
      <Route path="/getStatus/:id" component={BookingStatus}/>
      <Route path="/bookingSuccess" component={BookingSuccess}/>
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
