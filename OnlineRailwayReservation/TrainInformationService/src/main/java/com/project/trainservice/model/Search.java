package com.project.trainservice.model;

public class Search {
	
	private String sourceStation;
	private String destinationStation;
	private String journeyDate;
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
	public String getJourneyDate() {
		return journeyDate;
	}
	public void setJourneyDate(String journeyDate) {
		this.journeyDate = journeyDate;
	}
	public Search(String sourceStation, String destinationStation, String journeyDate) {
		super();
		this.sourceStation = sourceStation;
		this.destinationStation = destinationStation;
		this.journeyDate = journeyDate;
	}
	public Search() {
		super();
		// TODO Auto-generated constructor stub
	}

}
