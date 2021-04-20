package com.project.userservice.controller;

import java.security.Principal;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.userservice.common.UserConstant;
import com.project.userservice.model.AuthenticationRequest;
import com.project.userservice.model.AuthenticationResponse;
import com.project.userservice.model.Booking;
import com.project.userservice.model.User;
import com.project.userservice.service.CustomUserDetailsService;
import com.project.userservice.service.UserService;
import com.project.userservice.util.JwtUtil;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
	
	
	
	@Autowired
	UserService userService;
	
	@Autowired
	private BCryptPasswordEncoder passwordEncoder;
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private CustomUserDetailsService userDetailsService;
	
	@Autowired
	private JwtUtil jwtTokenUtil;
	
	@PostMapping("/registerUser")
	public String addUser(@RequestBody User user) {
		user.setRoles(UserConstant.DEFAULT_ROLE);
		String encryptedPwd=passwordEncoder.encode(user.getPassword());
		user.setPassword(encryptedPwd);
		userService.create(user);
		return "user added";	
		}
	
	@PostMapping("/authenticate")
    public ResponseEntity<?> generateToken(@RequestBody AuthenticationRequest authenticationRequest) throws Exception {
		try {
		authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(authenticationRequest.getUserName(),authenticationRequest.getPassword())
				);
		}catch (BadCredentialsException e) {
			throw new Exception("Incorrect username or password",e);
		}
		final UserDetails userDetails=userDetailsService.loadUserByUsername(authenticationRequest.getUserName());
		userDetails.getAuthorities().toString();
		final String jwt=jwtTokenUtil.generateToken(userDetails);
		return ResponseEntity.ok(new AuthenticationResponse(jwt,userDetails.getAuthorities().toString()));
		
	}
	
//	@GetMapping("/access/{userId}/{userRole}")
//	@PreAuthorize("hasAuthority('ROLE_ADMIN')")
//	public String giveAccessToUser(@PathVariable int userId, @PathVariable String userRole, Principal principal) {
//		User user = userService.findById(userId);
//		List<String> activeRoles=getRolesByLoggedInUser(principal);
//		String newRole = "";
//		if (activeRoles.contains(userRole)) {
//            newRole = user.getRoles() + "," + userRole;
//            user.setRoles(newRole);
//        }
//		userService.update(user);
//		return "Hi "+user.getUserName()+" New role assigned to you by "+principal.getName();
//		
//	}
	
	@GetMapping
	@Secured("ROLE_ADMIN")
	@PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public List<User> loadUsers() {
        return userService.findAll();
    }

	
//	private List<String> getRolesByLoggedInUser(Principal principal){
//		 String roles = getLoggedInUser(principal).getRoles();
//		 List<String> assignRoles = Arrays.stream(roles.split(",")).collect(Collectors.toList());
//		 if (assignRoles.contains("ROLE_ADMIN")) {
//	            return Arrays.stream(UserConstant.ADMIN_ACCESS).collect(Collectors.toList());
//	        }
//		 return Collections.emptyList();
//	}
	

	@PreAuthorize("hasAuthority('ROLE_USER') or hasAuthority('ROLE_ADMIN')")
	@GetMapping("/getUser")
	public User getUser(Principal principal) {
        return userService.findByUserName(principal.getName()).get();
        
    }
	
	@PutMapping("updateUser")
	@PreAuthorize("hasAuthority('ROLE_USER')")
	String updateUser(@RequestBody User user,Principal principal) {
			userService.update(user,principal);
			return "User updated Successfully";
		
		
		
	}
	
	@GetMapping("findByUserName/{userName}")
	public User findByUserName(@PathVariable String userName){
		return userService.findByUserName(userName).get();
	}
	
	@PreAuthorize("hasAuthority('ROLE_USER')")
	@GetMapping("/getUserBookings")
	public  List<Booking> getUserBookings(Principal principal){
		return userService.getUserBookings(principal);
	}

	
	
	
	
	
	

}
