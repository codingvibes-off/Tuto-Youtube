package com.example.demo;

public class Elvis {
    public static final Elvis INSTANCE = new Elvis(); // Singleton officiel
    private Elvis() {} // privé pour empêcher les autres

    public static Elvis getInstance() {
        return INSTANCE;
    }
}
