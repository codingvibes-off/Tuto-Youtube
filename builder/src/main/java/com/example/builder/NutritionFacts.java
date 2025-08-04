package com.example.builder;

import lombok.Builder;

public class NutritionFacts {

    // Champs immuables (final), définis uniquement à la création de l'objet
    private final int servingSize;  // Obligatoire
    private final int servings;     // Obligatoire
    private final int calories;     // Optionnel
    private final int fat;          // Optionnel

    /**
     * Classe interne statique qui sert à construire un objet NutritionFacts
     */
    public static class Builder {

        // Champs obligatoires
        private final int servingSize;
        private final int servings;

        // Champs optionnels avec des valeurs par défaut
        private int calories = 0;
        private int fat = 0;

        // Constructeur du Builder pour les champs obligatoires
        public Builder(int servingSize, int servings) {
            this.servingSize = servingSize;
            this.servings = servings;
        }

        // Méthode fluide pour définir la valeur de calories
        public Builder calories(int val) {
            this.calories = val;
            return this;
        }

        // Méthode fluide pour définir la valeur de fat
        public Builder fat(int val) {
            this.fat = val;
            return this;
        }

        // Méthode finale qui construit l'objet NutritionFacts
        public NutritionFacts build() {
            return new NutritionFacts(this);
        }
    }

    /**
     * Constructeur privé appelé uniquement par le Builder
     */
    private NutritionFacts(Builder builder) {
        this.servingSize = builder.servingSize;
        this.servings = builder.servings;
        this.calories = builder.calories;
        this.fat = builder.fat;
    }

    // Getters si besoin
    public int getServingSize() { return servingSize; }
    public int getServings() { return servings; }
    public int getCalories() { return calories; }
    public int getFat() { return fat; }
}





