package com.example.builder;

public class Ressource {

    public Ressource() {
        System.out.println("Ouverture de la ressource");
    }

  
    @Override
    protected void finalize() throws Throwable {
        System.out.println("Nettoyage de la ressource (finalize)");
    }
}
