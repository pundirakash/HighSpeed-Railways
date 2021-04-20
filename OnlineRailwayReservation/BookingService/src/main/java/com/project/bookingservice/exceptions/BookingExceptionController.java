package com.project.bookingservice.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;



@ControllerAdvice
public class BookingExceptionController {
	
	@ExceptionHandler(value = BookingNotFoundException.class)
	public ResponseEntity<Object> exception(BookingNotFoundException exception) {
	      return new ResponseEntity<>(exception.getMessage(), HttpStatus.NOT_FOUND);
	   }

}
