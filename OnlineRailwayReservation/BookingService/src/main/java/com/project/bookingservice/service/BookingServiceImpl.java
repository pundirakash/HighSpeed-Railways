package com.project.bookingservice.service;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.project.bookingservice.exceptions.BookingNotFoundException;
import com.project.bookingservice.model.Booking;
import com.project.bookingservice.model.Train;
import com.project.bookingservice.model.User;
import com.project.bookingservice.repository.BookingRepository;
import com.project.bookingservice.service.SequenceGeneratorService;

@SuppressWarnings("unused")
@Service
public class BookingServiceImpl implements BookingService {
	
	@Autowired
	private RestTemplate restTemplate;
	@Autowired
	private SequenceGeneratorService service;
	
	@Autowired
	private BookingRepository bookingRepository;
	

	@Override
	public List<Booking> getAllBookings() {
		List<Booking> booking= bookingRepository.findAll();
		if(booking.isEmpty()==true) {
			throw new BookingNotFoundException("No booking available");
		}else {
			return booking;
		}
	}

	
	
	
	
	@Override
	public Optional<Booking> getBooking(int bookingId) {
		Optional<Booking> opt= bookingRepository.findById(bookingId);
		if(opt.isEmpty()==true) {
			throw new BookingNotFoundException("No booking found with the given Id");
		}
		else {
			return opt;
		}
	}

	
	
	
	
	@Override
	public String addBooking(Booking booking,String token,Principal principal) {
		
		//Setting Up Header and sequence No
		HttpHeaders headers = new HttpHeaders();
		headers.set("Authorization", token);
		booking.setId(service.getSequenceNumber(Booking.SEQUENCE_NAME));
		
		Train train =booking.getTrain();
		Train train1=restTemplate.getForObject("http://TrainInformationService/trainApi/v1/findById/"+train.getId(),Train.class);
		train1.setCapacity(train1.getCapacity()-booking.getPassengerList().size());
		
		//Updating train Seats in Train microservice
		HttpEntity <Train> entity=new HttpEntity<Train>(train1,headers);
		restTemplate.exchange("http://TrainInformationService/trainApi/v1/updateTrain", HttpMethod.PUT, entity, String.class);
		
		//Inserting New booked ticket in booking database
		bookingRepository.insert(booking);
		Booking booking2=bookingRepository.findById(booking.getId()).get();
		
		
		//Updating booking in User object
		User user1=restTemplate.getForObject("http://UserInformationService/user/findByUserName/"+principal.getName(), User.class);
		if(user1.getUserbookings()==null) {
			List<Booking> list=new ArrayList<Booking>();
			list.add(booking2);
			user1.setUserbookings(list);
		}
		else {
			List<Booking> list=new ArrayList<Booking>(user1.getUserbookings());
			list.add(booking2);
			user1.setUserbookings(list);
		}
		
		HttpEntity <User> entity1=new HttpEntity<User>(user1,headers);
		restTemplate.exchange("http://UserInformationService/user/updateUser", HttpMethod.PUT,entity1,String.class);
		
		return "Ticket booked with id "+booking.getId()+" for "+principal.getName();
	}

	
	
	
	
	
	
	@Override
	public String cancelBooking(int bookingId,String token,Principal principal) {
		//Setting up header
		HttpHeaders headers = new HttpHeaders();
		headers.set("Authorization", token);
		
		//
		if(bookingRepository.findById(bookingId).isEmpty()==true) {
			throw new BookingNotFoundException("No booking available with Id "+bookingId);
		}
		else {
		Booking booking1=bookingRepository.findById(bookingId).get();
		System.out.println(booking1.getStatus());
		String status=booking1.getStatus();
		if(status.equals("cancelled")==false) {
			booking1.setStatus("cancelled");
			Train train1=booking1.getTrain();
			Train train2=restTemplate.getForObject("http://TrainInformationService/trainApi/v1/findById/"+train1.getId(),Train.class);
			train2.setCapacity(train2.getCapacity()+booking1.getPassengerList().size());
			
			HttpEntity <Train> entity=new HttpEntity<Train>(train2,headers);
			restTemplate.exchange("http://TrainInformationService/trainApi/v1/updateTrain", HttpMethod.PUT, entity, String.class);
			bookingRepository.save(booking1);
			//Getting user object
			User user1=restTemplate.getForObject("http://UserInformationService/user/findByUserName/"+principal.getName(), User.class);
			//Traversing List and replacing with new cancelled booking status
			List<Booking> list=new ArrayList<Booking>(user1.getUserbookings());
			for (int counter = 0; counter < list.size(); counter++) { 		      
		          if(list.get(counter).getId()==booking1.getId()) {
		        	  list.set(counter, booking1);
		          }
		      }   	
			//Replacing old bookings to new list of bookings
			user1.setUserbookings(list);
	        HttpEntity <User> entity1=new HttpEntity<User>(user1,headers);
			restTemplate.exchange("http://UserInformationService/user/updateUser", HttpMethod.PUT,entity1,String.class);
			return "Booking Cancelled";
		}
		else {
			return "you have already canceled your booking";
		
		}
		}
		
	}

	

}
