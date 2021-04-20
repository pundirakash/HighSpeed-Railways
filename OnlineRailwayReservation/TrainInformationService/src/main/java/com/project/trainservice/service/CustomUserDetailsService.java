package com.project.trainservice.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;


import com.project.trainservice.model.User;



@Service
public class CustomUserDetailsService implements UserDetailsService {

	@Autowired
	private RestTemplate restTemplate;
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		// TODO Auto-generated method stub
		
		Optional<User> user=Optional.ofNullable(restTemplate.getForObject("http://UserInformationService/user/findByUserName/"+username,User.class));
		System.out.println(user.get().getUserName());
		return user.map(CustomUserDetails::new)
                .orElseThrow(() -> new UsernameNotFoundException(username + " Not Found"));
	}

}
