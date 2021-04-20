package com.project.bookingservice.exceptions;

public class BookingNotFoundException extends RuntimeException {
	
	private static final long serialVersionUID=1L;

	public BookingNotFoundException(String message) {
		super(message);
		// TODO Auto-generated constructor stub
	}

	public BookingNotFoundException() {
		super();
		// TODO Auto-generated constructor stub
	}

}
