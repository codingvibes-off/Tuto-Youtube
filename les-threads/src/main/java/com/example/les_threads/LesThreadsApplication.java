package com.example.les_threads;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class LesThreadsApplication {

	public static void main(String[] args) {
		CompteBancaire compte = new CompteBancaire();

         Runnable retrait = () -> {
            for (int i = 0; i < 3; i++) {
                compte.retirer(50);
            }
        };
        Thread t1 = new Thread(retrait, "Luc");
        Thread t2 = new Thread(retrait, "Marie");
        t1.start();
        t2.start();
	}

}
