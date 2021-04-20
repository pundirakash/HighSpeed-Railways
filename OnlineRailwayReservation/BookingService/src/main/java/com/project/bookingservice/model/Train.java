package com.project.bookingservice.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;




public class Train {
	
	@Id
	private int id;
	private String trainId;
	private String name;
	private String sourceStation;
	private String destinationStation;
	private double fare;
	private int capacity;
	private String journeyDate;
	private String arrives;
	private String departs;
	private String status;
	
	
	
	
	public Train(int id, String trainId, String name, String sourceStation, String destinationStation, double fare,
			int capacity, String journeyDate, String arrives, String departs, String status) {
		super();
		this.id = id;
		this.trainId = trainId;
		this.name = name;
		this.sourceStation = sourceStation;
		this.destinationStation = destinationStation;
		this.fare = fare;
		this.capacity = capacity;
		this.journeyDate = journeyDate;
		this.arrives = arrives;
		this.departs = departs;
		this.status = status;
	}




	public Train() {
		super();
		// TODO Auto-generated constructor stub
	}




	public int getId() {
		return id;
	}




	public void setId(int id) {
		this.id = id;
	}




	public String getTrainId() {
		return trainId;
	}




	public void setTrainId(String trainId) {
		this.trainId = trainId;
	}




	public String getName() {
		return name;
	}




	public void setName(String name) {
		this.name = name;
	}




	public String getSourceStation() {
		return sourceStation;
	}




	public void setSourceStation(String sourceStation) {
		this.sourceStation = sourceStation;
	}




	public String getDestinationStation() {
		return destinationStation;
	}




	public void setDestinationStation(String destinationStation) {
		this.destinationStation = destinationStation;
	}




	public double getFare() {
		return fare;
	}




	public void setFare(double fare) {
		this.fare = fare;
	}




	public int getCapacity() {
		return capacity;
	}




	public void setCapacity(int capacity) {
		this.capacity = capacity;
	}




	public String getJourneyDate() {
		return journeyDate;
	}




	public void setJourneyDate(String journeyDate) {
		this.journeyDate = journeyDate;
	}




	public String getArrives() {
		return arrives;
	}




	public void setArrives(String arrives) {
		this.arrives = arrives;
	}




	public String getDeparts() {
		return departs;
	}




	public void setDeparts(String departs) {
		this.departs = departs;
	}




	public String getStatus() {
		return status;
	}




	public void setStatus(String status) {
		this.status = status;
	}
	
	
	
	
	
	
	

	

	
	
	
	
	
	

}
