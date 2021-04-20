package com.project.trainservice;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.project.trainservice.exception.TrainNotFoundException;

@ControllerAdvice
public class TrainExceptionController {
	
	@ExceptionHandler(value = TrainNotFoundException.class)
	public ResponseEntity<Object> exception(TrainNotFoundException exception) {
	      return new ResponseEntity<>(exception.getMessage(), HttpStatus.NOT_FOUND);
	   }

}
