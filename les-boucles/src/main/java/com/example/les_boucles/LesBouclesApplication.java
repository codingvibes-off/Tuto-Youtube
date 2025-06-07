package com.example.les_boucles;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class LesBouclesApplication {

	public static void main(String[] args) {
		SpringApplication.run(LesBouclesApplication.class, args);
		loopDoWhile();
		loopFor();
		loopDoWhile();
	}

	public static String loopFor(){
		for (int i = 0; i < 5; i++) {
    		System.out.println("Compteur : " + i);
		}
		return "Boucle For";
	}

	public static String loopWhile() {
		int i = 0;
		while (i < 5) {
			System.out.println("i vaut : " + i);
			i++;
		}
		return "Boucle While";
	}


	public static String loopDoWhile(){
		int i = 0;
		do {
			System.out.println("i vaut : " + i);
			i++;
		} while (i < 5);
		return "Boucle While";
	}


}
