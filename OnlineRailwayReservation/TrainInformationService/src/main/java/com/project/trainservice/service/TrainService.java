package com.project.trainservice.service;


import java.util.List;
import java.util.Optional;

import com.project.trainservice.exception.TrainNotFoundException;
import com.project.trainservice.model.Train;

public interface TrainService {
	
public String create(Train train);
	
	public String update(Train train);
	
	public List<Train> find(String sourceStation,String destinationStation,String journeyDate) throws TrainNotFoundException;
	
	public List<Train> findAll() throws TrainNotFoundException;
	
	public void deleteTrain(int id);
	
	public Optional<Train> findTrainById(int id);

}
