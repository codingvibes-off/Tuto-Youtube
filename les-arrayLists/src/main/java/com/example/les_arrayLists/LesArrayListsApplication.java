package com.example.les_arrayLists;

import java.util.ArrayList;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class LesArrayListsApplication {

	public static void main(String[] args) {
		// Création d'une ArrayList de chaînes de caractères
        ArrayList<String> fruits = new ArrayList<>();
        //ETAPE 1 Ajout d'éléments
        fruits.add("Pomme");
        fruits.add("Banane");
        fruits.add("Orange");
		fruits.set(2, "Mangue"); // Remplace Banane par Mangue
		fruits.remove("Mangue");
		for (int i = 0; i < fruits.size(); i++) {
			System.out.println(fruits.get(i));
		}

    }
}
