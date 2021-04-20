package com.project.bookingservice.service;

import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.project.bookingservice.model.Booking;
import com.project.bookingservice.model.User;



public class CustomUserDetails implements UserDetails{
	
	private String username;
	private String password;
	private boolean isActive;
	private List<GrantedAuthority> authorities;
	private List<Booking> bookings;

	public CustomUserDetails(User user) {
		this.username=user.getUserName();
		this.password=user.getPassword();
		this.isActive=user.isActive();
		this.authorities = Arrays.stream(user.getRoles().split(","))
	                .map(SimpleGrantedAuthority::new)
	                .collect(Collectors.toList());
		this.bookings=user.getUserbookings();
		
	}
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		// TODO Auto-generated method stub
		return authorities;
	}

	@Override
	public String getPassword() {
		// TODO Auto-generated method stub
		return password;
	}

	@Override
	public String getUsername() {
		// TODO Auto-generated method stub
		return username;
	}

	@Override
	public boolean isAccountNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isEnabled() {
		// TODO Auto-generated method stub
		return isActive;
	}

}
