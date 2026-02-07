from robot.api.deco import keyword
from robot.libraries.BuiltIn import BuiltIn
from selenium import webdriver

class Shop:
    def __init__(self):
        self.setLib = BuiltIn().get_library_instance("SeleniumLibrary")
    @keyword
    def framework_selenium_custom(self):
        print("Hello in this custom framework")
    @keyword
    def add_items_to_card_and_checkout(self, productList):
        print(self.setLib.get_webelements("css:.card-title a"))
        card_titles = self.setLib.get_webelements("css:.card-title a")
        i = 1
        for card_title in card_titles : 
            if card_title.text in productList:
                self.setLib.click_button("xpath:(//*[@class='card-footer'])["+str(i)+"]/button")
            i = i + 1


