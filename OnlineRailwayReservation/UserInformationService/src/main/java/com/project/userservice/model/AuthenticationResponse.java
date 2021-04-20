package com.project.userservice.model;

public class AuthenticationResponse {
	
	private final String jwt;
	private final String authority;

	public String getAuthority() {
		return authority;
	}


	public String getJwt() {
		return jwt;
	}
	

	public AuthenticationResponse(String jwt,String authority) {
		super();
		this.jwt = jwt;
		this.authority=authority;
	}

}
