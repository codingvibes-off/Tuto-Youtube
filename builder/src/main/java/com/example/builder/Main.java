public class Main {
    public static void main(String[] args) {
        try (MyAutoCloseable ressource = new MyAutoCloseable()) {
            System.out.println("On utilise la ressource");
        } 
    }
}

class MyAutoCloseable implements AutoCloseable {
    public MyAutoCloseable() {
        System.out.println("Ouverture de la ressource");
    }

    @Override
    public void close() {
        System.out.println("Fermeture propre de la ressource");
    }
}
