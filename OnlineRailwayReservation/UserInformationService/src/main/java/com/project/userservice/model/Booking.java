package com.project.userservice.model;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection="Bookings")
public class Booking {
	@Transient
	public static final String SEQUENCE_NAME="booking_sequence";
	
	@Id
	private int id;
	private Train train;
	private List<Passenger> passengerList;
	String status="active";
	
	public Booking() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Booking(int id,Train train, List<Passenger> passengerList, String status) {
		super();
		this.id=id;
		this.train = train;
		this.passengerList = passengerList;
		this.status = status;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Train getTrain() {
		return train;
	}

	public void setTrain(Train train) {
		this.train = train;
	}

	public List<Passenger> getPassengerList() {
		return passengerList;
	}

	public void setPassengerList(List<Passenger> passengerList) {
		this.passengerList = passengerList;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	@Override
	public String toString() {
		return "Booking [id=" + id + ", train=" + train + ", passengerList=" + passengerList + ", status=" + status
				+ "]";
	}

	
	
	
	
	

	
	


}
