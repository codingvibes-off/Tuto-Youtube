package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DemoApplication {
	//Scénario 1 : Age d'un joueur
	public static int age = 18;

	//Scénario 2 : Prix d'un produit
	public static double prix = 19.99;

	//Scénario 3 : Nom d'un utilisateur
	public static String nom = "Emma";

	//Scénario 4 : Utilisateur connecté
	public static boolean isConnected = true;

	public static void main(String[] args) {
		System.out.println(age);
		System.out.println(prix);
		System.out.println(nom);
		System.out.println(isConnected);
		SpringApplication.run(DemoApplication.class, args);
	}

}
