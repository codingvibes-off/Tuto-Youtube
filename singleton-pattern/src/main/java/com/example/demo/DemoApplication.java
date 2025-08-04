package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import java.lang.reflect.Constructor;
import java.lang.reflect.InvocationTargetException;
@SpringBootApplication
public class DemoApplication {

	public static void main(String[] args) throws NoSuchMethodException, SecurityException, InstantiationException, IllegalAccessException, IllegalArgumentException, InvocationTargetException {
		
		Constructor<Elvis> c = Elvis.class.getDeclaredConstructor();
		c.setAccessible(true); // 💣 désactive le "private"
		Elvis fake = c.newInstance(); // ⚠️ nouvelle instance
		Elvis original = Elvis.getInstance();
        
		System.out.println("Même instance ? " + (original == fake));
		
	}

}
