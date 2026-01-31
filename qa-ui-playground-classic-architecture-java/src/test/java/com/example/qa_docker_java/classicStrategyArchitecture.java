package com.example.qa_docker_java;

import static org.junit.jupiter.api.Assertions.*;

import java.time.Duration;
import java.util.List;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.WebDriverWait;

public class classicStrategyArchitecture { 
    WebDriver driver;
    @BeforeEach
    public void setUp() {
        driver = new ChromeDriver();
        driver.get("http://www.uitestingplayground.com/");
    }  
    @AfterEach
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
    @Test
    public void checkTitle_shouldBeVisible() {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(40));
        boolean texte = wait.until(driver -> driver.findElement(By.id("title"))
                            .getText().contains("UI Testing Playground"));
        assertTrue(texte);
    }
    @Test
    public void checkIconCube_shouldBeVisible() {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(40));
        boolean checkImg = wait.until(driver -> driver.findElement(By.xpath("//img[@class='img-fluid']")).getSize().getHeight() > 0);
        assertTrue(checkImg);
    }
    @Test
    public void checkParagraphs_shouldContainUnderTitle() {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(40));
        boolean texte = wait.until(driver -> driver.findElements(By.tagName("p"))
                            .stream()
                            .anyMatch(p -> p.getText().contains("Quality is not an act, it is a habit.")));
        assertTrue(texte);
    }
      @Test
    public void checkParagraphs_shouldContainUnderTitleWithXpath() {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(40));
         List<WebElement> paragraphs = wait.until(driver -> {
            List<WebElement> elems = driver.findElements(By.xpath("//p[@class='mb-0']"));
            return elems.isEmpty() ? null : elems;
        });
        boolean texte = paragraphs.stream().anyMatch(p -> p.getText().contains("Quality is not an act, it is a habit."));
        assertTrue(texte);
    }
    @Test
    public void checkParagraphs_shouldContainUnderTitleWithCssSelector() {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(40));
        boolean texte = wait.until(driver -> driver.findElements(By.cssSelector("p.mb-0"))
                            .stream()
                            .anyMatch(p -> p.getText().contains("Quality is not an act, it is a habit.")));
        assertTrue(texte);
    }
    
    @Test
    public void verifyAlertWarning_shouldBeVisible() {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(40));
        boolean span = wait.until(driver -> driver.findElement(By.xpath("//div[@class='alert alert-warning']//span"))
                            .getText()
                            .contains("The purpose of this website is to provide a platform for sharpening UI test automation skills. Use it to practice with your test automation tool. Use it to learn test automation techniques."));
        assertTrue(span);
    }
    
    @Test
    public void testClassAttribute() {
        List<WebElement> linkHrefs = driver.findElements(By.tagName("a"));
         boolean hiddenLayers = linkHrefs.stream()
            .anyMatch(a -> {
                if(a.getText().contains("Class Attribute")) {
                    a.click();
                    return true;
                } else {
                    return false;
                }
            });
        assertTrue(hiddenLayers);
    }
    @Test
    public void testDynamicIDClick() {
        List<WebElement> linkHrefs = driver.findElements(By.tagName("a"));
         boolean hiddenLayers = linkHrefs.stream()
            .anyMatch(a -> {
                if(a.getText().contains("Dynamic ID")) {
                    a.click();
                    return true;
                } else {
                    return false;
                }
            });
        assertTrue(hiddenLayers);
    }
     @Test
    public void testHiddenLayers() {
        List<WebElement> linkHrefs = driver.findElements(By.tagName("a"));
         boolean hiddenLayers = linkHrefs.stream()
            .anyMatch(a -> {
                if(a.getText().contains("Hidden Layers")) {
                    a.click();
                    return true;
                } else {
                    return false;
                }
            });
        assertTrue(hiddenLayers);
    }
    @Test
    public void testLoadDelay() {
        List<WebElement> linkHrefs = driver.findElements(By.tagName("a"));
         boolean hiddenLayers = linkHrefs.stream()
            .anyMatch(a -> {
                if(a.getText().contains("Load Delay")) {
                    a.click();
                    return true;
                } else {
                    return false;
                }
            });
        assertTrue(hiddenLayers);
    }
     @Test
    public void testAjaxData() {
        List<WebElement> linkHrefs = driver.findElements(By.tagName("a"));
         boolean hiddenLayers = linkHrefs.stream()
            .anyMatch(a -> {
                if(a.getText().contains("Load Delay")) {
                    a.click();
                    return true;
                } else {
                    return false;
                }
            });
        assertTrue(hiddenLayers);
    }
    @Test
    public void testClientSideDelay() {
        List<WebElement> linkHrefs = driver.findElements(By.tagName("a"));
         boolean hiddenLayers = linkHrefs.stream()
            .anyMatch(a -> {
                if(a.getText().contains("Client Side Delay")) {
                    a.click();
                 
                    return true;
                } else {
                    return false;
                }
            });
        String currentUrl = driver.getCurrentUrl();
        assertEquals("http://www.uitestingplayground.com/clientdelay", currentUrl);
        assertTrue(hiddenLayers);
    }
   

}
