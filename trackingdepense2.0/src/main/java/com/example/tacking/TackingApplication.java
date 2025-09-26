package com.example.tacking;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;


@SpringBootApplication
@EnableJpaRepositories
public class TackingApplication {
	public static void main(String[] args) {
		SpringApplication.run(TackingApplication.class, args);
	}

}
