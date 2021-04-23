package com.project.userservice;

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
import org.springframework.test.context.junit4.SpringRunner;

import com.project.userservice.model.Booking;
import com.project.userservice.model.User;
import com.project.userservice.repository.UserRepository;
import com.project.userservice.service.UserService;

@RunWith(SpringRunner.class)
@SpringBootTest(classes=UserInformationServiceApplication.class)
public class UserInformationServiceApplicationTests {

	@MockBean
	UserRepository userRepository;
	
	@Autowired
	UserService userService;
	
	@MockBean
	Principal principal;
	
	@Test
	public void createTest() {
		List<Booking> list=new ArrayList<Booking>();
		User user=new User(1,"user1","pwd1","a@gmail.com",true,"ROLE_USER",list);
		
		userService.create(user);
		verify(userRepository,times(1)).insert(user);
	}
	
	@Test
	public void updateTest() {
		Principal principal = null;
		List<Booking> list=new ArrayList<Booking>();
		User user=new User(1,"user1","pwd1","a@gmail.com",true,"ROLE_USER",list);
		when(userRepository.save(user)).thenReturn(user);
		userService.update(user,principal);
		verify(userRepository,times(1)).save(user);
		
	}
	
	
	
	@Test
	public void findByIdTest() {
		int id=1;
		List<Booking> list=new ArrayList<Booking>();
		User user=new User(1,"user1","pwd1","a@gmail.com",true,"ROLE_USER",list);
		Optional<User> opt=Optional.of(user);
		when(userRepository.findById(id)).thenReturn(opt);
		assertEquals(user,userService.findById(id));
		
	}
	
	@Test
	public void findAllTest() {
		List<Booking> list=new ArrayList<Booking>();
		User user=new User(1,"user1","pwd1","a@gmail.com",true,"ROLE_USER",list);
		when(userRepository.findAll()).thenReturn(Stream
				.of(user).collect(Collectors.toList()));
		
		assertEquals(1,userService.findAll().size());
	}
	
	@Test
	public void getUserBookingsTest() {
		List<Booking> list=new ArrayList<Booking>();
		User user=new User(1,"user1","pwd1","a@gmail.com",true,"ROLE_USER",list);
		Optional<User> opt= Optional.of(user);
		when(principal.getName()).thenReturn("user1");
		when(userRepository.findByUserName(principal.getName())).thenReturn(opt);
		assertEquals(0,userService.getUserBookings(principal).size());
		
	}
}

