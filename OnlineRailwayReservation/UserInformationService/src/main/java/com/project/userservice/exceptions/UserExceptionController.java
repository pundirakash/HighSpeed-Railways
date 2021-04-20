package com.project.userservice.exceptions;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;



@ControllerAdvice
public class UserExceptionController {
	
	@ExceptionHandler(value = UserAlreadyPresentException.class)
	public ResponseEntity<Object> exception(UserAlreadyPresentException exception) {
	      return new ResponseEntity<>(exception.getMessage(), HttpStatus.NOT_ACCEPTABLE);
	   }

}
