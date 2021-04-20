package com.project.userservice.model;

import org.springframework.data.annotation.Id;

public class Passenger {
	
	@Id
	private String id;
	private String name;
	private int age;
	private String gender;
	
	public Passenger() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Passenger(String name, int age, String gender) {
		super();
		this.name = name;
		this.age = age;
		this.gender = gender;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getAge() {
		return age;
	}

	public void setAge(int age) {
		this.age = age;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	@Override
	public String toString() {
		return "Passenger [id=" + id + ", name=" + name + ", age=" + age + ", gender=" + gender + "]";
	}
	

}
