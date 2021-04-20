package com.project.bookingservice.service;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

import com.project.bookingservice.exceptions.BookingNotFoundException;
import com.project.bookingservice.model.Booking;

public interface BookingService {
	
	public List<Booking> getAllBookings() throws BookingNotFoundException;
	
	public Optional<Booking> getBooking(int bookingId) throws BookingNotFoundException;
	
	public String addBooking(Booking booking,String token,Principal principal);
	
	public String cancelBooking(int bookingId,String token,Principal principal) throws BookingNotFoundException;
	
//	public String updateBooking(Booking booking);
	


}
