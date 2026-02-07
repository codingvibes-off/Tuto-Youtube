*** Settings ***
Resource    resource-formation-robot.robot
Resource    ../POM/LandingPage.robot
Resource    ../POM/GenericPage.robot
Resource    ../POM/ShopPage.robot
Test Teardown    Close Browser
Test Template    Validate Unsuccessful Login
Library    String

Library    ../customLibrairies/Shop.py
*** Variables ***
${MORTAGE_PAYMENT_URL}    https://rahulshettyacademy.com/
${valid_username}    rahulshettyacademy
${valid_password}    Learning@830$3mK2
${invalid_username}    invalidUser
${invalid_password}    invalidPass

*** Keywords ***
*** Test Cases ***    username    password
Invalid username      dsahed      learning
Invalid password      rahusl      ploufg
Special chatracters   @#$         learning