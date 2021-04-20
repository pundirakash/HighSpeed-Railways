package com.project.trainservice.service;


import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.trainservice.exception.TrainNotFoundException;
import com.project.trainservice.model.Train;
import com.project.trainservice.repository.TrainRepository;

@Service
public class TrainServiceImpl implements TrainService {

	@Autowired
	TrainRepository trainRepository;
	
	@Autowired
	private SequenceGeneratorService service;

	public String create(Train train) {
		train.setId(service.getSequenceNumber(Train.SEQUENCE_NAME));
		trainRepository.insert(train);
		return "Train added with id"+train.getTrainId();

	}

	public String update(Train train) {
		if(trainRepository.findById(train.getId()).isEmpty()==true) {
			throw new TrainNotFoundException("Train does not exist with that id");
		}
		else {
		trainRepository.save(train);
		return "Successfully updated train";
		}
	}

	public List<Train> find(String sourceStation,String destinationStation,String journeyDate) {
		List<Train> train=trainRepository.findBySourceStationAndDestinationStationAndJourneyDate(sourceStation, destinationStation,journeyDate);
		if(train.isEmpty()==true) {
			throw new TrainNotFoundException("No train matched with your query");
		}
		else {
			return train;
		}
	}

	public List<Train> findAll() {
		if(trainRepository.findAll().isEmpty()) {
			throw new TrainNotFoundException("No train is available");
		}
		else {
			return trainRepository.findAll();
		}
	}
	
	public Optional<Train> findTrainById(int id){
		Optional<Train> opt=trainRepository.findById(id);
		if(opt.isEmpty()==true) {
			throw new TrainNotFoundException("Id did not matched");
		}else {
			return opt;
		}
		
	}
	
	public void deleteTrain(int id) {
		if(trainRepository.findById(id).isEmpty()==true) {
			throw new TrainNotFoundException("Train with id "+id+" not found");
		}
		else {
		trainRepository.deleteById(id);
		}
	}

}
