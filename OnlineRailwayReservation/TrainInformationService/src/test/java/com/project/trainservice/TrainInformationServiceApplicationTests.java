package com.project.trainservice;


import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;

import com.project.trainservice.model.Train;
import com.project.trainservice.repository.TrainRepository;
import com.project.trainservice.service.TrainService;


@RunWith(SpringRunner.class)
@SpringBootTest(classes=TrainInformationServiceApplication.class)
public class TrainInformationServiceApplicationTests {

	@Autowired
	private TrainService trainService;
	
	@MockBean
	private TrainRepository trainRepository;
	
	@Test
	public void findAllTest() {
		
		when(trainRepository.findAll()).thenReturn(Stream
				.of(new Train(1,"Rajdhani","A58","NDLS","SEC",1856.4,100,"2021-04-02","1500","1600","active")).collect(Collectors.toList()));
		
		assertEquals(1,trainService.findAll().size());
		
	}
	
	@Test
	public void findTrainByIdTest() {
		Train train1=new Train(1,"Rajdhani","A58","NDLS","SEC",1856.4,100,"2021-04-02","1500","1600","active");
		Optional<Train> opt=Optional.ofNullable(train1);
		
		int id=1;
		when(trainRepository.findById(id)).thenReturn(opt);
		assertEquals(true,trainService.findTrainById(id).isPresent());
	}
	
	@Test
	public void findTest() {
		String sourceStation="NDLS";
		String destinationStation="SEC";
		String journeyDate="2021-04-02";
		when(trainRepository.findBySourceStationAndDestinationStationAndJourneyDate(sourceStation, destinationStation, journeyDate)).
		thenReturn(Stream
				.of(new Train(1,"Rajdhani","A58","NDLS","SEC",1856.4,100,"2021-04-02","1500","1600","active")).collect(Collectors.toList()));
		assertEquals(1,trainService.find(sourceStation, destinationStation, journeyDate).size());
	}
	
	@Test
	public void createTest() {
		Train train=new Train(1,"Rajdhani","A58","NDLS","SEC",1856.4,100,"2021-04-02","1500","1600","active");
		when(trainRepository.insert(train)).thenReturn(train);
		assertEquals("Train added with id"+train.getTrainId(),trainService.create(train));
	}
	
	@Test
	public void updateTest() {
		Train train=new Train(1,"Rajdhani","A58","NDLS","SEC",1856.4,100,"2021-04-02","1500","1600","active");
		
		when(trainRepository.save(train)).thenReturn(train);
		assertEquals("Successfully updated train",trainService.update(train));
	}
	
	@Test
	public void deleteTrainTest() {
		Train train=new Train(1,"Rajdhani","A58","NDLS","SEC",1856.4,100,"2021-04-02","1500","1600","active");
		int trainId=train.getId();
		trainService.deleteTrain(trainId);
		verify(trainRepository,times(1)).deleteById(train.getId());
	}
	

}
