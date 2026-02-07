from robot.api.deco import keyword
from robot.libraries.BuiltIn import BuiltIn
from selenium import webdriver

class SeleniumCustom:
    def __init__(self):
        self.selenium = BuiltIn().get_library_instance("SeleniumLibrary")
    @keyword
    def hello_robot(self):
        print("Hello Robot")
    @keyword
    def open_custom_browser(self, url):
        self.selenium.driver.get(url)
        return self.selenium
    @keyword
    def close_browser_custom(self):
        self.selenium.driver.close()
        print("Call Close naviagteur")
        return self.selenium
    @keyword
    def click_element(self, type_locator, element):
        type_locator = type_locator.lower()
        if  type_locator == "id":
            locator = (By.ID, element)
        if type_locator == "name":
            locator = (By.NAME, element)
        if type_locator == "xpath":
            locator = (By.XPATH, element)
        if type_locator == "class":
            locator = (By.CLASS_NAME, element)
        if type_locator == "css_locator":
            locator = (By.CSS_SELECTOR, element)
        
        else : 
            raise ValueError("Locator non supporté")
        try:
            # Attendre que l'élément soit cliquable
            element_wait = WebDriverWait(self.selenium, timeout).until(
                EC.element_to_be_clickable(locator)
            )
            element_wait.click()
            print(f"[INFO] Élément '{element}' cliqué avec succès")
        except TimeoutException:
            print(f"[ERREUR] Élément '{element}' non cliquable après {timeout} secondes")
        except NoSuchElementException:
            print(f"[ERREUR] Élément '{element}' introuvable")
        self.selenium.find_element(*locator).click()
        return self.selenium
    
    @keyword
    def dropdown(self):
        dropdown = Select(driver.find_element(By.ID, "example"))
        dropdown.select_by_visible_text("Female")
        dropdown.select_by_index(0)
        return dropdown
    
    @keyword
    def get_title(self):
        return self.selenium.title
    @keyword
    def open_all_navigator(self, name_navigator, url):
        if name_navigator == "Edge":
            driver = webdriver.Edge()
        if name_navigator == "Chrome":
            driver = webdriver.Chrome()
        if name_navigator == "Firefox":
            driver = webdriver.Firefox()
        driver.get(url)
        SeleniumCustom.maximiser_fenetre()
        return driver