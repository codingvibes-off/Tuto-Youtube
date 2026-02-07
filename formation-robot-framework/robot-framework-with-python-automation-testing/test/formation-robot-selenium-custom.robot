
*** Settings ***
#Resource
Resource    resource-formation-robot.robot
Resource    ../POM/LandingPage.robot
Resource    ../POM/GenericPage.robot
Resource    ../POM/ShopPage.robot

Test Teardown    Close Browser
#Librairies
Library    String
#Librairie Python
Library    ../customLibrairies/SeleniumCustom.py
Library    ../customLibrairies/Shop.py
*** Variables ***
${MORTAGE_PAYMENT_URL}    https://rahulshettyacademy.com/
${url}    https://rahulshettyacademy.com/loginpagePractise/
*** Keywords ***

*** Test Cases ***

Test Selenium framework custom
    Open Browser    https://rahulshettyacademy.com/    chrome    
    Hello Robot
    Open Custom Browser    ${url}
    Close Browser Custom
    Open All Navigator    Chrome
