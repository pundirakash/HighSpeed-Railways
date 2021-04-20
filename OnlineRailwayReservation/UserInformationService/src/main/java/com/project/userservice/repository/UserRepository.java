package com.project.userservice.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.project.userservice.model.User;



@Repository
public interface UserRepository extends MongoRepository<User,Integer> {
	
	public Optional<User> findByUserName(String userName);

}
