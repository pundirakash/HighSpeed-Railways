package com.project.userservice.service;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

import com.project.userservice.model.Booking;
import com.project.userservice.model.User;

public interface UserService {
	
	public void create(User user);
	public Optional<User> findByUserName(String userName);
	public User findById(int userId);
	public void update(User user,Principal principal);
	public List<User> findAll();
	public List<Booking> getUserBookings(Principal principal);

}
