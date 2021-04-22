package com.project.userservice.service;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.userservice.model.Booking;
import com.project.userservice.model.User;
import com.project.userservice.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {
	
	@Autowired
	UserRepository userRepository;
	@Autowired
	SequenceGeneratorService service;

	public void create(User user) {
		user.setId(service.getSequenceNumber(User.SEQUENCE_NAME));
		userRepository.insert(user);
		
	}


	@Override
	public Optional<User> findByUserName(String userName) {
		// TODO Auto-generated method stub
		return userRepository.findByUserName(userName);
	}

	@Override
	public User findById(int userId) {
		// TODO Auto-generated method stub
		return userRepository.findById(userId).get();
	}

	@Override
	public void update(User user,Principal principal) {
		userRepository.save(user);
		
	}

	@Override
	public List<User> findAll() {
		// TODO Auto-generated method stub
		return userRepository.findAll();
	}

	@Override
	public List<Booking> getUserBookings(Principal principal) {
		User user1=userRepository.findByUserName(principal.getName()).get();
		return user1.getUserbookings();
	}
}
