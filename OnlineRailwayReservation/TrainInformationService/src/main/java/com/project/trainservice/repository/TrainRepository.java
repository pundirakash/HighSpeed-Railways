package com.project.trainservice.repository;


import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.project.trainservice.model.Train;

@Repository
public interface TrainRepository extends MongoRepository<Train, Integer> {
	
	List<Train> findBySourceStationAndDestinationStationAndJourneyDate(String sourceStation,String destinationStation,String journeyDate);
	public Optional<Train> findById(int id);

}
