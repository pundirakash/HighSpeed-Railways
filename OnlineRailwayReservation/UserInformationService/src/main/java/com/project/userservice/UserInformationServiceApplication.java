package com.project.userservice;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

import com.project.userservice.model.User;
import com.project.userservice.repository.UserRepository;


@SpringBootApplication
@EnableEurekaClient
public class UserInformationServiceApplication {
	

	public static void main(String[] args) {
		SpringApplication.run(UserInformationServiceApplication.class, args);
	}

}
