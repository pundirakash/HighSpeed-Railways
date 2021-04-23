package com.project.bookingservice;
import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpStatus;

import com.project.bookingservice.model.Booking;
import com.project.bookingservice.model.Passenger;
import com.project.bookingservice.model.Train;
import com.project.bookingservice.model.User;
import com.project.bookingservice.repository.BookingRepository;
import com.project.bookingservice.service.BookingService;




@RunWith(SpringRunner.class)
@SpringBootTest(classes=BookingServiceApplication.class)
public class BookingServiceApplicationTests {

	@Autowired
	private BookingService bookingService;
	
	@MockBean
	private BookingRepository bookingRepository;
	
	@MockBean
	private RestTemplate restTemplate;
	
	@MockBean
	Principal principal;
	
    @Test
	public void addBookingTest() {
    	List<Passenger> passengers = Stream
    			.of(new Passenger("Akash",21,"M"),new Passenger("Akash",21,"M")).collect(Collectors.toList());
    	Train train=new Train(1,"Rajdhani","A58","NDLS","SEC",1856.4,100,"2021-04-02","1500","1600","active");
    	
    	String token="abcd";
    	Booking booking1=new Booking(1,train,passengers,"active");

		Optional<Booking> opt3=Optional.ofNullable(booking1);
    	List<Booking> list=Stream.of(booking1).collect(Collectors.toList());
    	User user=new User(1,"user1","pwd1","a@gmail.com",true,"ROLE_USER",list);
    	
    	HttpHeaders headers = new HttpHeaders();
		headers.set("Authorization", token);
		when(principal.getName()).thenReturn("user1");
		when(restTemplate.getForObject("http://TrainInformationService/trainApi/v1/findById/"+train.getId(),Train.class)).thenReturn(train);
		HttpEntity <Train> entity=new HttpEntity<Train>(train,headers);
		when(restTemplate.exchange("http://TrainInformationService/trainApi/v1/updateTrain",HttpMethod.PUT, entity, String.class)).thenReturn(new ResponseEntity<String>("Success",HttpStatus.OK));
		when(bookingRepository.insert(booking1)).thenReturn(booking1);
		when(bookingRepository.findById(booking1.getId())).thenReturn(opt3);
		when(restTemplate.getForObject("http://UserInformationService/user/findByUserName/"+principal.getName(),User.class)).thenReturn(user);
		HttpEntity <User> entity1=new HttpEntity<User>(user,headers);
		when(restTemplate.exchange("http://UserInformationService/user/updateUser", HttpMethod.PUT,entity1,String.class)).thenReturn(new ResponseEntity<String>("Success",HttpStatus.OK));
		assertEquals("Ticket booked with id "+booking1.getId()+" for "+principal.getName(),bookingService.addBooking(booking1,token,principal));
		
	}
    
    @Test
    public void getBookingTest() {
    	int bookingId=1;
    	List<Passenger> passengers = Stream
    			.of(new Passenger("Akash",21,"M"),new Passenger("Akash",21,"M")).collect(Collectors.toList());
    	Train train=new Train(1,"Rajdhani","A58","NDLS","SEC",1856.4,100,"2021-04-02","1500","1600","active");
    	Booking booking=new Booking(1,train,passengers,"active");
    	Optional<Booking> opt=Optional.of(booking);
    	
    	when(bookingRepository.save(booking)).thenReturn(booking);
    	when(bookingRepository.findById(bookingId)).thenReturn(opt);
    	assertEquals(opt,bookingService.getBooking(bookingId));
    }
    
    @Test
    public void getAllBookingsTest() {
    	List<Passenger> passengers = Stream
    			.of(new Passenger("Akash",21,"M"),new Passenger("Akash",21,"M")).collect(Collectors.toList());
    	Train train=new Train(1,"Rajdhani","A58","NDLS","SEC",1856.4,100,"2021-04-02","1500","1600","active");
    	Booking booking=new Booking(1,train,passengers,"active");
    	List<Booking> bookings=Stream.of(booking).collect(Collectors.toList());
    	when(bookingRepository.findAll()).thenReturn(bookings);
    	assertEquals(1,bookingService.getAllBookings().size());
    }
	
	

}
