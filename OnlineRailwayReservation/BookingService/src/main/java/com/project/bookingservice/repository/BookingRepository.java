package com.project.bookingservice.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.project.bookingservice.model.Booking;

@Repository
public interface BookingRepository extends MongoRepository<Booking, Integer> {
	
	public Optional<Booking> findById(int id);
	
	

}
