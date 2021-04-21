package com.project.bookingservice.controller;

import java.security.Principal;
import java.util.List;
import java.util.Optional;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.bookingservice.model.Booking;
import com.project.bookingservice.service.BookingService;

@RestController
@RequestMapping("/bookingApi/v1")
@CrossOrigin(origins = "http://localhost:3000")
public class BookingController {
	@Autowired
	private BookingService bookingService;
	
	@PreAuthorize("hasAuthority('ROLE_ADMIN')")
	@GetMapping("/allBookings")
	public List<Booking> getAllBookings(){
		return bookingService.getAllBookings();
	}
	
	
	@GetMapping("getBooking/{bookingId}")
	public Optional<Booking> getBooking(@PathVariable int bookingId){
		return bookingService.getBooking(bookingId);
	}
	
	@PreAuthorize("hasAuthority('ROLE_USER')")
	@PostMapping("/addBooking")
	public String addBooking(@RequestBody Booking booking, @RequestHeader("Authorization") String token,Principal principal) {
		return bookingService.addBooking(booking,token,principal);
	}
	
	@PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_USER')")
	@GetMapping("/cancelBooking/{bookingId}")
	public String cancelBooking(@PathVariable int bookingId,@RequestHeader("Authorization") String token,Principal principal) {
		return bookingService.cancelBooking(bookingId,token,principal);
	}


}
