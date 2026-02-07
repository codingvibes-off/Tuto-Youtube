*** Settings ***
Resource    resource-formation-robot.robot
Resource    ../POM/LandingPage.robot
Resource    ../POM/GenericPage.robot
Resource    ../POM/ShopPage.robot

Library    String
Library    DataDriver    file=../resources/datadriver.csv    encoding=utf_8    dialect=unix
Library    ../customLibrairies/Shop.py

Test Teardown    Close Browser
Test Template    Validate Unsuccessful Login

*** Variables ***
${MORTAGE_PAYMENT_URL}    https://rahulshettyacademy.com/
${valid_username}    rahulshettyacademy
${valid_password}    Learning@830$3mK2
${invalid_username}    invalidUser
${invalid_password}    invalidPass

*** Keywords ***
*** Test Cases ***
Login with user ${username} and password ${password}    xyc    123456
