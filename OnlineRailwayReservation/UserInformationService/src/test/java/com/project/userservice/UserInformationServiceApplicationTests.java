//package com.project.userservice;
//
//import static org.junit.Assert.assertEquals;
//import static org.mockito.Mockito.times;
//import static org.mockito.Mockito.verify;
//import static org.mockito.Mockito.when;
//
//import java.util.stream.Collectors;
//import java.util.stream.Stream;
//
//import org.junit.jupiter.api.Test;
//import org.junit.runner.RunWith;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.boot.test.mock.mockito.MockBean;
//import org.springframework.test.context.junit4.SpringRunner;
//
//import com.project.userservice.model.User;
//import com.project.userservice.repository.UserRepository;
//import com.project.userservice.service.UserService;
//
//@RunWith(SpringRunner.class)
//@SpringBootTest(classes=UserInformationServiceApplication.class)
//public class UserInformationServiceApplicationTests {
//
//	@MockBean
//	UserRepository userRepository;
//	
//	@Autowired
//	UserService userService;
//	
//	@Test
//	public void createTest() {
//		User user=new User("abcd","a@gmail.com","Akash","abcdef","+918427966993","2021-04-02");
//		
//		userService.create(user);
//		verify(userRepository,times(1)).insert(user);
//	}
//	
//	@Test
//	public void updateTest() {
//		User user=new User("abcd","a@gmail.com","Akash","abcdef","+918427966993","2021-04-02");
//		
//		userService.update(user);
//		verify(userRepository,times(1)).save(user);
//		
//	}
//	
//	@Test
//	public void deleteTest() {
//		User user=new User("abcd","a@gmail.com","Akash","abcdef","+918427966993","2021-04-02");
//		
//		userService.delete(user.getEmailId());
//		verify(userRepository,times(1)).deleteByEmailId(user.getEmailId());
//		
//	}
//	
//	@Test
//	public void findTest() {
//		User user=new User("abcd","a@gmail.com","Akash","abcdef","+918427966993","2021-04-02");
//		when(userRepository.findByEmailId(user.getEmailId())).thenReturn(user);
//		assertEquals(user,userService.find(user.getEmailId()));
//		
//	}
//	
//	@Test
//	public void findAllTest() {
//		when(userRepository.findAll()).thenReturn(Stream
//				.of(new User("abcd","a@gmail.com","Akash","abcdef","+918427966993","2021-04-02")).collect(Collectors.toList()));
//		
//		assertEquals(1,userService.findAll().size());
//	}
//}
