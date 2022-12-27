package com.example.myjwt;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.data.jpa.convert.threeten.Jsr310JpaConverters;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
@EntityScan(basePackageClasses = { 
		MyAppApplication.class,
		Jsr310JpaConverters.class 
})
@EnableScheduling
@EnableAsync

//java -jar jpmcportal-v0.1.jar com.example.myjwt.MyAppApplication
public class MyAppApplication extends SpringBootServletInitializer {


//	@PostConstruct
//	void init() {
//		TimeZone.setDefault(TimeZone.getTimeZone("UTC"));
//	}
	
	public static void main(String[] args) {
		SpringApplication.run(MyAppApplication.class, args);
		
		/*
		 * SpringApplication application = new
		 * SpringApplication(MyAppApplication.class);
		 * application.setAdditionalProfiles("ssl"); application.run(args);
		 */
        
	}

//	@PostConstruct
//	public  void addUsers(){
//		List<Integer> ids = new ArrayList<>(Arrays.asList(109996,164575,277785,778700));
//		List<User> users = new ArrayList();
//		for(Integer i : ids){
//			User user = new User();
//			user.setUserName(String.valueOf(i));
//			user.setEmail(String.valueOf(i)+"@gmail.com");
//			user.setIsActive(true);
//			user.setIsApproved(true);
//			user.setIsVerified(true);
//			user.setPassword(passwordEncoder.encode("Admin@123"));
//
//			Role userRole = new Role(ERole.Associate);
//
//			user.setRoles(Collections.singleton(userRole));
//			users.add(user);
//		}
//		userRepository.saveAll(users);
//	}



	/*@Bean
	public WebMvcConfigurer cors() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/*")
				.allowedHeaders("*")
				.allowedOrigins("*")
				.allowCredentials(true);
			}
		};
	}*/

}