package com.project.trainservice.model;


import java.util.List;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection="Users")
public class User {
	@Transient
	public static final String SEQUENCE_NAME="user_sequence";
	@Id
	private int id;
	@Size(min=2,max=30)
	private String userName;
	private String password;
	@Email
	private String email;
	private boolean active=true;
	private String roles;
	private List<Booking> userbookings;
	public User() {
		super();
		// TODO Auto-generated constructor stub
	}
	public User(int id, String userName, String password, String email, boolean active, String roles,
			List<Booking> userbookings) {
		super();
		this.id = id;
		this.userName = userName;
		this.password = password;
		this.email = email;
		this.active = active;
		this.roles = roles;
		this.userbookings = userbookings;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public boolean isActive() {
		return active;
	}
	public void setActive(boolean active) {
		this.active = active;
	}
	public String getRoles() {
		return roles;
	}
	public void setRoles(String roles) {
		this.roles = roles;
	}
	public List<Booking> getUserbookings() {
		return userbookings;
	}
	public void setUserbookings(List<Booking> userbookings) {
		this.userbookings = userbookings;
	}
	@Override
	public String toString() {
		return "User [id=" + id + ", userName=" + userName + ", password=" + password + ", email=" + email + ", active="
				+ active + ", roles=" + roles + ", userbookings=" + userbookings + "]";
	}
	
	
	
	
	
	
	
	
}