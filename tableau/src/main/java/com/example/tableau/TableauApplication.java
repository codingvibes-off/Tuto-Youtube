package com.example.tableau;

import java.util.Arrays;

import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class TableauApplication {

	public static void main(String[] args) {
		//Première façon
		int[] ageOne = new int[3];

		ageOne[0] = 1;
		ageOne[1] = 2;
		ageOne[2] = 3;
		//Deuxième façon
		int[] ageTwo = {1, 2, 3};
		//Affichage
		for (int i = 0; i < ageOne.length; i++) {
    		System.out.println("Valeur indice :" + ageOne[i]);
		}
		for (int i = 0; i < ageTwo.length; i++) {
			System.out.println("Valeur indice :" + ageTwo[i]);
		}


	}

}
