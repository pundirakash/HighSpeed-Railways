package com.project.trainservice.controller;


import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.trainservice.model.Search;
import com.project.trainservice.model.Train;
import com.project.trainservice.service.TrainService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/trainApi/v1")
public class TrainController {
	
	@Autowired
	TrainService trainService;
	
	@PostMapping("/addTrain")
	@PreAuthorize("hasAuthority('ROLE_ADMIN')")
	public String addTrain(@RequestBody Train train) {
		return trainService.create(train);
		
	}
	
	@PutMapping("/updateTrain")
	@PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_USER')")
	public String updateTrain(@RequestBody Train train) {
		return trainService.update(train);
		
	}
	
	@GetMapping("/viewTrains")
	public List<Train> viewTrains() {
		return trainService.findAll();
		
	}
	
	@PostMapping("/queryTrains")
	public List<Train> queryTrains(@RequestBody Search search){
		return trainService.find(search.getSourceStation(),search.getDestinationStation(),search.getJourneyDate());
	}
	
	@GetMapping("/findById/{id}")
	public Optional<Train> findTrainById(@PathVariable int id) {
		return trainService.findTrainById(id);
	}
	
	@DeleteMapping("/deleteTrain/{id}")
	@PreAuthorize("hasAuthority('ROLE_ADMIN')")
	public String cancelTrain(@PathVariable int id) {
		trainService.deleteTrain(id);
		return "Train Cancelled";
	}

}
