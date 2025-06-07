package com.example.les_conditions;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class LesConditionsApplication {
	
	public static void main(String[] args) {
		SpringApplication.run(LesConditionsApplication.class, args);
		ternaryCondition(15);
	}

	public static boolean conditionClassic(){
		boolean condition = false;
		if (condition == true) {
    		// code si la condition est vraie
			System.out.println("La condition est vraie");
		} else {
			// code si la condition est fausse
			System.out.println("La condition est fausse");
		}
		return condition;
	}

	public static boolean canConnected(int age) {
		if (age >= 16) {
			System.out.println("Accès autorisé");
			return true;
		} else {
			System.out.println("Accès refusé : trop jeune");
			return false;
		}
	}

	public static String ternaryCondition(int age) {
		String message = (age >= 18) ? "Tu es majeur" : "Tu es mineur";
		System.out.println(message);
		return message;
	}



}
