package com.example.les_threads;

public class CompteBancaire {
    private int solde = 100;
    public void retirer(int montant) {
    if (solde >= montant) {
        System.out.println(Thread.currentThread().getName() + " va retirer " + montant);

        try {
            Thread.sleep(100); // pause artificielle pour simuler un délai
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        solde -= montant;
        System.out.println(Thread.currentThread().getName() + " a retiré. Nouveau solde : " + solde);
    } else {
        System.out.println(Thread.currentThread().getName() + " n’a pas pu retirer. Solde insuffisant.");
    }
}

}

